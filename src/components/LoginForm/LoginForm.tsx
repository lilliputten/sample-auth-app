import React from 'react';
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

import { PageTitle } from '@/ui/elements/Basic/PageTitle';

import styles from './LoginForm.module.scss';

type TChangeHandler = React.ChangeEventHandler<HTMLInputElement>;
type TCheckboxHandler = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
type TClickHandler = () => void;

interface TCasterLoginProps {
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
        By clicking "Join", you agree to our Terms of Services and Privacy Statement.
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

export const LoginForm: React.FC<TCasterLoginProps> = (props) => {
  const { className } = props;
  const [userName, setUserName] = React.useState(
    (hasLocalStorage && localStorage.getItem('LoginForm:userName')) || '',
  );
  const [userPassword, setUserPassword] = React.useState('');
  const [doRemember, setDoRemember] = React.useState(
    (hasLocalStorage && localStorage.getItem('LoginForm:doRemember') === 'true') || false,
  );
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
    console.log('[LoginForm:onSubmit]', {
      userName,
      doRemember,
      isSubmitEnabled,
    });
    debugger;
    if (!isSubmitEnabled) {
      return;
    }
    // TODO: Set userId, userName, userLogged
    // DEMO: Prepare fake userId!
    /*
    const userId: UUID = longUuidv4();
    // TODO: Check password on server (async)!
    // Set app parameters...
    appStore.setUserLogged(true);
    appStore.setUserId(userId);
    appStore.setUserName(userName);
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
    */
  }, [userName, doRemember, isSubmitEnabled]);
  const onRememeberChanged = React.useCallback<TCheckboxHandler>((_ev, checked) => {
    setDoRemember(checked);
  }, []);
  return (
    <Stack className={classnames(className, styles.root)}>
      <TitleBox />
      <FormBox
        userName={userName}
        userPassword={userPassword}
        doRemember={doRemember}
        onUserNameChange={onUserNameChange}
        onPasswordChange={onPasswordChange}
        onRememeberChanged={onRememeberChanged}
      />
      <ActionsBox onSubmitClick={onSubmit} isSubmitEnabled={isSubmitEnabled} />
    </Stack>
  );
};
