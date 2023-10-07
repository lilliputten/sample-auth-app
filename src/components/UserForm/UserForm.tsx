import React from 'react';
import { observer } from 'mobx-react-lite';
import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

// MUI...
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { PageTitle, LoaderSplash, ShowError } from '@/ui';

import styles from './UserForm.module.scss';
import { useUserAuthStore } from '@/features/UserAuth';
import { mainPage, noAuthPage } from '@/config/auth';

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
        // fullWidth
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
    userAuthStore
      .logout()
      .then((_result) => {
        /* console.log('[UserForm:onLogout] success', {
         *   _result,
         *   userAuthStore,
         * });
         */
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
      <Typography mb={2}>
        Go to <Link href={mainPage}>main page</Link>.
      </Typography>
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
