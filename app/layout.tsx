import type { Metadata } from 'next';
import './globals.css';

import { Nav } from '@/components';
import { NavigationProvider } from '@/context/NavigationProvider';

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
      <body>
        <NavigationProvider>
          <Nav />
          {children}
        </NavigationProvider>
      </body>
    </html>
  );
}
