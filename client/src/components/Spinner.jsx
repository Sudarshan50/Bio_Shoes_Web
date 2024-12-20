const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-16 h-16 animate-spin">
        <div
          className="absolute w-4 h-4 bg-red-500 rounded-full 
            top-0 left-1/2 transform -translate-x-1/2 animate-pulse"
        ></div>
        <div
          className="absolute w-4 h-4 bg-green-500 rounded-full 
            right-0 top-1/2 transform -translate-y-1/2 animate-pulse delay-100"
        ></div>
        <div
          className="absolute w-4 h-4 bg-blue-500 rounded-full 
            bottom-0 left-1/2 transform -translate-x-1/2 animate-pulse delay-200"
        ></div>
        <div
          className="absolute w-4 h-4 bg-yellow-500 rounded-full 
            left-0 top-1/2 transform -translate-y-1/2 animate-pulse delay-300"
        ></div>
      </div>
    </div>
  );
};

export default Spinner;
