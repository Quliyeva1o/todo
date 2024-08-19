import { Route, Routes } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/home";
import Board from "../pages/board";



const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/board" element={<Board />} />
    </Route>
  </Routes>
);

export default AppRoutes;
