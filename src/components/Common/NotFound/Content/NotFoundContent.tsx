import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

// MUI...
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface TNotFoundContentProps {
  className?: string;
}

function NotFoundContent(props: TNotFoundContentProps): JSX.Element {
  const { className } = props;
  const router = useRouter();
  const [url, setUrl] = React.useState('');
  // NOTE: Preventing build-time NextJS Warning: Text content did not match.
  React.useEffect(() => {
    const {
      // prettier-ignore
      asPath,
      isReady,
    } = router;
    if (isReady) {
      const errMessage = 'Page not found: ' + asPath;
      // eslint-disable-next-line no-console
      console.warn('[NotFoundContent]', errMessage, {
        asPath,
        router,
      });
      setUrl(asPath);
    }
  }, [router, setUrl]);
  return (
    <Box className={classnames(className)} sx={{ textAlign: 'center' }}>
      <Typography m={2}>
        Page <u>{url}</u> is not found
      </Typography>
      <Typography m={2}>
        Start from <Link href="/">main page</Link>, please.
      </Typography>
    </Box>
  );
}

export default NotFoundContent;
