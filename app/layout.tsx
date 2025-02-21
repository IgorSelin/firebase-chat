import { Navigation } from '@/components/Navigation';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import styles from './styles.module.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Firebase Chat',
  description: 'Firebase chat by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className={styles.container}>
          <div className={styles.navigation}>
            <Navigation />
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </body>
    </html>
  );
}
