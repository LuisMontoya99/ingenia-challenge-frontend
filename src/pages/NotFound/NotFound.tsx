import Button from "../../components/Button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center text-center px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl xs:text-6xl md:text-8xl font-bold text-primary mb-3 md:mb-4">
          404
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-text mb-6 md:mb-8 max-w-2xl mx-auto">
          ¡Ups! La página que buscas no existe o ha sido movida.
        </p>

        <Button
          to="/home"
          className="text-sm md:text-base px-6 md:px-8 py-3 md:py-4"
        >
          Volver al Inicio
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
