export default function App() {
  let y = new Date();
  let year = y.getFullYear();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <p className="text-2xl my-4 border-solid border-black font-bold rounded-md text-violet-600 hover:scale-110 font-extrabold text-4xl transition-transform duration-300 ease-in-out">
        This Project uses context to make a TO-DO list !!
      </p>
      <p className="text-2xl my-4 border-solid border-black font-bold rounded-md text-violet-600 hover:scale-110 font-extrabold text-4xl transition-transform duration-300 ease-in-out">
        Made With ❤️ By Shardendu Mishra
      </p>
      <p className="text-2xl my-4 border-solid border-black font-bold rounded-md text-violet-600 hover:scale-110 font-extrabold text-4xl transition-transform duration-300 ease-in-out">
        Made in: {year} ©️ ShardenduMishra Creates
      </p>
    </div>
  );
}
