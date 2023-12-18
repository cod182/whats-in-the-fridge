import type { Metadata } from 'next';
import './globals.css';

import { Nav } from '@/components';

export const metadata: Metadata = {
  title: "What's in the fridge?",
  description: "Fridge management. Know what's in your fridge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className="max-w-6xl mx-auto bg-[#88caff]">
        <Nav />
        {children}
      </body>
    </html>
  );
}
