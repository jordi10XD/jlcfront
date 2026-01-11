'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Sparkles, Zap, ArrowRight, X } from 'lucide-react';
import PromoCarousel from '../components/promocarrusel';
import { useCart } from '../components/carcontext';
import CategoryTabs from '../components/CategoryTabs';
import { useProducts } from '../components/productcontext';

export default function ProductsPage() {
  const { addToCart, cartCount } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // 1. IMPORTANTE: Traemos searchQuery para saber si el usuario está buscando
  const { products, searchQuery } = useProducts();

  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))), [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, products, searchQuery]);

  return (
    <div className="bg-theme text-theme min-h-screen selection:bg-blue-500/30 transition-colors duration-300 relative">
      
      {/* 2. CAMBIO AQUÍ: Ocultamos el Banner si hay búsqueda (!searchQuery) */}
      {!searchQuery && (
        <section className="relative pt-32 pb-24 px-6 overflow-hidden border-b borde-theme">
          <div className="absolute inset-0 opacity-5 pointer-events-none" 
               style={{ background: 'radial-gradient(circle at 30% 30%, var(--texto), transparent 50%)' }} />
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none" 
               style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }} />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-7xl md:text-9xl font-black italic leading-[0.8] tracking-tighter mb-8 opacity-90">
                NUESTROS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">PRODUCTOS</span>
              </h1>
              <p className="max-w-md opacity-60 text-xs md:text-sm font-medium leading-relaxed border-l-2 border-blue-600 pl-6 uppercase tracking-widest">
                Experimenta el futuro hoy con nuestra colección de periféricos de alto rendimiento.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* CATEGORÍAS */}
      <div className={`sticky ${searchQuery ? 'top-[80px]' : 'top-[60px]'} z-[100] w-full transition-all`}>
        <div className="absolute inset-0 backdrop-blur-2xl border-b borde-theme shadow-sm opacity-95" 
             style={{ backgroundColor: 'var(--fondo)' }} />
        <div className="max-w-7xl mx-auto px-6 py-5 relative z-10">
          <div className="flex items-center justify-between gap-8">
            <CategoryTabs 
              categories={categories} 
              selected={selectedCategory} 
              onSelect={setSelectedCategory} 
            />
            {/* Ocultamos decoración extra si estamos buscando para limpiar la vista */}
            {!searchQuery && (
              <div className="hidden lg:flex items-center gap-4 opacity-20">
                <span className="h-[1px] w-12 bg-current"></span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        
        {/* También ocultamos el Carrusel si hay búsqueda */}
        {selectedCategory === 'ALL' && !searchQuery && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 rounded-[3rem] overflow-hidden shadow-xl borde-theme"
          >
            <PromoCarousel />
          </motion.div>
        )}

        {/* Feedback de Búsqueda */}
        {searchQuery && (
            <div className="mb-8 opacity-60 font-bold uppercase tracking-widest text-sm">
                Resultados para: <span className="text-blue-500">"{searchQuery}"</span>
            </div>
        )}

        {/* MENSAJE SI NO HAY RESULTADOS */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <p className="text-xl font-bold italic">No encontramos productos que coincidan con tu búsqueda.</p>
          </div>
        )}

        {/* GRID DE PRODUCTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 auto-rows-auto" id='lista_producto'>
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`group relative card-theme rounded-[2.5rem]
                  hover:shadow-2xl hover:-translate-y-1 transition-all duration-500
                  ${selectedCategory === 'ALL' ? product.span : 'col-span-1'}
                `}
              >
                <Link href={`/product/${product.id}`} className="flex flex-col h-full">
                  
                  {/* IMAGEN */}
                  <div className="relative aspect-square w-full flex items-center justify-center p-10 overflow-hidden rounded-[2.5rem] border-b borde-theme" 
                        style={{ backgroundColor: 'var(--fondo)' }}>
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: -2 }} 
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-contain drop-shadow-2xl w-full h-full max-w-[250px]"
                      />
                    </motion.div>
                    
                    <div className="absolute bottom-6 left-6 z-20">
                      <div className="backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm borde-theme flex items-center gap-2" 
                           style={{ backgroundColor: 'rgba(var(--tarjeta-bg), 0.8)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                        <span className="text-[10px] font-bold tracking-wider opacity-90">
                          {product.displayPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="p-8 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em]">
                          {product.category}
                        </span>
                        <Zap size={12} className="opacity-30" />
                      </div>
                      <h3 className="text-xl font-black leading-[1.1] mb-8 uppercase italic group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 mt-auto">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        className="theme-btn flex-grow h-16 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-md relative z-10 hover:brightness-95 transition-all"
                      >
                        <Plus size={16} /> Añadir al Set
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="h-16 w-16 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 z-10 flex items-center justify-center hover:bg-blue-700 hover:scale-105 transition-all"
                      >
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* CARRITO FLOTANTE */}
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-12 right-12 z-[110] bg-blue-600 text-white w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-[0_20px_50px_rgba(37,99,235,0.4)] cursor-pointer group"
      >
        <ShoppingCart size={28} className="group-hover:animate-bounce" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 theme-btn text-[10px] font-black h-7 w-7 rounded-full flex items-center justify-center border-4 border-transparent shadow-sm">
            {cartCount}
          </span>
        )}
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}

// COMPONENTE MODAL
function ProductModal({ product, onClose }: { product: any, onClose: () => void }) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
        >
          <X size={20} className="text-gray-500 dark:text-white" />
        </button>

        <div className="bg-gray-50 dark:bg-black/20 h-72 flex items-center justify-center p-8 relative">
           <img 
             src={product.image} 
             alt={product.name} 
             className="w-full h-full object-contain drop-shadow-xl" 
           />
           <div className="absolute bottom-4 left-6 bg-white/90 dark:bg-zinc-800/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
              {product.displayPrice}
           </div>
        </div>

        <div className="p-8">
           <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md">
                {product.category}
              </span>
           </div>
           
           <h2 className="text-2xl font-black italic uppercase leading-none mb-4 text-gray-900 dark:text-white">
             {product.name}
           </h2>

           <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
             Producto de alta calidad de la categoría {product.category}.
           </p>

           <div className="flex gap-3">
             <Link 
               href={`/product/${product.id}`}
               className="flex-1 py-3 rounded-xl border-2 border-gray-100 dark:border-zinc-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
             >
               Ver Detalles
             </Link>
             <button className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/30 transition-transform active:scale-95">
               Comprar Ahora
             </button>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
}