import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '300',
});

export const metadata: Metadata = {
  title: 'Diacus',
  description: 'A simple Diacus App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
