'use client';

import * as Auth from '@aws-amplify/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { SignUpConfirmSuccess } from '@/app/(non-auth)/sign-up-confirm/components/sign-up-confirm-success';

interface IFormInput {
  username: string;
  code: string;
}

const schema = yup.object().shape({
  username: yup.string().required(),
  code: yup.string().required('Sign up confirmation code required'),
});

export const SignUpConfirmForm: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();

  const email = searchParams.get('email') || '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: { username: email, code: '' },
  });

  const onSubmit = async (data: IFormInput) => {
    try {
      await Auth.confirmSignUp({
        username: data.username,
        confirmationCode: data.code,
      });

      setSuccess(true);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  return (
    <>
      <div className='mt-10 rounded-md bg-white drop-shadow sm:mx-auto sm:w-full sm:max-w-lg md:p-10'>
        {success ? (
          <SignUpConfirmSuccess />
        ) : (
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor='code'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Code
              </label>
              <div className='mt-2'>
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
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>

      <p className='mt-10 text-center text-sm text-gray-500'>
        <Link
          href='/sign-in'
          className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
        >
          Go to sign in
        </Link>
      </p>
    </>
  );
};
