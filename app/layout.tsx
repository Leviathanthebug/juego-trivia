import type { Metadata } from 'next';
import { TriviaProvider } from '@/components/TriviaProvider';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Trivia App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <TriviaProvider>
          <Header />
          <main style={{ padding: '20px' }}>
            {children}
          </main>
        </TriviaProvider>
      </body>
    </html>
  );
}