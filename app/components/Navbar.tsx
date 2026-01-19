'use client';

import CartList from '../components/CartList';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Oswald, Raleway } from 'next/font/google';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../components/carcontext';
import { useProducts } from '../components/productcontext';
import {
  ShoppingCart,
  Menu,
  X,
  Lock,
  LogOut,
  LayoutDashboard,
  Search,
  Sun,
  Moon,
  User,
  Mail,
} from 'lucide-react';

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
  const pathname = usePathname();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [adminCredentials, setAdminCredentials] = useState({ user: '', pass: '' });
  const [loginError, setLoginError] = useState('');
  const [userCredentials, setUserCredentials] = useState({ email: '', pass: '' });

  const { cart, cartCount, removeFromCart } = useCart();
  const total = cart.reduce((sum: number, item: any) => sum + Number(item.price), 0);
  const { searchQuery, setSearchQuery } = useProducts();

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem('isAdmin') === 'true') setIsAdmin(true);
    if (localStorage.getItem('theme') === 'dark' || document.documentElement.classList.contains('dark')) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  if (pathname === '/registro' || pathname === '/pago') return null;

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[9999] transition-all duration-500 border-b border-white/10 ${
          isScrolled ? 'h-24 bg-blue-950/95 backdrop-blur-md shadow-2xl' : 'h-28 bg-blue-950'
        } ${raleway.className}`}
      >
        <div className="h-full px-6 lg:px-12 flex items-center justify-between max-w-[1800px] mx-auto">
          
          {/* --- BLOQUE IZQUIERDA: Logo (Grande) --- */}
          <div className="flex flex-1 justify-start">
            <Link href="/" className="flex-shrink-0 transition-transform hover:scale-110 active:scale-95">
              <Image src="/logo.png" alt="Logo" width={200} height={100} className="object-contain" priority />
            </Link>
          </div>

          {/* --- BLOQUE CENTRO: Menú Principal (Corregido y Permanente) --- */}
          <div className="flex-[4] hidden lg:flex justify-center items-center -translate-x-5">
            <ul className={`flex gap-14 items-center ${oswald.className}`}>
  <li>
    <Link href="/support" className={`font-bold text-[18px] tracking-[0.25em] transition-colors hover:text-blue-400 ${pathname === '/support' ? 'text-blue-400' : 'text-white/90'}`}>
      SOPORTE
    </Link>
  </li>
  <li>
    <Link href="/about" className={`font-bold text-[18px] tracking-[0.25em] transition-colors hover:text-blue-400 ${pathname === '/about' ? 'text-blue-400' : 'text-white/90'}`}>
      NOSOTROS
    </Link>
  </li>
  <li>
    <Link href="/producto" className={`font-bold text-[18px] tracking-[0.25em] transition-colors hover:text-blue-400 ${pathname === '/producto' ? 'text-blue-400' : 'text-white/90'}`}>
      PRODUCTOS
    </Link>
  </li>
</ul>

{pathname.includes('/producto') && (
  <div className="relative group w-full max-w-4xl animate-in fade-in zoom-in-95 duration-500 translate-x-12">
    <input
      type="text"
      placeholder="Buscar productos..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full bg-white/5 border-2 border-white/10 text-lg rounded-full py-4 px-8 text-white placeholder-white/20 focus:outline-none focus:bg-white focus:text-black focus:border-blue-500 transition-all"
    />
    <Search
      size={24}
      className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-600"
    />
  </div>
)}

          </div>

          {/* --- BLOQUE DERECHA: Acciones (Grandes) --- */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-3 hover:bg-white/10 rounded-xl"
            >
              {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>

            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button onClick={() => router.push('/admin')} className="hidden sm:flex items-center gap-2 bg-blue-600 px-5 py-2.5 rounded-xl font-black text-[12px] text-white uppercase tracking-wider">
                  <LayoutDashboard size={18} /> PANEL
                </button>
                <button onClick={handleLogout} className="text-white/30 hover:text-red-400 p-2"><LogOut size={24} /></button>
              </div>
            ) : (
              <button onClick={() => setShowAdminModal(true)} className="text-white/10 hover:text-white/40 p-2"><Lock size={20} /></button>
            )}

            {/* Menú Cuenta */}
            <div className="relative group flex items-center h-full">
              <button className="flex items-center gap-3 text-white/80 hover:text-white transition-colors p-3 rounded-2xl hover:bg-white/5">
                <User size={28} />
                <span className={`hidden xl:block font-bold text-[16px] tracking-widest ${oswald.className}`}>CUENTA</span>
              </button>
              <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                <div className="w-64 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl py-4 border border-black/5 dark:border-white/10 overflow-hidden">
                  <button onClick={() => setShowUserModal(true)} className="w-full text-left px-8 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors font-bold text-[15px] dark:text-white">LOGIN</button>
                  <Link href="/registro" className="block w-full text-left px-8 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors font-bold text-[15px] dark:text-white">REGISTRO</Link>
                  <div onClick={toggleTheme} className="px-8 py-4 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer flex items-center justify-between border-t dark:border-white/5 mt-2">
                    <span className="text-[12px] font-black text-slate-400 tracking-widest uppercase">TEMA</span>
                    {theme === 'dark' ? <Moon size={18} className="text-blue-400" /> : <Sun size={18} className="text-amber-500" />}
                  </div>
                </div>
              </div>
            </div>

            {/* Carrito */}
            <button onClick={() => setIsCartOpen(true)} className="relative p-4 bg-blue-600 hover:bg-blue-500 rounded-2xl transition-all shadow-xl shadow-blue-900/40 active:scale-90">
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-blue-600 text-[12px] font-black h-7 w-7 flex items-center justify-center rounded-full border-2 border-blue-600">
                  {cartCount}
                </span>
              )}
              <ShoppingCart size={28} className="text-white" />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-blue-950 border-t border-white/10 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="p-8 flex flex-col gap-6">
            <Link href="/support" onClick={() => setIsMobileMenuOpen(false)} className="text-white font-bold tracking-[0.3em] text-xl py-4 border-b border-white/5">SOPORTE</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-white font-bold tracking-[0.3em] text-xl py-4 border-b border-white/5">NOSOTROS</Link>
            <Link href="/producto" onClick={() => setIsMobileMenuOpen(false)} className="text-white font-bold tracking-[0.3em] text-xl py-4 border-b border-white/5">PRODUCTOS</Link>
          </div>
        </div>
      </nav>

      {/* PORTALES: MODALES (Idénticos con estética grande) */}
      {showAdminModal && createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-xl" onClick={() => setShowAdminModal(false)} />
          <div className="relative w-full max-w-md bg-blue-950 border border-white/10 p-12 rounded-[3rem] z-10 animate-in zoom-in-95 duration-300 shadow-2xl">
            <button onClick={() => setShowAdminModal(false)} className="absolute top-8 right-8 text-white/30 hover:text-white"><X size={28} /></button>
            <h2 className={`text-center text-2xl font-bold text-white mb-10 tracking-widest ${oswald.className}`}>ADMIN ACCESS</h2>
            <form onSubmit={handleAdminLogin} className="space-y-6">
              <input type="text" placeholder="Usuario" className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500" value={adminCredentials.user} onChange={(e) => setAdminCredentials({ ...adminCredentials, user: e.target.value })} />
              <input type="password" placeholder="Clave" className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500" value={adminCredentials.pass} onChange={(e) => setAdminCredentials({ ...adminCredentials, pass: e.target.value })} />
              <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg tracking-widest transition-all">ENTRAR</button>
            </form>
          </div>
        </div>, document.body
      )}

      {showUserModal && createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" onClick={() => setShowUserModal(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 p-12 rounded-[3rem] z-10 animate-in fade-in zoom-in-95 duration-300 shadow-2xl">
            <button onClick={() => setShowUserModal(false)} className="absolute top-8 right-8 text-slate-400 dark:text-white/30"><X size={28} /></button>
            <h2 className={`text-center text-4xl font-black mb-10 italic ${oswald.className} dark:text-white`}>HOLA!</h2>
            <form onSubmit={(e) => { e.preventDefault(); setShowUserModal(false); }} className="space-y-6">
              <input type="email" placeholder="Email" className="w-full p-5 rounded-2xl bg-slate-100 dark:bg-white/5 outline-none dark:text-white text-lg border-2 border-transparent focus:border-blue-500" value={userCredentials.email} onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })} />
              <input type="password" placeholder="Password" className="w-full p-5 rounded-2xl bg-slate-100 dark:bg-white/5 outline-none dark:text-white text-lg border-2 border-transparent focus:border-blue-500" value={userCredentials.pass} onChange={(e) => setUserCredentials({ ...userCredentials, pass: e.target.value })} />
              <button type="submit" className="w-full bg-slate-900 dark:bg-blue-600 text-white py-5 rounded-2xl font-black text-lg tracking-widest transition-all shadow-xl">ACCEDER</button>
            </form>
          </div>
        </div>, document.body
      )}

      {/* Sidebar Carrito */}
      {mounted && createPortal(
        <div className={`fixed inset-0 z-[100000] ${isCartOpen ? 'visible' : 'invisible'}`}>
          <div className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsCartOpen(false)} />
          <div className={`absolute top-0 right-0 h-full w-full sm:w-[500px] bg-white dark:bg-slate-950 flex flex-col transition-transform duration-500 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-8 border-b flex items-center justify-between dark:border-white/10">
              <h2 className={`text-2xl font-black dark:text-white ${oswald.className}`}>CARRITO</h2>
              <button onClick={() => setIsCartOpen(false)} className="dark:text-white p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full"><X size={32} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cart.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-6 p-6 bg-slate-50 dark:bg-white/5 rounded-3xl relative border dark:border-white/5">
                  <div className="h-24 w-24 bg-white rounded-2xl p-2 shrink-0 shadow-sm border">
                    {item.image && <Image src={item.image} alt={item.name} width={96} height={96} className="object-contain w-full h-full" />}
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-sm font-bold dark:text-white uppercase tracking-tight line-clamp-2">{item.name}</h4>
                    <p className="text-blue-600 font-black text-xl mt-2">${Number(item.price).toFixed(2)}</p>
                  </div>
                  <button onClick={() => removeFromCart(idx)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500"><X size={20} /></button>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="p-10 border-t dark:border-white/10 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold dark:text-white/60">TOTAL</span>
                  <span className="text-4xl font-black dark:text-white">${total.toFixed(2)}</span>
                </div>
                <Link href="/pago" className="block w-full bg-blue-600 text-white text-center py-6 rounded-[2rem] font-black text-xl tracking-[0.2em] shadow-2xl hover:bg-blue-500 transition-all uppercase">
                  PAGAR AHORA
                </Link>
              </div>
            )}
          </div>
        </div>, document.body
      )}
    </>
  );
}