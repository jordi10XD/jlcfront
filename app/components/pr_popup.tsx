// Componente de la Ventana Modal
function ProductModal({ product, onClose }: { product: any, onClose: () => void }) {
  // Evita que el click dentro de la tarjeta cierre el modal
  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!product) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all"
      onClick={onClose} // Cierra si das click afuera
    >
      <div 
        className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden relative animate-in fade-in zoom-in duration-300"
        onClick={handleCardClick}
      >
        {/* Botón Cerrar (X) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-500 transition-colors z-10"
        >
          ✕
        </button>

        {/* Contenido */}
        <div className="flex flex-col">
          {/* Imagen Grande */}
          <div className="bg-gray-50 w-full h-64 flex items-center justify-center p-6">
             <img 
               src={product.image} 
               alt={product.name} 
               className="w-full h-full object-contain drop-shadow-xl" 
             />
          </div>

          {/* Detalles */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-xs font-bold text-blue-500 tracking-widest uppercase mb-1 block">
                  {product.category}
                </span>
                <h2 className="text-3xl font-black text-gray-800 leading-tight">
                  {product.name}
                </h2>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-xl">
                 <span className="text-xl font-bold text-blue-600">
                   {product.displayPrice}
                 </span>
              </div>
            </div>

            <p className="text-gray-500 text-sm mt-4 leading-relaxed">
              Aquí puedes poner una descripción más larga del producto si la tuvieras en tu base de datos. Es un producto de excelente calidad de la categoría {product.category}.
            </p>

            {/* Botones de Acción */}
            <div className="mt-8 flex gap-3">
              <button className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-transform active:scale-95">
                Añadir al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}