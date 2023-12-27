'use client';

import * as Auth from '@aws-amplify/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface IFormInput {
  username: string;
  code: string;
}

const schema = yup.object().shape({
  username: yup.string().required(),
  code: yup.string().required('Sign up confirmation code required'),
});

export const SignUpConfirmForm: React.FC = () => {
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
      console.log(data);
      const { isSignUpComplete, nextStep } = await Auth.confirmSignUp({
        username: data.username,
        confirmationCode: data.code,
      });

      console.log('SUCCESS!', data);
      console.log(isSignUpComplete, nextStep);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mt-3'>
        <div className='mt-2'>
          <label
            htmlFor='code'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Code
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
      </div>

      <div className='mt-2'>
        <button
          type='submit'
          className='rounded-md bg-white px-2.5 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
        >
          Submit
        </button>
      </div>
    </form>
  );
};
