// src/app/layout.tsx
import { pretendard } from '@/fonts/fonts';
import '../styles/globals.css';

export const metadata = {
  title: 'TCAG Beta',
  icons: {
    icon: '/favicon.ico'
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pretendard.variable}>
      <body className="font-pretendard">{children}</body>
    </html>
  );
}