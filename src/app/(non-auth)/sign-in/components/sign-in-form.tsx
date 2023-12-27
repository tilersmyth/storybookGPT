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
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required('E-mail is required'),
  password: yup.string().required('Password is required'),
});

export const SignInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });
  const router = useRouter();

  const onSubmit = async (data: IFormInput) => {
    try {
      await Auth.signIn({
        username: data.email,
        password: data.password,
      });

      router.push('/');
    } catch (error) {
      console.log('login err: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mt-3'>
        <label
          htmlFor='email'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          E-mail address
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

        <div className='mt-2'>
          <input
            type='password'
            id='password'
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            {...register('password')}
          />

          {errors.password && (
            <p className='text-sm text-red-500'>{errors.password.message}</p>
          )}
        </div>
      </div>

      <div className='mt-2'>
        <button
          type='submit'
          className='rounded-md bg-white px-2.5 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
        >
          Login
        </button>
      </div>

      <div className='mt-2'>
        <Link href='/sign-up'>Don't have an account? Create one</Link>
      </div>
    </form>
  );
};
