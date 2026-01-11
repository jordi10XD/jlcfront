'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Lock, CheckCircle, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword
      });

      localStorage.setItem('token', response.data.access_token);
      // Opcional: Mostrar mensaje de éxito o redirigir
      router.push('/');
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) { // Estructura típica de Laravel
        setError(Object.values(err.response.data.errors).flat().join(', '));
      } else {
        setError('Error al registrarse. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">

      {/* SECCIÓN IZQUIERDA (VISUAL) - Oculta en móviles */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-blue-950 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }} />

        {/* Círculos decorativos de fondo */}
        <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />

        <div className="relative z-10 p-12 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-6">
              <Sparkles size={16} className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest">Únete a la comunidad</span>
            </div>
            <h1 className="text-6xl font-black italic mb-6 leading-tight">
              LLEVA TU SETUP <br /> AL <span className="text-blue-500">SIGUIENTE NIVEL</span>
            </h1>
            <p className="text-lg opacity-70 max-w-md mx-auto leading-relaxed">
              Crea tu cuenta para acceder a ofertas exclusivas, seguimiento de pedidos en tiempo real y soporte prioritario.
            </p>
          </motion.div>

          {/* Imagen flotante decorativa */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="mt-12 relative h-64 w-full"
          >
            {/* Puedes poner una imagen de tus productos aquí */}
            <Image
              src="/audifonos_1.png" // Asegúrate que esta imagen exista o cámbiala
              alt="Product Showcase"
              fill
              className="object-contain drop-shadow-[0_20px_50px_rgba(59,130,246,0.5)]"
            />
          </motion.div>
        </div>
      </div>

      {/* SECCIÓN DERECHA (FORMULARIO) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">

        {/* Botón Volver */}
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">
          <ArrowLeft size={18} /> Volver al Inicio
        </Link>

        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-10"
          >
            <h2 className="text-4xl font-black italic mb-2">CREAR CUENTA</h2>
            <p className="text-gray-500">Ingresa tus datos para registrarte.</p>
          </motion.div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Nombre */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Nombre Completo</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  className="w-full bg-gray-100 dark:bg-white/5 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-black/20 rounded-xl py-4 pl-12 pr-4 outline-none transition-all font-medium"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Correo Electrónico</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type="email"
                  placeholder="Ej. juan@correo.com"
                  className="w-full bg-gray-100 dark:bg-white/5 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-black/20 rounded-xl py-4 pl-12 pr-4 outline-none transition-all font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Contraseña</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-gray-100 dark:bg-white/5 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-black/20 rounded-xl py-4 pl-12 pr-4 outline-none transition-all font-medium"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Confirmar Contraseña</label>
              <div className="relative group">
                <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-gray-100 dark:bg-white/5 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-black/20 rounded-xl py-4 pl-12 pr-4 outline-none transition-all font-medium"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl uppercase tracking-widest shadow-lg shadow-blue-500/30 transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                {loading ? 'Registrando...' : 'Registrarme Ahora'}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            ¿Ya tienes una cuenta? {' '}
            <button onClick={() => router.push('/')} className="text-blue-600 font-bold hover:underline">
              Inicia Sesión aquí
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}