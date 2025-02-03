import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { JwtUpdatePasswordView } from 'src/auth/view/jwt';
// ----------------------------------------------------------------------

const metadata = { title: `Reset password - ${CONFIG.appName}` };

export default function JwtUpdatePasswordPage() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <JwtUpdatePasswordView />
    </>
  );
}
