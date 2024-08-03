import '@/app/ui/global.css';
import { Metadata } from 'next';
import SessionProvider from './context/provider';

export const metadata: Metadata = {
  title: 'iConnect',
  description: 'A file transfer app built on Next.js.',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
