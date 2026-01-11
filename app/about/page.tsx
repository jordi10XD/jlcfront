'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Target, Eye, ShieldCheck, ChevronRight } from 'lucide-react';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function AboutPage() {
  return (
    // 1. CAMBIO PRINCIPAL: Usamos 'bg-theme' y 'text-theme' de tu global.css
    // Quitamos 'bg-white' y 'text-slate-900'
    <main className="min-h-screen bg-theme text-theme selection:bg-blue-500/30 overflow-hidden relative transition-colors duration-300">
      
      {/* FONDO TECH GRID (Ajustado para usar bordes sutiles según el tema) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(to right, var(--tarjeta-borde) 1px, transparent 1px), linear-gradient(to bottom, var(--tarjeta-borde) 1px, transparent 1px)',
             backgroundSize: '4rem 4rem',
             maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)'
           }} 
      />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-32 pb-32">

        {/* ================= HERO SECTION ================= */}
        <section className="grid lg:grid-cols-2 gap-16 items-center mb-40">
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Badge: Usamos card-theme para que se adapte al fondo */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full card-theme backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-medium tracking-widest uppercase text-blue-500">
                JCL Tech Solutions
              </span>
            </motion.div>

            {/* Título: Hereda el color de 'text-theme' */}
            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Arquitectos de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 animate-gradient-x">
                futuros digitales.
              </span>
            </motion.h1>

            {/* Párrafo: Usamos opacidad para simular el gris, pero manteniendo el color base del tema */}
            <motion.p variants={fadeInUp} className="text-lg opacity-80 max-w-lg leading-relaxed border-l-2 border-blue-500/20 pl-6">
              Transformamos la complejidad tecnológica en soluciones simples. 
              En JCL, el soporte técnico es arte y la calidad es nuestra firma.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="pt-4">
               <button className="group relative px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20">
                 Conoce más
                 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </button>
            </motion.div>
          </motion.div>

          {/* Composición Visual Derecha */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] w-full hidden lg:block"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-blue-200/30 to-cyan-200/30 rounded-full blur-[60px] animate-pulse" />
            
            {/* Foto 1: Usamos card-theme en lugar de bg-white */}
            <div className="absolute top-10 right-10 w-72 h-96 card-theme rounded-2xl shadow-2xl rotate-6 hover:rotate-0 transition-all duration-500 z-10 p-2 group">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-200">
                <Image
                  src="/nosotros1.png"
                  alt="Hardware Precision"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
            
            {/* Foto 2 */}
            <div className="absolute bottom-10 left-10 w-72 h-96 card-theme rounded-2xl shadow-2xl -rotate-6 hover:rotate-0 transition-all duration-500 z-20 p-2 group">
               <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-200">
                <Image
                  src="/nosotros2.png"
                  alt="Tech Innovation"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* ================= SECCIÓN DE TARJETAS ================= */}
        <section className="mb-40">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card 
              icon={<Target className="w-8 h-8 text-blue-600" />}
              title="Misión" 
              number="01"
              desc="Transformar la frustración técnica en estabilidad operativa. Aportamos valor real y duradero, eliminando las barreras entre el usuario y su tecnología."
              gradient="from-blue-500/5 to-transparent"
            />
            
            <Card 
              icon={<Eye className="w-8 h-8 text-cyan-600" />}
              title="Visión" 
              number="02"
              desc="Ser el referente absoluto en soluciones tecnológicas. Queremos que el nombre JCL sea sinónimo de excelencia técnica, innovación y confianza ciega."
              gradient="from-cyan-500/5 to-transparent"
              delay
            />
            
            {/* TARJETA VALORES: Usamos card-theme */}
            <div className="group relative p-8 rounded-3xl card-theme transition-all duration-300 backdrop-blur-sm">
               <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-theme rounded-xl border border-[var(--tarjeta-borde)] shadow-sm">
                      <ShieldCheck className="w-8 h-8 text-indigo-600" />
                    </div>
                    <span className="text-4xl font-bold opacity-30 select-none">03</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Valores</h3>
                  <ul className="space-y-4">
                    {['Compromiso Total', 'Transparencia Radical', 'Innovación Constante'].map((val, i) => (
                      <li key={i} className="flex items-center gap-3 opacity-80">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        {val}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>

          </motion.div>
        </section>

        {/* ================= CEO SECTION ================= */}
        <section className="relative">
          {/* Contenedor CEO: Usamos card-theme */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center card-theme p-8 lg:p-12 rounded-[3rem]">
            
            <div className="lg:col-span-4 relative group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-xl border border-[var(--tarjeta-borde)]">
                <Image
                  src="/CEO.jpeg"
                  alt="Luis Miguel Touriz"
                  fill
                  className="object-cover"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                 <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold text-lg">Luis Miguel Touriz</p>
                    <p className="text-blue-300 text-sm font-medium tracking-wider uppercase">Fundador & CEO</p>
                 </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold">
                Liderazgo con <span className="text-blue-600">propósito humano.</span>
              </h2>
              
              <div className="relative">
                <span className="absolute -top-6 -left-4 text-6xl text-blue-500/10 font-serif">"</span>
                <p className="text-xl lg:text-2xl opacity-80 font-light leading-relaxed italic relative z-10">
                  Lidero JCL con una misión clara: acercar la tecnología a las personas mediante
                  soluciones que no solo reparen dispositivos, sino que devuelvan la <span className="font-bold">productividad</span> y la <span className="font-bold">tranquilidad</span>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[var(--tarjeta-borde)]">
                <div>
                   <h4 className="font-semibold mb-2">Visión Estratégica</h4>
                   <p className="text-sm opacity-70">Enfoque en resultados reales y eficiencia operativa a largo plazo.</p>
                </div>
                <div>
                   <h4 className="font-semibold mb-2">Calidad Garantizada</h4>
                   <p className="text-sm opacity-70">Cada decisión se basa en principios de innovación y compromiso.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}

// Componente Card actualizado para usar CSS GLOBAL
function Card({ icon, title, number, desc, gradient, delay }: any) {
  return (
    // Reemplazamos 'bg-slate-50' por 'card-theme'
    <div className={`group relative p-8 rounded-3xl card-theme transition-all duration-300 backdrop-blur-sm ${delay ? 'md:translate-y-8' : ''}`}>
      <div className={`absolute inset-0 bg-gradient-to-b ${gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-theme rounded-xl border border-[var(--tarjeta-borde)] group-hover:scale-110 transition-transform duration-300 shadow-sm">
            {icon}
          </div>
          <span className="text-4xl font-bold opacity-30 select-none">{number}</span>
        </div>
        
        {/* Quitamos colores fijos (text-slate-900) para que hereden 'text-theme' */}
        <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="opacity-70 leading-relaxed font-light flex-grow">
          {desc}
        </p>
      </div>
    </div>
  );
}