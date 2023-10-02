'use client';
import useInput from '@/hooks/useInput';
import React, { FormEvent, useEffect, useState } from 'react';

async function postThread(content: string) {
  const accessToken = localStorage.getItem('accessToken');
  console.log(accessToken);

  const response = await fetch('http://localhost:5000/threads', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      content,
    }),
  });

  if (!response.ok) {
    alert('Failed to fetch data');
  }

  const responseJson = await response.json();
  return responseJson.data;
}

const ThreadInput = () => {
  const [content, onContentChange] = useInput('');

  const onCreateThread = async (content: string) => {
    const data = await postThread(content);
    console.log(data);
  };

  const handlereateThread = async (event: FormEvent<HTMLFormElement>) => {
    // event.preventDefault();

    await onCreateThread(content);
    // router.refresh();
  };

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      setAuth(true);
    }
  }, []);

  if (!auth) {
    return null;
  }

  return (
    <form
      className='mx-2 my-4 flex w-full justify-center'
      onSubmit={handlereateThread}
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
