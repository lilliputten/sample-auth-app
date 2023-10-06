import { Html, Head, Main, NextScript } from 'next/document';

import * as siteConfig from '@/config/site';
import * as buildConfig from '@/config/build';

export default function Document(): JSX.Element {
  const { buildTag } = buildConfig;
  return (
    <Html lang={siteConfig.htmlLang}>
      <Head>
        <noscript dangerouslySetInnerHTML={{ __html: `<!-- @build ${buildTag} -->` }} />
        {siteConfig.fontUrl && <link rel="stylesheet" href={siteConfig.fontUrl} />}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
