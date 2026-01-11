import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import { CartProvider } from './components/carcontext';
import {ProductProvider} from './components/productcontext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tech Innovation - Shop',
  description: 'Premium tech accessories store',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Asegúrate de que el body no tenga 'overflow-hidden'. 
        'antialiased' es perfecto para mantener las fuentes limpias.
      */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
        <ProductProvider>
        <CartProvider>
          {/* Navbar suele ser 'fixed' o 'sticky'. 
            Si es fixed, no afecta al flujo de los hijos. 
          */}
          <Navbar />

          {/* ELIMINADO: <main className="pt-10">
            Ahora inyectamos los hijos directamente. 
            El padding superior (pt-10) ahora lo maneja cada página 
            internamente para no romper el 'sticky' de las categorías.
          */}
          {children}
        </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}