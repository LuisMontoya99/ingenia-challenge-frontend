import "./Home.css";
import Button from "../../components/Button";

const Home = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 transform -skew-y-6 origin-top-left" />

      <div className="relative h-screen flex flex-col justify-between">
        <div className="flex-grow flex items-center pt-16 md:pt-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text mb-4 md:mb-6">
              Bienvenido a{" "}
              <span className="text-primary inline-block">Ingenia</span>
              <span className="text-secondary inline-block">Store</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl md:max-w-3xl mx-auto px-2 sm:px-0">
              Descubre productos exclusivos y de alta calidad. Tu destino
              favorito para compras en línea con envío rápido y atención al
              cliente excepcional.
            </p>

            <Button
              to="/products"
              className="text-sm md:text-base px-6 md:px-8 py-3 md:py-4"
            >
              Explorar Productos
            </Button>
          </div>
        </div>

        <div className="bg-white py-4 md:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="home-page-footer flex flex-row items-center justify-center gap-4 md:gap-12 text-sm md:text-base">
              <div className="text-muted flex items-center gap-1">
                <span>🚚</span> Envío Rápido
              </div>
              <div className="text-muted flex items-center gap-1">
                <span>🔒</span> Pago Seguro
              </div>
              <div className="text-muted flex items-center gap-1">
                <span>🎁</span> Garantía
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
