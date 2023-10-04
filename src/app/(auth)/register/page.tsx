'use client';

import useInput from '@/hooks/useInput';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const register = async ({
  username,
  fullname,
  password,
}: {
  username: string;
  fullname: string;
  password: string;
}) => {
  const response = await fetch('http://localhost:5000/users', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({
      username,
      fullname,
      password,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });

  if (!response.ok) {
    return response.json();
  }

  const responseJson = await response.json();
  return responseJson.data;
};

export default function Register() {
  const session = useSession();
  const router = useRouter();

  const [username, onUsernameChange] = useInput('');
  const [fullname, onFullnameChange] = useInput('');
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

  const onRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = await register({ username, fullname, password });

    if (data.statusCode === 400) {
      if (typeof data.message === 'string') {
        setErrorMessage(data.message);
      } else {
        setErrorMessage(data.message[0]);
      }
      return;
    }

    router.push('/login');
  };

  if (session.status === 'unauthenticated') {
    return (
      <main className='m-auto flex min-h-screen max-w-xl items-center justify-center bg-[#F0F0F0]'>
        <form
          className='flex w-[400px] flex-col gap-4 bg-[#213555] p-4'
          onSubmit={onRegister}
        >
          <h1 className='text-center text-2xl font-bold text-[#F0F0F0]'>
            Register
          </h1>
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
            type='text'
            placeholder='fullname'
            onChange={onFullnameChange}
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
            Register
          </button>
          <p className='text-center text-[#F0F0F0]'>
            {`Already have an account? `}
            <Link href='/login' className='text-[#E5D283]'>
              Login
            </Link>
          </p>
        </form>
      </main>
    );
  } else {
    return null;
  }
}
