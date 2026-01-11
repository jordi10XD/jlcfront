'use client';
import CartList from '../components/CartList';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter,usePathname } from 'next/navigation';
import { Oswald, Raleway } from 'next/font/google';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../components/carcontext'; 
import { useProducts } from '../components/productcontext'; 
import { ShoppingCart, Menu, X, Lock, LogOut, LayoutDashboard, Search, Sun, Moon, User, Mail } from 'lucide-react'; 

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-raleway',
});

export default function Navbar() {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // --- ESTADOS DE LOGIN ---
  const [showAdminModal, setShowAdminModal] = useState(false); // Modal del Candado
  const [showUserModal, setShowUserModal] = useState(false);   // Modal del Dropdown (Clientes)
  
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Credenciales Admin
  const [adminCredentials, setAdminCredentials] = useState({ user: '', pass: '' });
  const [loginError, setLoginError] = useState('');

  // Credenciales Usuario (Simulado)
  const [userCredentials, setUserCredentials] = useState({ email: '', pass: '' });

  const { cart, cartCount, removeFromCart } = useCart();
  const total = cart.reduce((sum: number, item: any) => sum + Number(item.price), 0);

  const { searchQuery, setSearchQuery } = useProducts();

  const [theme, setTheme] = useState('light');

  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    const adminSession = localStorage.getItem('isAdmin');
    if (adminSession === 'true') setIsAdmin(true);

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    if (document.documentElement.classList.contains('dark')) setTheme('dark');

    

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- LÓGICA ADMIN ---
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCredentials.user === 'admin' && adminCredentials.pass === '1234') {
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      setShowAdminModal(false);
      setLoginError('');
      router.push('/admin');
    } else {
      setLoginError('Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    router.push('/');
  };

  // --- LÓGICA USUARIO (Simulada por ahora) ---
  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí conectarías con tu backend real
    alert(`Intentando iniciar sesión con: ${userCredentials.email}`);
    setShowUserModal(false);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark'); 
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark'); 
    }
  };
  if (pathname === '/registro' || pathname === '/pago') return null;
  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[9999] transition-all duration-300 border-b border-white/10 
        ${isScrolled ? 'h-20 bg-blue-950/90 backdrop-blur-md shadow-xl' : 'h-24 bg-blue-950'} 
        ${raleway.className}`}
      >
        <div className="h-full px-6 lg:px-10 flex items-center justify-between gap-6 max-w-7xl mx-auto">

          {/* IZQUIERDA */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-3 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            <Link href="/" className="flex-shrink-0 transition hover:scale-105">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={180} 
                height={90} 
                className="object-contain transition-transform duration-300 hover:scale-105"
              />
            </Link>

            <ul className={`hidden lg:flex gap-8 items-center ${oswald.className}`}>
              {['SUPPORT', 'ABOUT', 'PRODUCTO'].map((item) => (
                <Link 
                  key={item}
                  href={`/${item.toLowerCase()}`} 
                  className="text-white font-bold text-[15px] hover:text-blue-400 transition-colors tracking-widest"
                >
                  {item === 'PRODUCTO' ? 'PRODUCTOS' : item.replace('SUPPORT', 'SOPORTE').replace('ABOUT', 'NOSOTROS')}
                </Link>
              ))}
            </ul>
          </div>

          {/* BUSCADOR */}
          <div className="flex-1 max-w-lg mx-6 hidden md:block">
            <div className="relative group">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-[17px] rounded-full py-3 pl-5 pr-12 text-white placeholder-white/50 focus:outline-none focus:bg-white focus:text-black focus:placeholder-gray-400 transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-blue-600">
                <Search size={20} />
              </div>
            </div>
          </div>

          {/* DERECHA */}
          <div className="flex items-center gap-4">

            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => router.push('/admin')} 
                  className="hidden sm:flex items-center gap-2 text-[11px] font-bold uppercase bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-500"
                >
                  <LayoutDashboard size={16} /> Panel
                </button>
                <button onClick={handleLogout} className="p-3 text-white/40 hover:text-red-400 rounded-full transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              // ESTE ES EL BOTÓN DEL CANDADO (SOLO ADMIN)
              <button 
                onClick={() => setShowAdminModal(true)} 
                className="p-3 text-white/30 hover:text-white transition-all"
              >
                <Lock size={20} />
              </button>
            )}

            {/* --- CUENTA --- */}
            <div className="relative group flex items-center h-full py-5 cursor-pointer">
              <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <User size={22} />
                <span className={`font-bold text-[17px] tracking-wide ${oswald.className}`}>
                  CUENTA
                </span>
              </div>

              <div className="absolute top-full right-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="w-56 card-theme rounded-xl shadow-2xl py-2 border borde-theme text-theme overflow-hidden">
                  
                  {/* BOTÓN INICIAR SESIÓN (Abre Modal de USUARIO) */}
                  <button 
                    onClick={() => setShowUserModal(true)}
                    className="w-full text-left px-5 py-3 hover:bg-gray-100 dark:hover:bg-black/5 transition-colors font-medium text-[15px]"
                  >
                    Iniciar Sesión
                  </button>

                  <Link 
                    href="/registro"
                    className="block w-full text-left px-5 py-3 hover:bg-gray-100 dark:hover:bg-black/5 transition-colors font-medium text-[15px]"
                  >
                    Registrarse
                  </Link>

                  <div onClick={toggleTheme} className="px-5 py-3 hover:bg-gray-100 dark:hover:bg-black/5 cursor-pointer flex items-center justify-between border-t borde-theme mt-1">
                    <span className="text-[15px] font-medium">Tema</span>
                    {theme === 'dark' ? <Moon size={16} /> : <Sun size={16}/>}
                  </div>

                </div>
              </div>
            </div>

            {/* CARRITO */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
            >
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[11px] font-bold h-6 w-6 flex items-center justify-center rounded-full border-2 border-blue-950 animate-bounce">
                  {cartCount}
                </span>
              )}
              <ShoppingCart size={22} className="text-white" />
            </button>

          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden absolute top-16 left-0 w-full bg-blue-950 border-b border-white/10 transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 flex flex-col gap-2">
            <Link href="/support" className="text-white p-3 hover:bg-white/5 rounded-lg">
              Soporte
            </Link>
            <Link href="/about" className="text-white p-3 hover:bg-white/5 rounded-lg">
              Nosotros
            </Link>
            <Link href="/producto" className="text-white p-3 hover:bg-white/5 rounded-lg font-bold">
              PRODUCTOS
            </Link>
          </div>
        </div>
      </nav>
      
      {/* ================= MODAL ADMIN (CANDADO) ================= */}
      {showAdminModal &&
        createPortal(
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-blue-950/80 backdrop-blur-sm"
              onClick={() => setShowAdminModal(false)}
            />
            <div className="relative w-full max-w-sm bg-blue-950 border border-white/10 p-8 rounded-[2rem] shadow-2xl z-10 animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setShowAdminModal(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <X size={20} />
              </button>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500 border border-red-500/20">
                  <Lock size={32} />
                </div>
                <h2 className={`text-2xl font-bold italic text-white ${oswald.className}`}>
                  ACCESO ADMIN
                </h2>
              </div>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <input
                  type="text"
                  placeholder="Usuario Admin"
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-blue-500 focus:outline-none"
                  value={adminCredentials.user}
                  onChange={(e) => setAdminCredentials({ ...adminCredentials, user: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Clave Admin"
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-blue-500 focus:outline-none"
                  value={adminCredentials.pass}
                  onChange={(e) => setAdminCredentials({ ...adminCredentials, pass: e.target.value })}
                />
                {loginError && <p className="text-red-400 text-xs text-center">{loginError}</p>}
                <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-xl font-bold uppercase shadow-lg">
                  Entrar al Panel
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}

      {/* ================= MODAL USUARIO (NUEVO) ================= */}
      {showUserModal &&
        createPortal(
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowUserModal(false)}
            />
            <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 border border-white/10 p-8 rounded-[2rem] shadow-2xl z-10 animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setShowUserModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <X size={20} />
              </button>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                  <User size={32} />
                </div>
                <h2 className={`text-2xl font-black italic text-gray-900 dark:text-white ${oswald.className}`}>
                  HOLA DE NUEVO
                </h2>
                <p className="text-gray-500 text-sm mt-1">Ingresa a tu cuenta para continuar</p>
              </div>

              <form onSubmit={handleUserLogin} className="space-y-4">
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                    type="email"
                    placeholder="Tu Correo"
                    className="w-full p-4 pl-12 rounded-xl bg-gray-100 dark:bg-white/5 border-transparent focus:bg-white focus:border-blue-500 border-2 outline-none transition-all text-gray-900 dark:text-black"
                    value={userCredentials.email}
                    onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })}
                    />
                </div>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                    type="password"
                    placeholder="Tu Contraseña"
                    className="w-full p-4 pl-12 rounded-xl bg-gray-100 dark:bg-white/5 border-transparent focus:bg-white focus:border-blue-500 border-2 outline-none transition-all text-gray-900 dark:text-black"
                    value={userCredentials.pass}
                    onChange={(e) => setUserCredentials({ ...userCredentials, pass: e.target.value })}
                    />
                </div>
                
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold uppercase shadow-lg shadow-blue-500/30 transition-transform active:scale-95">
                  Iniciar Sesión
                </button>
              </form>

              <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">¿No tienes cuenta? <Link href="/registro" className="text-blue-600 font-bold hover:underline" onClick={() => setShowUserModal(false)}>Regístrate aquí</Link></p>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* ================= SIDEBAR CARRITO ================= */}
      {mounted &&
        createPortal(
          <div className={`fixed inset-0 z-[99999] ${isCartOpen ? 'visible' : 'invisible'}`}>
            <div
              className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
                isCartOpen ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => setIsCartOpen(false)}
            />

            <div
              className={`absolute top-0 right-0 h-[100dvh] w-full sm:w-[400px] card-theme border-l borde-theme shadow-2xl flex flex-col transition-transform duration-500 transform ${
                isCartOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="flex items-center justify-between p-6 border-b borde-theme">
                <h2 className={`text-xl font-bold text-theme ${oswald.className}`}>
                  MI CARRITO ({cartCount})
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full text-theme"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 max-h-[calc(100vh-200px)] overscroll-contain">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-50 py-20">
                    <ShoppingCart size={64} className="mb-4 text-theme" />
                    <p className="text-theme font-medium">Tu carro está vacío</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex gap-4 p-3 bg-theme rounded-xl border borde-theme relative items-center"
                      >
                        <div className="h-16 w-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border borde-theme">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="object-contain w-full h-full"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-theme text-sm font-medium line-clamp-1">
                            {item.name}
                          </h4>
                          <p className="text-blue-500 font-bold mt-1">
                            ${Number(item.price).toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-gray-400 hover:text-red-500 p-2"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="absolute bottom-0 w-full p-6 card-theme backdrop-blur-md border-t borde-theme">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-theme opacity-60">Total</span>
                    <span className="text-2xl font-bold text-theme">${total.toFixed(2)}</span>
                  </div>
                  <Link href="/pago" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:bg-blue-500 hover:scale-[1.02] transition-all"
>
                    PAGAR AHORA
                  </Link>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}

    </>
  );
}