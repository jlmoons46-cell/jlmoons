import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JLMOONS | Expert Crypto & Digital Asset Recovery',
  description: 'Trusted specialists worldwide for recovering lost crypto, wallet access, and hacked accounts. $8M+ recovered with a 94% success rate.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
