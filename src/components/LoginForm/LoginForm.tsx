import React from 'react';
import { observer } from 'mobx-react-lite';
import classnames from 'classnames';

// MUI...
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';

// MUI Icons...
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { PageTitle, LoaderSplash, ShowError } from '@/ui';

import styles from './LoginForm.module.scss';
import { TCheckAuthData, useUserAuthStore } from '@/features/UserAuth';
import { afterAuthPage } from '@/config/auth';
import { useRouter } from 'next/router';

type TChangeHandler = React.ChangeEventHandler<HTMLInputElement>;
type TCheckboxHandler = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
type TClickHandler = () => void;

interface TLoginFormProps {
  className?: string;
}

const allowToFakeStart = false;

const hasLocalStorage = typeof localStorage !== 'undefined';

const TitleBox: React.FC = () => {
  // prettier-ignore
  return (
    <Stack className={classnames(styles.titleBox)}>
      <PageTitle className={styles.title}>
        Enter Login Info
      </PageTitle>
    </Stack>
  );
};

const FormBox: React.FC<{
  userName?: string;
  userPassword?: string;
  doRemember?: boolean;
  onPasswordChange: TChangeHandler;
  onUserNameChange: TChangeHandler;
  onRememeberChanged: TCheckboxHandler;
}> = (props) => {
  const {
    userName,
    userPassword,
    doRemember,
    onPasswordChange,
    onUserNameChange,
    onRememeberChanged,
  } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <Box className={classnames(styles.contentBox)}>
      <TextField
        className={styles.userNameField}
        id="userName"
        label="Login Name"
        variant="outlined"
        value={userName}
        onChange={onUserNameChange}
        fullWidth
      />
      <FormControl variant="outlined" className={styles.passwordField}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          autoComplete="new-password"
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={userPassword}
          onChange={onPasswordChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          }
          fullWidth
        />
      </FormControl>
      <FormControlLabel
        className={styles.remember}
        control={<Checkbox checked={doRemember} onChange={onRememeberChanged} />}
        label="Remember Me"
      />
      {/*
      <Typography textAlign="left">
        Some extra info.
      </Typography>
      */}
    </Box>
  );
};

const ActionsBox: React.FC<{
  onSubmitClick: TClickHandler;
  isSubmitEnabled: boolean;
}> = (props) => {
  const { onSubmitClick, isSubmitEnabled } = props;
  return (
    <Stack className={classnames(styles.actionsBox)}>
      <Button
        className={styles.submitButton}
        onClick={onSubmitClick}
        disabled={!isSubmitEnabled}
        variant="contained"
        fullWidth
      >
        Submit
      </Button>
    </Stack>
  );
};

export const LoginForm: React.FC<TLoginFormProps> = observer((props) => {
  const { className } = props;
  const router = useRouter();
  const userAuthStore = useUserAuthStore();
  const {
    error: authUserError,
    isLoading,
    // isLoggedIn, // TODO: To change behavior if had already logged?
  } = userAuthStore;
  const [showError, setShowError] = React.useState<Error | string>();
  React.useEffect(() => {
    setShowError(authUserError);
  }, [authUserError]);
  const [userName, setUserName] = React.useState<string>('');
  const [userPassword, setUserPassword] = React.useState('');
  const defaultDoRemember = false;
  const [doRemember, setDoRemember] = React.useState<boolean>(defaultDoRemember);
  const [isInited, setInited] = React.useState<boolean>(false);
  const [isFinished, setFinished] = React.useState<boolean>(false);
  // Update data from local storage...
  React.useEffect(() => {
    if (localStorage) {
      setUserName(localStorage?.getItem('LoginForm:userName') || '');
      setDoRemember(localStorage.getItem('LoginForm:doRemember') === 'true' || false);
    }
    setInited(true);
  }, []);
  const onUserNameChange = React.useCallback<TChangeHandler>((ev) => {
    const { currentTarget } = ev;
    const { value } = currentTarget;
    setUserName(value);
  }, []);
  const onPasswordChange = React.useCallback<TChangeHandler>((ev) => {
    const { currentTarget } = ev;
    const { value } = currentTarget;
    setUserPassword(value);
  }, []);
  const isSubmitEnabled = allowToFakeStart || !!(userName && userPassword);
  const onSubmit = React.useCallback(() => {
    const checkAuthData: TCheckAuthData = {
      userName,
      userPassword,
      doRemember,
    };
    console.log('[LoginForm:onSubmit]', {
      checkAuthData,
      userName,
      userPassword,
      doRemember,
      isSubmitEnabled,
      // userAuthStore,
    });
    if (!isSubmitEnabled) {
      return;
    }
    userAuthStore
      .login(checkAuthData)
      .then((result) => {
        if (!result || !result.isLoggedIn) {
          console.error('[LoginForm:onSubmit] error', {
            result,
            checkAuthData,
            userName,
            userPassword,
            doRemember,
            isSubmitEnabled,
            userAuthStore,
          });
          debugger;
          // Set default error...
          setShowError('Can not log in with provided data');
          return;
        }
        console.log('[LoginForm:onSubmit] success', {
          result,
          checkAuthData,
          userName,
          userPassword,
          doRemember,
          isSubmitEnabled,
          userAuthStore,
        });
        if (hasLocalStorage) {
          // Store or reset storage variables...
          if (doRemember) {
            localStorage.setItem('LoginForm:userName', userName);
            // localStorage.setItem('LoginForm:userPassword', userPassword);
            localStorage.setItem('LoginForm:doRemember', String(doRemember));
          } else {
            localStorage.removeItem('LoginForm:userName');
            // localStorage.removeItem('LoginForm:userPassword');
            localStorage.removeItem('LoginForm:doRemember');
          }
        }
        // Success: Finish...
        setFinished(true);
        setShowError(undefined);
        // TODO: Move to UserAuthStore
        router.push(afterAuthPage);
      })
      // Catch with empty handler -- calm the react for non-processing errors.
      .catch(Boolean);
  }, [router, userAuthStore, userName, userPassword, doRemember, isSubmitEnabled]);
  const onRememeberChanged = React.useCallback<TCheckboxHandler>((_ev, checked) => {
    setDoRemember(checked);
  }, []);
  console.log('[LoginForm] render', {
    isInited,
    isFinished,
    isLoading,
  });
  return (
    <Stack className={classnames(className, styles.root)}>
      <TitleBox />
      {showError && <ShowError className={styles.error} error={showError} />}
      <FormBox
        userName={userName}
        userPassword={userPassword}
        doRemember={doRemember}
        onUserNameChange={onUserNameChange}
        onPasswordChange={onPasswordChange}
        onRememeberChanged={onRememeberChanged}
      />
      <ActionsBox onSubmitClick={onSubmit} isSubmitEnabled={isSubmitEnabled} />
      <LoaderSplash
        // className={styles.loaderSplash}
        show={!isInited || isFinished || isLoading}
        spinnerSize="large"
        bg="white"
        mode="cover"
        fullSize
      />
    </Stack>
  );
});
