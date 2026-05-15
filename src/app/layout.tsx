import type {Metadata} from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { AudioProvider } from '@/context/audio-context';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'MEDULAR | Diálogos de Regeneración',
  description: 'Ecosistema vivo de narrativas, colaboración y acción para la sostenibilidad y la regeneración. Desarrollado por Núcleo Colectivo + Integricult.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:wght@900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col selection:bg-[#00e1ff]/20 selection:text-[#00e1ff] bg-white">
        <FirebaseClientProvider>
          <AudioProvider>
            {children}
            <Toaster />
          </AudioProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
