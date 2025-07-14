export default function App() {
  let y = new Date();
  let year = y.getFullYear();

  return (
    <>
      <p className="font-extrabold text-xl text-red-900 mt-4 hover:scale-110 transition-transform duration-300 ease-in-out">
        This Project is made using context to turn the page to 
        dark or light mode using a simple Toggle switch  
      </p>
      <p className="font-extrabold text-xl text-red-900 mt-4 hover:scale-110 transition-transform duration-300 ease-in-out">
        Made With ❤️ By Shardendu Mishra
      </p>
      <p className="font-extrabold text-xl text-red-900 mt-2 hover:scale-110 transition-transform duration-300 ease-in-out">
        Made in: {year} ©️ ShardenduMishra Creates
      </p>
    </>
  );
}
