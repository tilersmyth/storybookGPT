'use client';

// This endpoint ('/provider-redirect') handles setting the user session on the client when
// using 3rd party auth

import { fetchAuthSession, signInWithRedirect } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export default function ProviderRedirectPage() {
  const router = useRouter();

  const dummy = async () => {
    // https://github.com/aws-amplify/amplify-js/issues/12589
    signInWithRedirect();
  };

  React.useEffect(() => {
    (async () => {
      try {
        await fetchAuthSession();
        router.replace('/');
      } catch (error) {
        router.replace('/login');
      }
    })();
  }, [router]);

  return (
    <main className='layout relative flex items-center justify-center'>
      <section className='bg-white'>
        <div>
          <div>
            <h2 className='font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
              redirecting....
            </h2>
          </div>
        </div>
      </section>
    </main>
  );
}
