'use client';

import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const session = useSession();

  return (
    <nav className='flex justify-between bg-[#213555] p-4 text-[#F0F0F0]'>
      <h1>Diacus App</h1>
      {session.status === 'authenticated' ? (
        <button onClick={() => signOut()} className='text-[#E5D283]'>
          Logout
        </button>
      ) : (
        <Link href='/login' className='text-[#E5D283]'>
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
