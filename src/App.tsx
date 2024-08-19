import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { store } from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
       <Router>
       <AppRoutes />
       </Router>
      </Provider>
    </>
  );
}

export default App;
