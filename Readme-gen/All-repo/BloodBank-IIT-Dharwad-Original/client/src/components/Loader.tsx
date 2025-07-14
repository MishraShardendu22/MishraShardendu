const MedicalLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/50">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <div className="absolute w-full h-full border-8 rounded-full border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        <div className="relative animate-pulse">
          <div className="absolute bg-primary w-8 h-32 -mt-16 left-1/2 -ml-4 rounded-md"></div>
          <div className="absolute bg-primary h-8 w-32 -ml-16 top-1/2 -mt-4 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default MedicalLoader;
