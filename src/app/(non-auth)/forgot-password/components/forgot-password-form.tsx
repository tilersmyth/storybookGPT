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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mt-3'>
        <div className='mt-2'>
          <label
            htmlFor='email'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            E-mail
          </label>

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

      <div className='mt-2'>
        <button
          type='submit'
          className='rounded-md bg-white px-2.5 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
        >
          Reset Password
        </button>
      </div>

      <div className='mt-2'>
        <Link href='/sign-in'>Back to sign in</Link>
      </div>
    </form>
  );
};
