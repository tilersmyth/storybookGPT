import * as Auth from 'aws-amplify/auth/server';
import { cookies } from 'next/headers';
import * as React from 'react';

import { runWithAmplifyServerContext } from '@/utils/server-utils';

export default async function ProfilePage() {
  const currentInfo = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      const user = await Auth.getCurrentUser(contextSpec);

      const attr = await Auth.fetchUserAttributes(contextSpec);
      return { user, attr };
    },
  });

  console.log('USER: ', currentInfo);

  return (
    <main className='layout relative flex items-center justify-center'>
      <section className='bg-white'>
        <div>
          <div>
            <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
              Profile page!
            </h2>
            {/* <div className='mt-3'>{JSON.stringify(data, null, 2)}</div> */}
          </div>
        </div>
      </section>
    </main>
  );
}
