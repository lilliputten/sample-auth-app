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

import styles from './UserForm.module.scss';
import { TCheckAuthData, useUserAuthStore } from '@/features/UserAuth';
import { afterAuthPage, noAuthPage } from '@/config/auth';
import { useRouter } from 'next/router';

type TChangeHandler = React.ChangeEventHandler<HTMLInputElement>;
type TCheckboxHandler = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
type TClickHandler = () => void;

interface TUserFormProps {
  className?: string;
}

const TitleBox: React.FC = () => {
  // prettier-ignore
  return (
    <Stack className={classnames(styles.titleBox)}>
      <PageTitle className={styles.title}>
        User Page
      </PageTitle>
    </Stack>
  );
};

const FormBox: React.FC<{
  userName?: string;
}> = (props) => {
  const { userName } = props;
  // prettier-ignore
  return (
    <Box className={classnames(styles.contentBox)}>
      User: {userName}
    </Box>
  );
};

const ActionsBox: React.FC<{
  onLogoutClick: TClickHandler;
  isLogoutEnabled: boolean;
}> = (props) => {
  const { onLogoutClick, isLogoutEnabled } = props;
  return (
    <Stack className={classnames(styles.actionsBox)}>
      <Button
        className={styles.submitButton}
        onClick={onLogoutClick}
        disabled={!isLogoutEnabled}
        variant="contained"
        fullWidth
      >
        Log Out
      </Button>
    </Stack>
  );
};

export const UserForm: React.FC<TUserFormProps> = observer((props) => {
  const { className } = props;
  const router = useRouter();
  const userAuthStore = useUserAuthStore();
  const {
    userName,
    isLoading,
    // error: authUserError,
    // isLoggedIn, // TODO: To change behavior if had already logged?
  } = userAuthStore;
  const [showError, setShowError] = React.useState<Error | string>();
  const [isInited, setInited] = React.useState<boolean>(false);
  const [isFinished, setFinished] = React.useState<boolean>(false);
  React.useEffect(() => {
    setInited(true);
  }, []);
  const onLogout = React.useCallback(() => {
    console.log('[UserForm:onLogout]');
    debugger;
    userAuthStore
      .logout()
      .then((result) => {
        console.log('[UserForm:onLogout] success', {
          result,
          userAuthStore,
        });
        // Success: Finish...
        setFinished(true);
        setShowError(undefined);
        // TODO: Move to UserAuthStore
        router.push(noAuthPage);
      })
      // Catch with empty handler -- calm the react for non-processing errors.
      .catch(Boolean);
  }, [router, userAuthStore]);
  return (
    <Stack className={classnames(className, styles.root)}>
      <TitleBox />
      {showError && <ShowError className={styles.error} error={showError} />}
      <FormBox userName={userName} />
      <ActionsBox onLogoutClick={onLogout} isLogoutEnabled />
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
