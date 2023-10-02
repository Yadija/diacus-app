'use client';

import { FormEvent, useEffect, useState } from 'react';
import useInput from '@/hooks/useInput';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await fetch('http://localhost:5000/auth', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });

  if (!response.ok) {
    alert('Failed to fetch data');
  }

  const responseJson = await response.json();
  return responseJson.data;
};

export default function Login() {
  const router = useRouter();

  const [username, onUsernameChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      setAuth(true);
    }
  }, []);

  if (auth) {
    router.push('/');
  }

  const onLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { accessToken } = await login({ username, password });
    localStorage.setItem('accessToken', accessToken);

    router.push('/');
  };

  return (
    <main className='m-auto flex min-h-screen max-w-xl items-center justify-center bg-[#F0F0F0]'>
      <form
        className='flex w-[400px] flex-col gap-4 bg-[#213555] p-4'
        onSubmit={onLogin}
      >
        <h1 className='text-center text-2xl font-bold text-[#F0F0F0]'>Login</h1>
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
          <Link href="/register" className='text-[#E5D283]'>Register</Link>
        </p>
      </form>
    </main>
  );
}
