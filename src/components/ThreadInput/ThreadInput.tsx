'use client';

import React, { FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import useInput from '@/hooks/useInput';

const ThreadInput = () => {
  const session = useSession();
  const axiosPrivate = useAxiosPrivate();
  const [content, onContentChange] = useInput('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axiosPrivate.post('/threads', JSON.stringify({ content }));
  };

  if (session.status === 'loading' || session.status === 'unauthenticated') {
    return null;
  }

  return (
    <form
      className='mx-2 my-4 flex w-full justify-center'
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        placeholder='Write your message ...'
        onChange={onContentChange}
        className='mx-2 w-96 rounded-xl px-3 py-1 shadow-sm'
      />
      <button
        type='submit'
        className='rounded-xl bg-[#213555] px-3 py-1 text-[#F0F0F0] shadow-sm'
      >
        Send
      </button>
    </form>
  );
};

export default ThreadInput;
