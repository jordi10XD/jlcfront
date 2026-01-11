'use client'; 

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // ✅ Usamos la librería

// 📸 TUS IMÁGENES AQUÍ
const images = [
  '/combo_audifonos.png',
  '/combo_juegos.png',
  '/combo_karaoke.png',
];

export default function Carrusel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); 
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    // 👇 AJUSTE DE TAMAÑO:
    // h-56 (móvil) a h-96 (escritorio). Esto crea un banner rectangular que no invade toda la pantalla.
    // bg-white ayuda a que si la imagen no llena los bordes, se funda con el fondo (útil para fotos de productos con fondo blanco).
    <div className="relative w-full h-56 md:h-80 lg:h-96 group overflow-hidden bg-white">
      
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            // ✅ IMPORTANTE: 'object-contain' muestra la imagen completa sin recortarla.
            // Como tu imagen tiene fondo blanco, se verá perfecta integrada en el contenedor.
            className="object-contain" 
            priority={index === 0}
          />
        </div>
      ))}

      {/* --- Controles (Lucide React) --- */}
      
      {/* Flecha Izquierda */}
      <button
        onClick={prevSlide}
        className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-4 text-gray-800 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Flecha Derecha */}
      <button
        onClick={nextSlide}
        className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-4 text-gray-800 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => setCurrentIndex(slideIndex)}
            className={`cursor-pointer w-2.5 h-2.5 rounded-full transition-all border border-gray-300 ${
              currentIndex === slideIndex ? 'bg-blue-600 scale-110' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}