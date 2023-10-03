import ThreadInput from '@/components/ThreadInput/ThreadInput';
import Image from 'next/image';

async function getData() {
  const response = await fetch('http://localhost:5000/threads', {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const responseJson = await response.json();
  return responseJson.data;
}

export default async function Home() {
  const data = await getData();

  return (
    <main className='relative m-auto min-h-screen max-w-xl bg-[#F0F0F0]'>
      <nav className='bg-[#213555] p-4 text-[#F0F0F0]'>
        <h1>Diacus App</h1>
      </nav>

      <ThreadInput />

      <ul className='m-4 flex flex-col gap-2'>
        {data.threads.map(
          (thread: { id: string; content: string; owner: string }) => (
            <li key={thread.id}>
              <section className='flex w-full gap-2 bg-[#E5D283] px-2 py-4'>
                <div className='relative h-12 w-12 rounded-full bg-[#213555]'>
                  <Image
                    src={`https://ui-avatars.com/api/?name=${thread.owner}&background=random`}
                    alt={thread.owner}
                    fill={true}
                    sizes='100%'
                    className='rounded-full object-cover'
                  />
                </div>
                <article className='flex-1'>
                  <h2 className='text-sm'>@{thread.owner}</h2>
                  <p className='text-2xl'>{thread.content}</p>
                </article>
              </section>
            </li>
          )
        )}
      </ul>
    </main>
  );
}
