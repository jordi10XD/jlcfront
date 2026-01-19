import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-12 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Sección 1: Info */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-bold text-white">JLC</h3>
          <p className="text-sm text-gray-400">
            Hacemos envíos rápidos y seguros. La mejor calidad directo a tu puerta en 24 horas.
          </p>
          <div className="space-y-1">
            <p>Naranjito, Av. 5 de octubre y Pichincha</p>
            <p>+593 953887981</p>
          </div>
        </div>

        {/* Sección 2: Navegación */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold text-white">Navegación</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/producto" className="hover:text-purple-400 transition-colors">
                Ir a Productos
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-purple-400 transition-colors">
                Nosotros
              </Link>
            </li>
            <li>
              <Link href="/ticket" className="hover:text-purple-400 transition-colors">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        {/* Sección 3: Mapa */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold text-white">Ubicación</h3>
          <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
            <iframe
              title="Mapa de Ubicación"
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d249.18493546489677!2d-79.46422881684067!3d-2.169306364099731!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sec!4v1768172121744!5m2!1ses-419!2sec"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>

      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-800 pt-6">
        &copy; {new Date().getFullYear()} JLC TECHNOLOGY. Todos los derechos reservados.
      </div>
    </footer>
  );
}
