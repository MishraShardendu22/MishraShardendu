let y = new Date();
let year = y.getFullYear();

export default function Name() {
  return (
    <div >
        <h1 className="my-10 text-center font-extrabold text-5xl rounded-lg text-red-200 hover:scale-110 transition duration-300 ease-in-out ">Made With ❤️ By Shardendu Mishra </h1>
        <h1 className="my-10 text-center font-extrabold text-5xl rounded-lg text-red-200 hover:scale-110 transition duration-300 ease-in-out ">Made in : {year} ©️ of ShardenduMishra Create`s</h1>
    </div>
  )
}
