import Btn from "./components/button";

function App(){
  return (
    <div className="w-full duration-200 h-screen">
      <div className="fixed flex flex-wrap justify-center top-12 inset-12 bg-olive-500">
        <div className="flex flex flex-wrap justify-center bg-white rounded-xl">
          <Btn bgColor="violet" textColor="white"/>
        </div>
      </div>
    </div>
  )
}

export default App;
