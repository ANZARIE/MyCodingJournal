import Thoughts from "./components/Thoughts";
import Task from "./components/Task";


function App() {
  return (
    <>
      <h2 className="text-center">My Coding Journal</h2>
      <div className="container d-flex w-100">
      <Thoughts />
      <Task />
      </div>
    </>
  );
}

export default App;
