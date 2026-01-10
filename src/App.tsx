import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RouteApp from "./routes/Route";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <RouteApp />
      </div>
    </BrowserRouter>
  );
}

export default App;
