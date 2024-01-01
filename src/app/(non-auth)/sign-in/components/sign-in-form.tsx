'use client';

import * as Auth from '@aws-amplify/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { GoogleSignIn } from '@/app/(non-auth)/sign-in/components/google-signin-btn';

const SUPPORTED_FORM_ERRORS = [
  'UserNotFoundException',
  'NotAuthorizedException',
];

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required('E-mail is required'),
  password: yup.string().required('Password is required'),
});

export const SignInForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });
  const router = useRouter();

  const onSubmit = async (data: IFormInput) => {
    try {
      setLoading(true);

      reset();

      await Auth.signIn({
        username: data.email,
        password: data.password,
      });

      router.push('/');
    } catch (error: any) {
      console.log('ERR: ', error);

      if (SUPPORTED_FORM_ERRORS.includes(error.name)) {
        setError('root', { message: error.message });
        return;
      }

      setError('root', { message: 'Unknown error occurred' });
    } finally {
      setLoading(false);
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
                id='email'
                type='email'
                autoComplete='email'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                {...register('email')}
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Password
              </label>
              <div className='text-sm'>
                <Link
                  href='/forgot-password'
                  className='font-semibold text-indigo-600 hover:text-indigo-500'
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className='mt-2'>
              <input
                id='password'
                type='password'
                autoComplete='current-password'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                {...register('password')}
              />
              {errors.password && (
                <p className='text-sm text-red-500'>
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {errors.root && (
            <p className='text-sm text-red-500'>{errors.root.message}</p>
          )}

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Sign in
            </button>
          </div>
        </form>

        <div className='my-10 flex w-full items-center'>
          <span className='h-px flex-grow rounded bg-gray-200'></span>
          <span className='mx-3 text-sm font-medium'>OR</span>
          <span className='h-px flex-grow rounded bg-gray-200'></span>
        </div>

        <GoogleSignIn />
      </div>

      <p className='mt-10 text-center text-sm text-gray-500'>
        Don't have an account?{' '}
        <Link
          href='/sign-up'
          className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
        >
          Sign up here
        </Link>
      </p>
    </>
  );
};
