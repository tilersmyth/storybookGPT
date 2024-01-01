'use client';

import * as Auth from '@aws-amplify/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface IFormInput {
  email: string;
  code: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required('E-mail is required'),
  code: yup.string().required('Reset code is required'),
  password: yup.string().required('New password is required'),
});

export const ResetPasswordForm: React.FC = () => {
  const searchParams = useSearchParams();

  const email = searchParams.get('email') || '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: { email, code: '', password: '' },
  });

  const onSubmit = async (data: IFormInput) => {
    try {
      const res = await Auth.confirmResetPassword({
        username: data.email,
        confirmationCode: data.code,
        newPassword: data.password,
      });

      console.log('RESP: ', res);
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

        <div className='mt-2'>
          <label
            htmlFor='code'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Reset Code
          </label>

          <input
            type='text'
            id='code'
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            {...register('code')}
          />

          {errors.code && (
            <p className='text-sm text-red-500'>{errors.code.message}</p>
          )}
        </div>

        <div className='mt-2'>
          <label
            htmlFor='password'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            New Password
          </label>

          <input
            type='password'
            id='password'
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            {...register('password')}
          />

          {errors.code && (
            <p className='text-sm text-red-500'>{errors.code.message}</p>
          )}
        </div>
      </div>

      <div className='mt-2'>
        <button
          type='submit'
          className='rounded-md bg-white px-2.5 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
        >
          Update Password
        </button>
      </div>
    </form>
  );
};
