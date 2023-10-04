'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useInput from '@/hooks/useInput';

export default function Login() {
  const session = useSession();
  const router = useRouter();

  const [username, onUsernameChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (session.status === 'authenticated') {
      router?.push('/');
    }
  }, [session]);
  
  if (session.status === 'loading') {
    return <p>Loading ...</p>;
  }

  const onLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const login = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (login?.status === 401) {
      setErrorMessage('Invalid username or password');
      return;
    }
  };

  if (session.status === 'unauthenticated') {
    return (
      <main className='m-auto flex min-h-screen max-w-xl items-center justify-center bg-[#F0F0F0]'>
        <form
          className='flex w-[400px] flex-col gap-4 bg-[#213555] p-4'
          onSubmit={onLogin}
        >
          <h1 className='text-center text-2xl font-bold text-[#F0F0F0]'>Login</h1>
          {errorMessage && (
            <p className='translate-y-3 text-sm text-red-500 shadow-md'>
              *{errorMessage}
            </p>
          )}
          <input
            className='px-2 py-1'
            type='text'
            placeholder='username'
            onChange={onUsernameChange}
            required
          />
          <input
            className='px-2 py-1'
            type='password'
            placeholder='password'
            onChange={onPasswordChange}
            required
          />
          <button type='submit' className='mt-8 bg-[#E5D283] p-2 font-bold'>
            Login
          </button>
          <p className='text-center text-[#F0F0F0]'>
            {`Don't have an account? `}
            <Link href='/register' className='text-[#E5D283]'>
              Register
            </Link>
          </p>
        </form>
      </main>
    );
  } else {
    return null;
  }
}
