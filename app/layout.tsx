import './globals.css';

import { Nav, Provider } from '@/components';

import Footer from '@/components/Footer/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "What's in the fridge?",
  description: "Fridge management. Know what's in your fridge",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en">
      <head></head>

      <body className="max-w-6xl mx-auto bg-[#88caff] min-h-[100vh] flex flex-col">
        <Provider>
          <Nav />
          {children}
        </Provider>
        <Footer />
      </body>
    </html >
  );
}
