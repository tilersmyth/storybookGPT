'use client';

import * as Auth from '@aws-amplify/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface IFormInput {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().required('E-mail is required'),
});

export const ForgotPasswordForm: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: IFormInput) => {
    try {
      await Auth.resetPassword({ username: data.email });

      router.push(`/reset-password?email=${data.email}`);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  return (
    <>
      <div className='mt-10 rounded-md bg-white drop-shadow sm:mx-auto sm:w-full sm:max-w-lg md:p-10'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              E-mail
            </label>

            <div className='mt-2'>
              <input
                type='text'
                id='email'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                {...register('email')}
              />

              {errors.email && (
                <p className='text-sm text-red-500'>{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>

      <p className='mt-10 text-center text-sm text-gray-500'>
        <Link
          href='/sign-in'
          className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
        >
          Back to sign in
        </Link>
      </p>
    </>
  );
};
