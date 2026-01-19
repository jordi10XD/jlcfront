'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
// Eliminé 'Star' de los imports ya que no se usa
import { ShoppingCart, Truck, Shield, RefreshCw, Check, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCart } from '../../components/carcontext';
import { useProducts } from '../../components/productcontext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { products } = useProducts();
  const { addToCart } = useCart();
  
  // Estado local
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('desc'); // 'desc' | 'specs'
  const [loading, setLoading] = useState(true);

  // Buscar el producto basado en el ID de la URL
  useEffect(() => {
    if (products.length > 0 && params?.id) {
      const found = products.find((p) => 
        p.id.toString() === params.id?.toString()
      );
      setProduct(found || null);
      setLoading(false);
    }
  }, [products, params]);

  // Manejador de carga
  if (loading) return <div className="min-h-screen bg-theme flex items-center justify-center text-blue-600">Cargando producto...</div>;
  
  // Si no encuentra el producto
  if (!product) return (
    <div className="min-h-screen bg-theme text-theme flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Producto no encontrado</h1>
      <Link href="/producto" className="text-blue-600 hover:underline">Volver al catálogo</Link>
    </div>
  );

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
        addToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/pago');
  };

  return (
    <div className="min-h-screen bg-theme text-theme transition-colors duration-300 pb-20 pt-28">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <Link href="/producto" className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 hover:text-blue-600 transition-all">
          <ArrowLeft size={16} /> Volver al Catálogo
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* COLUMNA IZQUIERDA: IMAGEN */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="aspect-square card-theme rounded-[3rem] shadow-xl border borde-theme flex items-center justify-center p-12 relative overflow-hidden group">
            <motion.img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-2xl z-10 relative group-hover:scale-110 transition-transform duration-500"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            {/* Fondo decorativo sutil */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-50" />
          </div>
        </motion.div>

        {/* COLUMNA DERECHA: INFO Y COMPRA */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col h-full"
        >
          {/* Categoría (Rating ELIMINADO) */}
          <div className="flex items-center justify-start mb-4">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              {product.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black italic uppercase leading-none mb-6 text-theme">
            {product.name}
          </h1>

          <div className="text-3xl font-bold text-blue-600 mb-8 flex items-end gap-3">
             {product.displayPrice}
             <span className="text-lg opacity-40 line-through font-normal mb-1 text-theme">
                ${(product.price * 1.2).toFixed(2)}
             </span>
          </div>

          {/* Selector de Cantidad */}
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center card-theme border borde-theme rounded-xl p-1">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                    <Minus size={16} />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                   onClick={() => setQuantity(q => q + 1)}
                   className="w-10 h-10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                    <Plus size={16} />
                </button>
            </div>
            <span className="text-sm text-green-500 font-bold flex items-center gap-1">
                <Check size={14} /> Stock Disponible
            </span>
          </div>

          {/* Botones de Acción */}
          <div className="flex gap-4 mb-10">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-theme-invert text-theme-invert border borde-theme py-4 rounded-2xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-lg flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--texto)', color: 'var(--fondo)' }}
            >
              <ShoppingCart size={20} /> Añadir
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-blue-700 hover:scale-[1.02] transition-all shadow-lg shadow-blue-500/30"
            >
              Comprar Ahora
            </button>
          </div>

          {/* Ventajas - Bordes con borde-theme */}
          <div className="grid grid-cols-3 gap-4 border-t border-b borde-theme py-6 mb-8">
             <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600">
                    <Truck size={20} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">Envío Rápido</span>
             </div>
             <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full text-purple-600">
                    <Shield size={20} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">Garantía 1 Año</span>
             </div>
             <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full text-green-600">
                    <RefreshCw size={20} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">Devolución Gratis</span>
             </div>
          </div>

          {/* Tabs - Bordes con borde-theme */}
          <div className="flex flex-col flex-grow">
            <div className="flex gap-8 border-b borde-theme mb-6">
                <button 
                    onClick={() => setActiveTab('desc')}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'desc' ? 'border-blue-600 text-blue-600' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                    Descripción
                </button>
                <button 
                    onClick={() => setActiveTab('specs')}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'specs' ? 'border-blue-600 text-blue-600' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                    Ficha Técnica
                </button>
            </div>

            <div className="text-theme opacity-80 leading-relaxed text-sm">
                {activeTab === 'desc' ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="mb-4">
                            Eleva tu experiencia con el nuevo <strong>{product.name}</strong>. Diseñado meticulosamente para ofrecer un rendimiento superior y un estilo inigualable. 
                            Este dispositivo cuenta con la última tecnología en su categoría, asegurando durabilidad y eficiencia.
                        </p>
                        <p>
                            Ideal para uso diario o profesional, su acabado premium se adapta a cualquier setup. No es solo un accesorio, es una mejora directa a tu estilo de vida digital.
                        </p>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <ul className="space-y-3">
                            {['Categoría', 'Modelo', 'Garantía', 'Envío', 'Stock'].map((label, i) => (
                                <li key={i} className={`flex justify-between ${i < 4 ? 'border-b borde-theme pb-2' : 'pt-2'}`}>
                                    <span className="font-bold">{label}:</span> 
                                    <span>
                                        {label === 'Categoría' ? product.category : 
                                         label === 'Modelo' ? 'Pro Series X' :
                                         label === 'Garantía' ? '12 Meses' :
                                         label === 'Envío' ? 'Global' : 'Disponible'}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}