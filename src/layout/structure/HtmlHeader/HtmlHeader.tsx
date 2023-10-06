import Head from 'next/head';

import * as siteConfig from '@/config/site';

export interface THtmlHeaderProps {
  title?: string;
  descr?: string;
  keywords?: string | string[];
}

/** getPropValue -- Get value from props or site config
 * @param {string} id
 * @param {object} props
 * @return {string}}
 */
function getPropValue(id: keyof THtmlHeaderProps, props: THtmlHeaderProps): string {
  let val: unknown = props[id]; // Later will be converted to string
  if (val == null) {
    val = siteConfig[id];
  }
  if (val && Array.isArray(val)) {
    val = val.join(', ');
  }
  return String(val);
}

export function HtmlHeader(props: THtmlHeaderProps): JSX.Element {
  const { title } = props; // getPropValue('title', props);
  const descr = getPropValue('descr', props);
  const keywords = getPropValue('keywords', props);
  return (
    <Head>
      {!!title && (
        <>
          <title>{title}</title>
          <meta name="title" content={title} />
        </>
      )}
      <meta name="description" content={descr} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    </Head>
  );
}
