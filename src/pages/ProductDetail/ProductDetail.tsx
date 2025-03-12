import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../services/api";
import { Product } from "../../types/Product";
import Button from "../../components/Button";
import NotFound from "../NotFound/NotFound";
import Loader from "../../components/Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mainImage, setMainImage] = useState(product?.thumbnail || "");
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id!);
        setProduct(data);
        setMainImage(data.thumbnail);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="min-h-screen bg-accentBg p-6 pt-24 text-center">
        <h2 className="text-xl text-error mb-4">Error cargando el producto</h2>
        <Button to="/products">Volver a productos</Button>
      </div>
    );

  if (!product) return <NotFound />;

  return (
    <div className="min-h-screen bg-accentBg p-6 pt-24">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-xl overflow-hidden max-h-[300px] lg:max-h-[500px]">
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-auto max-h-[300px] lg:max-h-[500px] object-contain mx-auto"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {product.images.map((img, index) => (
                <Button
                  key={img}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square !p-0 !rounded-lg !border-2 !bg-transparent hover:!bg-transparent focus:!bg-transparent !shadow-none ${
                    mainImage === img
                      ? "!border-primary"
                      : "!border-transparent"
                  }`}
                  ariaLabel={`Ver imagen ${index + 1}`}
                >
                  <img
                    src={img}
                    alt={`Imagen ${index + 1} del producto ${product.title}`}
                    className="w-full h-full object-contain"
                    role="presentation"
                  />
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="sm:text-3xl text-xl font-bold text-text mt-4 mb-2">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 text-lg">
                <span className="text-success font-bold">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-muted line-through">
                    $
                    {(
                      product.price /
                      (1 - product.discountPercentage / 100)
                    ).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="text-text/70 ml-2">
                  ({product.rating.toFixed(1)})
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock > 0
                    ? "bg-success/10 text-success"
                    : "bg-error/10 text-error"
                }`}
              >
                {product.stock > 0 ? `${product.stock} disponibles` : "Agotado"}
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-text">Descripción</h3>
              <p className="text-text/80 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="text-sm font-medium text-text/70 mb-1">Marca</h4>
                <p className="font-medium text-text">{product.brand}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="text-sm font-medium text-text/70 mb-1">
                  Categoría
                </h4>
                <p className="font-medium text-text">{product.category}</p>
              </div>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
              <Button
                className="flex-1 !py-3"
                onClick={() => dispatch(addToCart(product))}
              >
                Añadir al carrito
              </Button>

              <Button
                to="/products"
                variant="outline"
                className="flex-1 !py-3 text-center"
              >
                Seguir comprando
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
