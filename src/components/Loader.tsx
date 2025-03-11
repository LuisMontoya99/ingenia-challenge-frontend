const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-accentBg">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 border-4 border-secondary border-b-transparent rounded-full animate-spin-reverse" />
        </div>
        <span className="text-text font-medium">Cargando...</span>
      </div>
    </div>
  );
};

export default Loader;
