'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Oswald, Raleway } from 'next/font/google';
import { 
  ChevronLeft, 
  Send, 
  CheckCircle2, 
  User, 
  Mail, 
  MessageSquare, 
  AlertCircle,
  Clock,
  ShieldCheck,
  Camera,
  X
} from 'lucide-react';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-oswald',
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-raleway',
});

export default function TicketPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState('');
  
  // Estados para la imagen
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    setTicketId(`JLC-${Math.floor(100000 + Math.random() * 900000)}`);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeFoto = () => {
    setFoto(null);
    setPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      // 1. Cambiamos el fondo de la pantalla de éxito a gris muy claro
      <main className={`min-h-screen bg-slate-50 flex items-center justify-center p-6 ${raleway.className}`}>
        {/* El resto se mantiene igual porque ya era bg-white */}
        <div className="max-w-md w-full bg-white rounded-[3rem] p-10 text-center shadow-xl animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} />
          </div>
          <h2 className={`${oswald.className} text-4xl text-blue-950 uppercase italic mb-4`}>Solicitud Exitosa</h2>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-8">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Tu número de ticket</p>
            <p className="text-2xl font-mono font-black text-blue-600">{ticketId}</p>
          </div>
          <p className="text-gray-500 mb-10 leading-relaxed">
            Hemos recibido tu reporte. Un técnico se pondrá en contacto contigo vía email en un plazo máximo de 24 horas.
          </p>
          <Link href="/" className="group flex items-center justify-center gap-3 w-full py-5 bg-blue-950 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-blue-900 transition-all shadow-lg active:scale-95">
            Volver al Inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen pt-32 pb-20 bg-slate-50 px-6 ${raleway.className}`}>
      <div className="max-w-4xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="relative left-12">
            <Link href="/support" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 mb-6 transition-colors group">
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">Regresar a Soporte</span>
            </Link>
            <h1 className={`${oswald.className} text-5xl md:text-7xl text-slate-900 uppercase italic leading-none`}>
              <span className="text-blue-500">Asistencia</span>
            </h1>
          </div>
          <div className="hidden md:block text-right text-right relative right-16">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Estado del Sistema</p>
            <div className="flex items-center justify-end gap-2 text-green-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest">Técnicos Disponibles</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">
                    <User size={14} /> Nombre Completo
                  </label>
                  <input required type="text" placeholder="Tu nombre..." 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 focus:bg-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-400" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">
                    <Mail size={14} /> Correo de Contacto
                  </label>
                  <input required type="email" placeholder="email@ejemplo.com" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 focus:bg-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-400" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">
                    <Mail size={14} /> Número celular
                  </label>
                  <input required type="tel" placeholder="099999999" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 focus:bg-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-400" />
                </div>
              </div>

              <div className="space-y-3 max-w-md mx-auto w-full">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">
                  <AlertCircle size={14} /> ¿Qué equipo presenta la falla?
                </label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 focus:border-blue-500 outline-none appearance-none cursor-pointer">
                  <option>Celular</option>
                  <option>PC Escritorio / Gamer</option>
                  <option>Laptop</option>
                  <option>Otro</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">
                  <MessageSquare size={14} /> Descripción detallada
                </label>
                <textarea required rows={4} placeholder="Describe el problema técnico..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 focus:bg-white focus:border-blue-500 outline-none transition-all resize-none placeholder:text-slate-400" />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">
                  <Camera size={14} /> Evidencia Visual (Opcional)
                </label>
                <div className="relative group">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="foto-upload" />
                  {preview ? (
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={removeFoto} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="foto-upload" className="flex flex-col items-center justify-center w-full py-10 border-2 border-dashed border-slate-200 rounded-[2rem] cursor-pointer hover:bg-slate-50 hover:border-blue-500 transition-all group">
                      <Camera size={32} className="text-slate-300 group-hover:text-blue-500 transition-colors mb-3" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Adjuntar foto del problema</p>
                    </label>
                  )}
                </div>
              </div>

              <button disabled={loading} type="submit" className={`w-full group flex items-center justify-center gap-4 p-6 ${loading ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-[2rem] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-200`}>
                {loading ? 'Procesando...' : <>Generar Ticket de Soporte <Send size={20} /></>}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2rem] p-8 text-white shadow-xl">
              <ShieldCheck className="mb-4" size={32} />
              <h4 className="font-bold text-xl mb-2 leading-tight">Garantía de Servicio JLC</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Reparaciones con certificación técnica y garantía de 90 días.
              </p>
            </div>

            {/* 8. CAMBIO: Fondo lateral a blanco */}
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
              <h4 className="text-slate-900 font-bold mb-6 flex items-center gap-2 italic">
                <Clock size={18} className="text-blue-600" /> Tiempos Estimados
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between">
                  <span className="text-slate-500">Respuesta inicial</span>
                  <span className="text-slate-900 font-medium">&lt; 2 hrs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}