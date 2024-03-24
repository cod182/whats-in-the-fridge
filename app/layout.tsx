import './globals.css';

import { Nav, Provider } from '@/components';

import Footer from '@/components/Footer/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: 'WITF?! | %s',
    default: `What's In The Fridge?`,
  }, description: "Fridge management. Know what's in your fridge",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="apple-mobile-web-app-title" content="What's In The Fridge?" />
        <meta name="application-name" content="What's In The Fridge?" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
      </head>

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
