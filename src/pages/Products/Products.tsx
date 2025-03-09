import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/api";
import ProductCard from "../../components/ProductCard";
import { Product } from "../../types/Product";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const itemsPerPage = 6;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    loadProducts();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="min-h-screen bg-accentBg p-6 pt-24">
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">
          Nuestros Productos
        </h1>
        <p className="text-lg text-text/80">
          Descubre artículos exclusivos con calidad premium y envío express
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-6 py-2 bg-primary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-all font-medium flex items-center gap-2"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Anterior
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                currentPage === i + 1
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-text hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-6 py-2 bg-primary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-all font-medium flex items-center gap-2"
        >
          Siguiente
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Products;
