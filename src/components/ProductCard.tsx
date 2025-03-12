import { Product } from "../types/Product";
import Button from "./Button";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const renderRating = (rating: number) => (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-xl ${
              index < Math.floor(rating) ? "text-yellow-400" : "text-gray-200"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-sm text-text/70">({rating.toFixed(1)})</span>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      <div className="relative flex-shrink-0 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-52 object-contain transition-transform duration-300 group-hover:scale-110"
        />
        <span className="absolute top-3 right-3 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-medium">
          {product.category}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-3">
          <h3 className="text-md font-semibold text-text flex-grow line-clamp-2">
            {product.title}
          </h3>
          <span className="text-lg font-medium text-success whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          {renderRating(product.rating)}
          <span
            className={`text-sm px-2 py-1 rounded-full ${
              product.stock > 0
                ? "bg-success/10 text-success"
                : "bg-error/10 text-error"
            }`}
          >
            {product.stock > 0 ? "Disponible" : "Agotado"}
          </span>
        </div>

        <div className="mt-auto">
          <Button
            to={`/products/${product.id}`}
            className="w-full !py-2.5 !px-4 !rounded-lg !text-base text-center"
          >
            Ver detalles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
