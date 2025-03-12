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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);

        const uniqueCategories = Array.from(
          new Set(data.map((product) => product.category))
        ).sort();

        setCategories(uniqueCategories);
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
    let result = products;

    if (searchQuery) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, products]);

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
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

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
        <p className="text-lg text-text/80 mb-6">
          Descubre artículos exclusivos con calidad premium y envío express
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute right-3 top-3 text-gray-400">🔍</span>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-48 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white appearance-none cursor-pointer"
          >
            <option value="all">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category
                  .replace(/-/g, " ")
                  .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length > 0 ? (
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
      ) : (
        <div className="text-center py-12">
          <p className="text-text/80 text-lg">No se encontraron productos</p>
        </div>
      )}
    </div>
  );
};

export default Products;
