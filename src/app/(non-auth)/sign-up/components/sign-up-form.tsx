'use client';

import * as Auth from '@aws-amplify/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface IFormInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  email: yup.string().required('E-mail is required'),
  password: yup.string().required('Password is required'),
});

export const SignUpForm: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: IFormInput) => {
    try {
      const { isSignUpComplete, userId, nextStep } = await Auth.signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            given_name: data.first_name,
            family_name: data.last_name,
          },
        },
      });

      console.log('SUCCESS!');
      console.log(isSignUpComplete, userId, nextStep);

      router.push(`/sign-up-confirm?email=${data.email}`);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mt-3'>
        <div className='mt-2'>
          <label
            htmlFor='first_name'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            First Name
          </label>

          <input
            type='text'
            id='first_name'
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            {...register('first_name')}
          />

          {errors.first_name && (
            <p className='text-sm text-red-500'>{errors.first_name.message}</p>
          )}
        </div>

        <div className='mt-2'>
          <label
            htmlFor='last_name'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Last Name
          </label>

          <input
            type='text'
            id='last_name'
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            {...register('last_name')}
          />

          {errors.last_name && (
            <p className='text-sm text-red-500'>{errors.last_name.message}</p>
          )}
        </div>

        <div className='mt-2'>
          <label
            htmlFor='email'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            E-mail address
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
            htmlFor='email'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Password
          </label>

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
          Sign up
        </button>
      </div>

      <div className='mt-2'>
        <Link href='/sign-in'>Already have an account? Click here</Link>
      </div>
    </form>
  );
};
