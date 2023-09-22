export default function page() {
  return (
    <main className='m-auto flex min-h-screen max-w-xl items-center justify-center bg-[#F0F0F0]'>
      <form className='flex w-[400px] flex-col gap-4 bg-[#213555] p-4'>
        <h1 className='text-center text-2xl font-bold text-[#F0F0F0]'>
          Register
        </h1>
        <input
          className='px-2 py-1'
          type='text'
          placeholder='username'
          required
        />
        <input
          className='px-2 py-1'
          type='text'
          placeholder='fullname'
          required
        />
        <input
          className='px-2 py-1'
          type='password'
          placeholder='password'
          required
        />
        <button type='submit' className='mt-8 bg-[#E5D283] p-2 font-bold'>
          Register
        </button>
      </form>
    </main>
  );
}
