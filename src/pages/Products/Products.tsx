import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/api";
import ProductCard from "../../components/ProductCard";
import { Product } from "../../types/Product";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setError(false);
      } catch (error) {
        console.error("Error loading products:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="min-h-screen bg-accentBg p-6 pt-24 text-center">
        <h2 className="text-xl text-error mb-4">
          Error cargando los productos
        </h2>
        <Button onClick={() => window.location.reload()}>Reintentar</Button>
      </div>
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

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
        <Button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="!px-6 !py-2 !rounded-full flex items-center gap-2"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Anterior
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`!w-10 !h-10 !p-0 !rounded-full ${
                currentPage === i + 1
                  ? "!bg-primary !text-white !shadow-lg"
                  : "!bg-white !text-text hover:!bg-gray-50 !border !border-gray-200"
              }`}
            >
              {i + 1}
            </Button>
          ))}
        </div>

        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="!px-6 !py-2 !rounded-full flex items-center gap-2"
        >
          Siguiente
          <ArrowRightIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default Products;
