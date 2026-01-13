'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Oswald, Raleway } from 'next/font/google';
import { useCart } from '../components/carcontext'; 
import { useProducts } from '../components/productcontext';
import { 
  ArrowLeft, 
  CheckCircle, 
  Smartphone, 
  MapPin, 
  User, 
  Mail, 
  CreditCard, 
  Plus, 
  Loader2, 
  ImageIcon,
  ShieldCheck
} from 'lucide-react';

const oswald = Oswald({ subsets: ['latin'], weight: ['400', '500', '700'] });
const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

interface CartItem {
  id: number | string;
  name: string;
  price: number | string;
  quantity: number;
  image?: string;
}

interface Product {
  id: number | string;
  name: string;
  price: number | string;
  image: string;
}

export default function PagoPage() {
  const { cart, addToCart } = useCart() as { cart: CartItem[], addToCart: (p: any) => void };
  const { products, uploadImage, isUploading } = useProducts() as { 
    products: Product[], 
    uploadImage: (file: File) => Promise<string | null>, 
    isUploading: boolean 
  };

  const [mounted, setMounted] = useState(false);
  const [comprobanteUrl, setComprobanteUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    cedula: '',
    telefono: '',
    direccion: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // FUNCIÓN DE PRECIO CORREGIDA (Elimina $ y asegura número)
  const cleanPrice = (val: any): number => {
    if (typeof val === 'number') return val;
    const cleaned = String(val).replace(/[^\d.-]/g, ''); // Solo deja números y puntos
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const subtotal = cart.reduce((sum: number, item: CartItem) => {
    return sum + (cleanPrice(item.price) * (item.quantity || 1));
  }, 0);
  
  const costoEnvio = 2.50;
  const total = subtotal + costoEnvio;

  // SUGERENCIAS: Lógica más flexible para asegurar que se muestren
  const sugerencias = products
    .filter((p: Product) => !cart.some((c: CartItem) => String(c.id) === String(p.id)))
    .slice(0, 3);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadImage(file);
      if (url) setComprobanteUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comprobanteUrl) {
        alert("Por favor, sube el comprobante de pago para finalizar.");
        return;
    }

    const listaStr = cart.map(i => `• ${i.name} (x${i.quantity})`).join('\n');
    const msg = `*NUEVO PEDIDO JLC*\n\n*CLIENTE:*\n👤 ${formData.nombre}\n📧 ${formData.email}\n📱 ${formData.telefono}\n📍 ${formData.direccion}\n\n*PEDIDO:*\n${listaStr}\n\n*TOTAL:* $${total.toFixed(2)}\n\n📎 *PAGO:* ${comprobanteUrl}`;

    window.open(`https://wa.me/593999999999?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen bg-slate-50 pb-20 ${raleway.className}`}>
      
      {/* HEADER AZUL PROFESIONAL */}
      <header className="bg-blue-950 text-white sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:bg-blue-900 px-3 py-1 rounded-lg transition">
                <ArrowLeft size={18} /> <span className="text-xs font-bold uppercase tracking-widest">Tienda</span>
            </Link>
            <div className={`text-xl font-bold tracking-tighter flex items-center gap-2 ${oswald.className}`}>
                <ShieldCheck className="text-blue-400" size={24} /> FINALIZAR COMPRA
            </div>
            <div className="w-20 hidden md:block"></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {/* FORMULARIO DE FACTURACIÓN */}
            <section className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200">
              <h2 className={`text-2xl font-bold text-slate-800 mb-8 border-b pb-4 ${oswald.className}`}>1. INFORMACIÓN DE ENTREGA</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Nombre Completo</label>
                    <input type="text" name="nombre" placeholder="Escriba su nombre para la factura" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900 transition outline-none" onChange={handleInputChange}/>
                </div>
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Correo Electrónico</label>
                    <input type="email" name="email" placeholder="ejemplo@correo.com" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900 transition outline-none" onChange={handleInputChange}/>
                </div>
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Teléfono / WhatsApp</label>
                    <input type="tel" name="telefono" placeholder="099-999-9999" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900 transition outline-none" onChange={handleInputChange}/>
                </div>
                <div className="md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Cédula o RUC</label>
                    <input type="text" name="cedula" placeholder="Identificación fiscal" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900 transition outline-none" onChange={handleInputChange}/>
                </div>
                <div className="md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Dirección de Envío</label>
                    <textarea name="direccion" placeholder="Ciudad, calle principal y referencias..." required rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900 transition outline-none resize-none" onChange={handleInputChange}/>
                </div>
              </div>
            </section>

            {/* PAGO POR TRANSFERENCIA */}
            <section className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200">
                <h2 className={`text-2xl font-bold text-slate-800 mb-8 border-b pb-4 ${oswald.className}`}>2. MÉTODO DE PAGO</h2>
                
                <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="space-y-1">
                        <p className="text-blue-900 font-bold text-lg">Banco Pichincha (Ahorros)</p>
                        <p className="text-blue-700 text-sm italic">Luis Miguel Touriz Garnica | C.I. 2211974115</p>
                    </div>
                </div>

                <div className="relative">
                    <input type="file" id="up" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
                    <label htmlFor="up" className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-3xl cursor-pointer transition-all
                        ${comprobanteUrl ? 'border-green-500 bg-green-50' : 'border-slate-300 hover:border-blue-500 hover:bg-slate-50'}`}>
                        {isUploading ? (
                            <><Loader2 className="animate-spin text-blue-900 mb-2" size={32} /><p className="font-bold">Procesando imagen...</p></>
                        ) : comprobanteUrl ? (
                            <><CheckCircle className="text-green-600 mb-2" size={32} /><p className="font-bold text-green-700 uppercase tracking-widest text-sm">Comprobante Listo</p></>
                        ) : (
                            <><ImageIcon className="text-slate-400 mb-2" size={32} /><p className="font-bold text-slate-500 uppercase tracking-widest text-sm">Subir Comprobante de Pago</p></>
                        )}
                    </label>
                </div>
            </section>
          </div>

          {/* BARRA LATERAL (TOTALES Y SUGERENCIAS) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-24 space-y-6">
                
                <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden">
                    <div className="bg-blue-950 text-white p-6 text-center">
                        <p className={`text-lg font-bold tracking-widest ${oswald.className}`}>RESUMEN DE COMPRA</p>
                    </div>
                    
                    <div className="p-6 max-h-[250px] overflow-y-auto divide-y divide-slate-100">
                        {cart.map((item) => (
                            <div key={item.id} className="py-4 flex gap-4 items-center">
                                <div className="w-14 h-14 bg-slate-50 rounded-xl relative border border-slate-100 flex-shrink-0">
                                    <Image src={item.image || '/logo.png'} alt={item.name} fill className="object-contain p-1" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-800 truncate">{item.name}</p>
                                    <p className="text-xs text-slate-400 font-medium">Cantidad: {item.quantity}</p>
                                </div>
                                <p className="text-sm font-black text-slate-700">
                                    ${(cleanPrice(item.price) * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 bg-slate-50 border-t space-y-3">
                        <div className="flex justify-between text-sm text-slate-500 font-medium"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between text-sm text-slate-500 font-medium"><span>Costo de Envío</span><span>${costoEnvio.toFixed(2)}</span></div>
                        <div className="flex justify-between text-2xl font-black text-blue-950 pt-4 border-t border-slate-200">
                            <span>TOTAL</span><span>${total.toFixed(2)}</span>
                        </div>
                        <button type="submit" disabled={isUploading || !comprobanteUrl}
                            className={`w-full py-5 mt-6 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all
                            ${comprobanteUrl ? 'bg-green-600 text-white hover:bg-green-700 shadow-xl shadow-green-200' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                            <Smartphone size={20} /> Finalizar Pedido
                        </button>
                    </div>
                </div>

                {/* SECCIÓN DE SUGERENCIAS RÁPIDAS (Restaurada y Mejorada) */}
                {sugerencias.length > 0 && (
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
                        <h3 className="text-[10px] font-black text-blue-900 mb-5 uppercase tracking-[0.2em] border-l-4 border-blue-900 pl-3">Sugerencias para ti</h3>
                        <div className="space-y-4">
                            {sugerencias.map((prod) => (
                                <div key={prod.id} className="flex items-center gap-3 group">
                                    <div className="w-12 h-12 bg-slate-50 rounded-lg relative overflow-hidden border border-slate-100 flex-shrink-0">
                                        <Image src={prod.image} alt={prod.name} fill className="object-contain p-1" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[11px] font-bold text-slate-700 truncate">{prod.name}</p>
                                        <p className="text-[10px] text-blue-600 font-black">${cleanPrice(prod.price).toFixed(2)}</p>
                                    </div>
                                    <button type="button" onClick={() => addToCart(prod)} className="bg-slate-100 text-blue-950 p-2 rounded-full hover:bg-blue-950 hover:text-white transition-colors">
                                        <Plus size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
          </div>
        </form>
      </main>
    </div>
  );
}