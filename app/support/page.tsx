import Image from "next/image";
import Link from 'next/link';

export default function SupportPage() {
  return (
    <main className="min-h-screen pt-24 px-4 sm:px-6 pb-32 bg-[var(--background)] text-[var(--text)] transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* ================= HERO EVOLUCIONADO ================= */}
        <section className="relative pt-20 pb-24 flex flex-col items-center text-center">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-fade-in">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-400">
                Sistemas en Línea • Soporte 24/7
              </span>
            </div>

            <h1 className="text-[clamp(3.5rem,10vw,7rem)] font-black leading-[0.85] tracking-tighter mb-8">
              Expertos en <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-400 to-blue-700">
                dar soluciones.
              </span>
            </h1>
            
            <p className="max-w-xl mx-auto text-lg md:text-xl opacity-50 font-light leading-relaxed">
              Infraestructura técnica para potenciar tu productividad. <br className="hidden md:block" />
              Diagnóstico de alta precisión y hardware de alto rendimiento.
            </p>
          </div>
        </section>

        {/* ================= BLOQUES EDITORIALES ================= */}
        <section className="mb-32 space-y-24">
          
          {/* BLOQUE 1: DIAGNÓSTICO PRECISO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-start">
              <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden rounded-[2.5rem] shadow-2xl">
                <Image src="/diagnostico.png" alt="Diagnóstico" fill className="object-cover" />
              </div>
            </div>
            <div className="max-w-lg">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Diagnóstico preciso.<br />
                <span className="text-blue-500">Soluciones que perduran.</span>
              </h2>
              <p className="text-lg leading-relaxed opacity-70">
                Cada proceso de soporte inicia con un análisis técnico profundo. Identificamos fallas reales tanto en hardware como en software, evitando soluciones temporales.
              </p>
            </div>
          </div>

          {/* BLOQUE 2: RENDIMIENTO OPTIMIZADO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="max-w-lg md:order-1">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Rendimiento,<br />
                <span className="text-blue-500">sin sacrificar estabilidad.</span>
              </h2>
              <p className="text-lg leading-relaxed opacity-70">
                Ajustamos el sistema para mejorar su fluidez y eficiencia, eliminando procesos innecesarios y configuraciones que afectan el rendimiento general de tus equipos.
              </p>
            </div>
            <div className="flex justify-end md:order-2">
              <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden rounded-[2.5rem] shadow-2xl">
                <Image src="/rendimiento.png" alt="Optimización" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* BLOQUE 3: INGENIERÍA DE HARDWARE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-start">
              <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden rounded-[2.5rem] shadow-2xl">
                <Image src="/hardware.png" alt="Reparación de Hardware" fill className="object-cover" />
              </div>
            </div>
            <div className="max-w-lg">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-tight">
                Ingeniería de hardware y <br />
                <span className="text-blue-500">componentes de alta gama.</span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed opacity-70 font-light">
                <p>
                  Especialistas en la restauración técnica de <strong className="text-[var(--text)]">pantallas, baterías y micro-componentes</strong>. Utilizamos tecnología de punta para asegurar resultados certificados.
                </p>
                <p>
                  Nuestra curaduría de accesorios potencia la vida útil de tus dispositivos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECCIÓN DE CONFIANZA TÉCNICA ================= */}
        <section className="mb-1 py-10 border-y border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Soporte sin fricciones.</h2>
            <p className="opacity-50">Transparencia absoluta en cada etapa del proceso.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[2rem] bg-gradient-to-b from-white/5 to-transparent border border-white/10">
              <div className="text-blue-500 font-black text-4xl mb-6">01</div>
              <h4 className="text-xl font-bold mb-4">Claridad Total</h4>
              <p className="opacity-50 text-sm leading-relaxed">Explicamos el origen técnico de la falla en lenguaje sencillo, sin tecnicismos innecesarios.</p>
            </div>
            
            <div className="p-8 rounded-[2rem] bg-gradient-to-b from-white/5 to-transparent border border-white/10">
              <div className="text-blue-500 font-black text-4xl mb-6">02</div>
              <h4 className="text-xl font-bold mb-4">Ejecución Ágil</h4>
              <p className="opacity-50 text-sm leading-relaxed">Procesos optimizados para que tu equipo esté de vuelta en tiempo récord.</p>
            </div>

            <div className="p-8 rounded-[2rem] bg-gradient-to-b from-white/5 to-transparent border border-white/10">
              <div className="text-blue-500 font-black text-4xl mb-6">03</div>
              <h4 className="text-xl font-bold mb-4">Detalle Extremo</h4>
              <p className="opacity-50 text-sm leading-relaxed">Cada tornillo y configuración cuenta. No dejamos cabos sueltos en el ensamblaje.</p>
            </div>
          </div>
        </section>

        {/* ================= CTA FINAL (ACTUALIZADO CON REDIRECCIÓN) ================= */}
        <section className="relative py-1 px-4">
          <div className="max-w-5xl mx-auto relative overflow-hidden rounded-[3rem] bg-blue-950 p-8 sm:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.2),transparent_50%)] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-left text-white">
                <h3 className="text-4xl sm:text-6xl font-black leading-none tracking-tighter mb-8">
                  Atención <br /> <span className="text-blue-400 italic">personal.</span>
                </h3>
                <p className="text-lg text-white/50 font-light">
                  Habla directamente con un experto y obtén una cotización inicial hoy mismo.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {/* Ahora el botón es un componente Link que apunta a la ruta /ticket */}
                <Link 
                  href="/ticket"
                  className="group w-full flex items-center justify-between p-8 bg-white rounded-2xl hover:bg-blue-50 transition-all duration-300 hover:scale-[1.02] shadow-2xl text-blue-950 font-black uppercase tracking-widest text-sm no-underline"
                >
                  Solicitar Soporte Técnico
                  <div className="bg-blue-600 text-white p-2 rounded-xl group-hover:rotate-45 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}