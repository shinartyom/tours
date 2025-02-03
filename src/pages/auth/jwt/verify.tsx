import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { JwtVerifyView } from 'src/auth/view/jwt';

// ----------------------------------------------------------------------

const metadata = { title: `Verify - ${CONFIG.appName}` };

export default function JwtVerifyPage() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <JwtVerifyView />
    </>
  );
}
