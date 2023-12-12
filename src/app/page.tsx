'use client';

import { User } from '@prisma/client';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';

export default function HomePage() {
  const { register, handleSubmit } = useForm<Pick<User, 'name'>>();

  const router = useRouter();

  const onSubmit = async (data: Pick<User, 'name'>) => {
    try {
      const res = await fetch('api/user', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ name: data.name }),
      });

      const body = await res.json();

      router.push(`/${body.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <Head>
        <title>Getting Started</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <div>
              <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
                Create Main Character
              </h2>
              <div className='mt-3'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='text'
                    {...register('name')}
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='E.g. Donald Duck'
                  />
                </div>
              </div>
              <div className='mt-3 flex flex-col'>
                <button
                  type='submit'
                  className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      </form>
    </main>
  );
}
