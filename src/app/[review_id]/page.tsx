import Head from 'next/head';
import * as React from 'react';

import prisma from '@/db';

export default async function ReviewPage({
  params,
}: {
  params: { review_id: string };
}) {
  const data = await prisma.user.findFirst({
    where: { id: parseInt(params.review_id, 10) },
  });

  return (
    <main>
      <Head>
        <title>Review Character</title>
      </Head>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <div>
            <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
              Review Character
            </h2>
            <div className='mt-3'>{JSON.stringify(data, null, 2)}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
