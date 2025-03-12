import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Button from "../../components/Button";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../store/cartSlice";
import { useEffect } from "react";

const Cart = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-accentBg p-6 pt-24 text-center">
        <h2 className="text-2xl text-text mb-6">Tu carrito está vacío</h2>
        <Button to="/products">Explorar productos</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accentBg p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Tu Carrito</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-6 shadow-md flex flex-col sm:flex-row gap-6"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-32 h-32 object-contain"
                />

                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-text mb-2">
                    {item.title}
                  </h3>
                  <p className="text-lg font-medium text-success mb-4">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <div className="flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
                      <Button
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        className="!text-primary !hover:text-secondary !text-lg !p-0 !bg-transparent !shadow-none hover:!scale-100"
                      >
                        -
                      </Button>
                      <span className="text-text font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        className="!text-primary !hover:text-secondary !text-lg !p-0 !bg-transparent !shadow-none hover:!scale-100"
                      >
                        +
                      </Button>
                    </div>

                    <Button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      variant="outline"
                      className="!px-4 !py-2"
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md h-fit sticky top-24">
            <h2 className="text-2xl font-bold text-text mb-6">Resumen</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between">
                <span className="text-text/80">Subtotal:</span>
                <span className="font-medium text-text">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text/80">Envío:</span>
                <span className="font-medium text-success">Gratis</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-text">Total:</span>
              <span className="text-xl font-bold text-primary">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="space-y-4">
              <Button className="w-full !py-3">Finalizar compra</Button>
              <Button
                onClick={() => dispatch(clearCart())}
                variant="outline"
                className="w-full !py-3"
              >
                Vaciar carrito
              </Button>

              <Button
                to="/products"
                variant="outline"
                className="w-full !py-3 !text-center !border-transparent !text-primary hover:!bg-primary/10"
              >
                Continuar comprando
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
