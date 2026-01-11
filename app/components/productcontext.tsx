'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../../lib/api';

// 1. Estructura del producto
export interface Product {
  id: number;
  name: string;
  price: number;
  displayPrice: string;
  image: string;
  category: string;
  span?: string;
}

// 2. Interfaz del contexto
interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'displayPrice'>) => void;
  deleteProduct: (id: number) => void;
  uploadImage: (file: File) => Promise<string | null>;
  isUploading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts debe usarse dentro de ProductProvider');
  return context;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  // CORRECCIÓN CLAVE: Iniciamos siempre con array vacío para evitar error de Hidratación
  const [products, setProducts] = useState<Product[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 3. CARGA DE DATOS: Cargar desde API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        // Transformar datos si es necesario, asumiendo que el backend devuelve la estructura correcta o mapearla
        // El backend Laravel devuelve: { id, name, price, category_id, image, ... } + category: { id, name }
        // El frontend espera: { id, name, price, displayPrice, image, category, span? }

        const mappedProducts: Product[] = response.data.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: parseFloat(p.price),
          displayPrice: `$${Number(p.price).toFixed(2)}`,
          image: p.image || '/audifonos_1.png', // Fallback si no hay imagen
          category: p.category ? p.category.name : 'General',
          span: 'md:col-span-1'
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Error cargando productos del backend", error);
        // Fallback a localStorage si falla la API (opcional, o dejar vacío)
      }
    };

    fetchProducts();
  }, []);

  // 4. GUARDADO AUTOMÁTICO - DESHABILITADO POR AHORA AL USAR BACKEND
  // useEffect(() => {
  //   if (products.length > 0) {
  //     localStorage.setItem('products', JSON.stringify(products));
  //   }
  // }, [products]);

  const addProduct = (data: Omit<Product, 'id' | 'displayPrice'>) => {
    const newProduct: Product = {
      ...data,
      id: Date.now(),
      displayPrice: `$${Number(data.price).toFixed(2)}`,
      span: 'md:col-span-1',
    };
    // Actualizamos estado y localStorage inmediatamente
    const updatedList = [...products, newProduct];
    setProducts(updatedList);
    localStorage.setItem('products', JSON.stringify(updatedList));
  };

  const deleteProduct = (id: number) => {
    const updatedList = products.filter(p => p.id !== id);
    setProducts(updatedList);
    localStorage.setItem('products', JSON.stringify(updatedList));
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'picture_prod');
    formData.append('cloud_name', 'dnprcwhvt');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dnprcwhvt/image/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setIsUploading(false);
      return data.secure_url;
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      setIsUploading(false);
      return null;
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      deleteProduct,
      uploadImage,
      isUploading,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </ProductContext.Provider>
  );
};