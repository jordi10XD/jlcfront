'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProducts } from '../components/productcontext';
import { Trash2, Plus, Package, ArrowLeft, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import api from '../../lib/api';

export default function AdminPage() {
  const router = useRouter();
  // 1. IMPORTAMOS LAS NUEVAS FUNCIONES DEL CONTEXTO
  const { products, addProduct, deleteProduct, uploadImage, isUploading } = useProducts();

  // Protección de ruta (Solo entra si es admin)
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') router.push('/');
  }, [router]);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Audio',
    image: '' // Empezamos vacío para obligar a subir foto
  });

  // 2. NUEVA FUNCIÓN PARA MANEJAR LA SUBIDA
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Usamos la función que creamos en el Context
      const url = await uploadImage(file);
      if (url) {
        setFormData({ ...formData, image: url });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validación simple
    if (!formData.name || !formData.price || !formData.image) {
      alert("Por favor completa todos los campos e imagen");
      return;
    }

    addProduct({
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      image: formData.image // Aquí ya va la URL de Cloudinary
    });

    setFormData({ ...formData, name: '', price: '', image: '' }); // Limpiar
    alert('¡Producto agregado!');
  };

  return (
    <div className="min-h-screen bg-theme text-theme transition-colors duration-300 pt-32 px-6 pb-20">

      <div className="max-w-7xl mx-auto">
        {/* Header Admin */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 border-b borde-theme pb-6 gap-4">
          <div>
            <h1 className="text-4xl font-black italic">PANEL DE CONTROL</h1>
            <p className="opacity-60 text-sm mt-1">Gestiona tu inventario en tiempo real</p>
          </div>
          <Link href="/producto" className="theme-btn px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg w-fit">
            <ArrowLeft size={16} /> Ver Tienda
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* --- COLUMNA 1: FORMULARIO DE AGREGAR --- */}
          <div className="lg:col-span-1">
            <div className="card-theme p-8 rounded-[2rem] sticky top-24 shadow-xl border borde-theme">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-500">
                <Plus size={24} /> Nuevo Producto
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2 block">Nombre del Producto</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-4 rounded-xl bg-theme border borde-theme focus:outline-none focus:border-blue-500 transition-colors placeholder-opacity-30"
                    placeholder="Ej. Audífonos Gamer RGB"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2 block">Precio ($)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full p-4 rounded-xl bg-theme border borde-theme focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2 block">Categoría</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-4 rounded-xl bg-theme border borde-theme focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                    >
                      <option>Audio</option>
                      <option>Cargadores</option>
                      <option>Accesorios</option>
                      <option>Tecnología</option>
                    </select>
                  </div>
                </div>

                {/* 3. NUEVO CAMPO DE IMAGEN (FILE INPUT) */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2 block">Imagen del Producto</label>

                  <div className="border-2 border-dashed borde-theme rounded-xl p-4 flex flex-col items-center justify-center gap-3 bg-theme/50 hover:bg-theme transition-colors relative">

                    {isUploading ? (
                      <div className="flex flex-col items-center py-4 text-blue-500">
                        <Loader2 className="animate-spin mb-2" size={24} />
                        <span className="text-xs font-bold">Subiendo a la nube...</span>
                      </div>
                    ) : (
                      <>
                        {/* Input real oculto pero funcional */}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />

                        {formData.image ? (
                          <div className="relative w-full aspect-square rounded-lg overflow-hidden border borde-theme">
                            {/* Usamos img normal para evitar problemas de config con dominios externos por ahora */}
                            <img
                              src={formData.image}
                              alt="Vista previa"
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-1">
                              Clic para cambiar
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center py-6 text-gray-400">
                            <ImageIcon size={32} className="mb-2 opacity-50" />
                            <span className="text-xs font-bold uppercase">Subir Imagen</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* 4. BOTÓN DESHABILITADO SI ESTÁ CARGANDO */}
                <button
                  type="submit"
                  disabled={isUploading}
                  className={`btn-invertido w-full py-4 rounded-xl font-bold uppercase tracking-widest mt-4 shadow-lg flex justify-center gap-2 transition-all ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
                >
                  <Upload size={18} /> {isUploading ? 'Procesando...' : 'Publicar Item'}
                </button>
              </form>
            </div>
          </div>

          {/* --- COLUMNA 2: LISTA DE TICKETS Y PEDIDOS --- */}
          <div className="lg:col-span-2 space-y-8">

            {/* SECCIÓN DE SOLICITUDES / PEDIDOS RECIENTES */}
            <div className="card-theme p-8 rounded-[2rem] border borde-theme shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  Bandeja de Entrada
                </h2>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">Tiempo Real</span>
              </div>

              <TicketListDisplay />
            </div>

            {/* SECCIÓN DE INVENTARIO (YA EXISTENTE) */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Package size={24} className="text-blue-500" /> Inventario ({products.length})
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {products.map(product => (
                  <div key={product.id} className="card-theme p-4 rounded-2xl flex items-center gap-4 group hover:shadow-xl transition-all border borde-theme relative overflow-hidden">
                    <div className="h-20 w-20 bg-theme rounded-xl flex items-center justify-center p-2 border borde-theme overflow-hidden shrink-0">
                      {/* Nota: Si usas next/image con Cloudinary, recuerda configurar next.config.js, si no, usa img normal */}
                      <img src={product.image} alt={product.name} className="object-contain w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold leading-tight text-sm mb-1 truncate">{product.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider opacity-60 bg-theme px-2 py-0.5 rounded-md border borde-theme">{product.category}</span>
                      </div>
                      <p className="text-blue-600 font-black mt-2">{product.displayPrice}</p>
                    </div>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                      title="Eliminar producto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// COMPONENTE INTERNO PARA LISTAR TICKETS (Para mantener limpio el componente principal)
function TicketListDisplay() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await api.get('/tickets');
      setTickets(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center opacity-50">Cargando solicitudes...</div>;
  if (tickets.length === 0) return <div className="p-10 text-center bg-theme rounded-2xl border borde-theme opacity-60">No hay nuevas solicitudes.</div>;

  return (
    <div className="space-y-4">
      {tickets.map((t) => (
        <div key={t.id} className="bg-theme border borde-theme p-5 rounded-2xl hover:shadow-md transition-all cursor-pointer" onClick={() => setExpanded(expanded === t.id ? null : t.id)}>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${t.status === 'pending' ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${t.type === 'order' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                {t.type === 'order' ? 'Nuevo Pedido' : 'Soporte Técnico'}
              </span>
              <a href={`https://api.jlctecnology.com/api/tickets/${t.id}/pdf`} target="_blank" onClick={(e) => e.stopPropagation()} className="p-1 hover:bg-white/20 rounded text-xs ml-2" title="Descargar PDF">
                📄
              </a>
            </div>
            <span className="text-[10px] font-bold opacity-40">{new Date(t.created_at).toLocaleDateString()}</span>
          </div>

          <h3 className="font-bold text-lg mb-1">{t.nombre}</h3>
          <p className="text-sm opacity-60 mb-3 flex items-center gap-2"><div className="w-1 h-1 bg-current rounded-full" /> {t.email}</p>

          {expanded === t.id && (
            <div className="mt-4 pt-4 border-t borde-theme text-sm space-y-4 animate-in slide-in-from-top-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase opacity-50">Teléfono</p>
                  <p>{t.telefono}</p>
                </div>
                {t.cedula && (
                  <div>
                    <p className="text-[10px] font-bold uppercase opacity-50">Cédula</p>
                    <p>{t.cedula}</p>
                  </div>
                )}
              </div>

              {t.direccion && (
                <div>
                  <p className="text-[10px] font-bold uppercase opacity-50">Dirección</p>
                  <p>{t.direccion}</p>
                </div>
              )}

              {t.mensaje && (
                <div className="bg-theme/50 p-3 rounded-xl">
                  <p className="text-[10px] font-bold uppercase opacity-50 mb-1">Mensaje / Info</p>
                  <p className="italic opacity-80">"{t.mensaje}"</p>
                </div>
              )}

              {t.type === 'order' && t.items && (
                <div>
                  <p className="text-[10px] font-bold uppercase opacity-50 mb-2">Resumen del Pedido</p>
                  <div className="space-y-1">
                    {Array.isArray(t.items) && t.items.map((i: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-xs border-b borde-theme pb-1">
                        <span>{i.name} (x{i.quantity})</span>
                        <span className="font-bold">${i.price}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-black text-blue-600 pt-2 text-sm">
                      <span>TOTAL</span>
                      <span>${t.total}</span>
                    </div>
                  </div>
                </div>
              )}

              {t.attachment_url && (
                <div>
                  <p className="text-[10px] font-bold uppercase opacity-50 mb-2">Comprobante / Evidencia</p>
                  <a href={t.attachment_url} target="_blank" rel="noreferrer" className="block relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden group">
                    <img src={t.attachment_url} alt="Attachment" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold uppercase">
                      Ver Imagen
                    </div>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

