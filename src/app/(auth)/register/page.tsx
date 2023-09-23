'use client';

import useInput from '@/hooks/useInput';
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
    alert('Failed to fetch data');
  }

  const responseJson = await response.json();
  return responseJson.data;
};

export default function Register() {
  const router = useRouter();

  const [username, onUsernameChange] = useInput('');
  const [fullname, onFullnameChange] = useInput('');
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

  const onRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await register({ username, fullname, password });

    router.push('/login');
  };

  return (
    <main className='m-auto flex min-h-screen max-w-xl items-center justify-center bg-[#F0F0F0]'>
      <form
        className='flex w-[400px] flex-col gap-4 bg-[#213555] p-4'
        onSubmit={onRegister}
      >
        <h1 className='text-center text-2xl font-bold text-[#F0F0F0]'>
          Register
        </h1>
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
      </form>
    </main>
  );
}
