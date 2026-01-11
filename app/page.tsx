"use client";
import Link from 'next/link';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await api.get('/products');
        // Tomamos los primeros 4 como tendencia
        const mapped = response.data.slice(0, 4).map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          category: p.category ? p.category.name : 'General',
          image: p.image || '/audifonos_1.png'
        }));
        setTrendingProducts(mapped);
      } catch (e) {
        console.error("Error fetching trending", e);
      }
    };
    fetchTrending();
  }, []);

  return (
    // YA NO PONEMOS COLORES AQUÍ (bg-white, etc). El CSS global se encarga.
    <main className="min-h-screen  font-sans selection:bg-blue-200 selection:text-blue-900">
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative w-full h-[550px] flex items-center justify-center overflow-hidden">
        {/* Fondo sutil degradado (Usamos opacidad para que se vea bien en oscuro y claro) */}
        <div className="absolute inset-0 bg-blue-500/5 z-0" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-4 block animate-in fade-in slide-in-from-bottom-4 duration-700">
            Tecnología y Reparación
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            Reparamos el presente <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              equipamos tu futuro.
            </span>
          </h1>

          <p className="opacity-80 text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Encuentra los mejores dispositivos, accesorios y el servicio técnico especializado que
            tus equipos merecen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <Link
              href="/producto"
              className="px-8 py-4 bg-blue-900 text-white font-bold rounded-full hover:scale-105 transition-all"
            >
              Ver Productos
            </Link>
            <Link
              href="/support"
              className="px-8 py-4 border border-current font-bold rounded-full hover:opacity-70 transition-all"
            >
              Servicio Técnico
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- BENEFICIOS ---------------- */}
      {/* Usamos 'card-theme' que definimos en CSS para que cambie de color solo */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/support">
            <div className="flex items-center gap-4 p-6 rounded-xl card-theme shadow-sm transition-all hover:scale-105">
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>
              </div>
              <div >
                <h3 className="font-bold text-lg">Garantía Asegurada</h3>
                <p className="text-sm opacity-60">En todas tus reparaciones.</p>
              </div>

            </div>
          </Link>
          <Link href="/producto#lista_producto">
            <div className="flex items-center gap-4 p-6 rounded-xl card-theme shadow-sm transition-all hover:scale-105">
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Envíos Rápidos</h3>
                <p className="text-sm opacity-60">Recibe tus productos en 24h.</p>
              </div>
            </div>
          </Link>
          <Link href="/producto">
            <div className="flex items-center gap-4 p-6 rounded-xl card-theme shadow-sm transition-all hover:scale-105">
              <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Mejores Precios</h3>
                <p className="text-sm opacity-60">Ofertas exclusivas online.</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ---------------- PRODUCTOS ---------------- */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex justify-between items-end mb-10 border-b border-gray-500/20 pb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Tendencias</h2>
            <p className="opacity-60">Lo más vendido de la semana.</p>
          </div>
          <Link
            href="/produ"
            className="text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-2 font-semibold"
          >
            Ver todo <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.length > 0 ? trendingProducts.map((item) => (
            <div
              key={item.id}
              className="group card-theme rounded-2xl p-4 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-full h-48 bg-gray-500/10 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                <img src={item.image} alt={item.name} className="object-contain h-full w-full" />
              </div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg group-hover:text-blue-500 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs opacity-50">{item.category}</p>
                </div>
                <span className="font-bold text-lg">${item.price}</span>
              </div>
              <button className="w-full mt-2 py-2.5 bg-blue-900 text-white font-bold rounded-lg hover:opacity-90 transition-colors shadow-sm">
                Añadir al Carrito
              </button>
            </div>
          )) : (
            <div className="col-span-4 text-center opacity-50">Cargando tendencias...</div>
          )}
        </div>
      </section>
      <Footer />
    </main >
  );
}
