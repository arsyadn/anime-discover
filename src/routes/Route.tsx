import { Route, Routes } from "react-router-dom";
import AnimeList from "../pages/AnimeList";
import AnimeDetail from "../pages/AnimeDetail";
import Login from "../pages/Login";
import WishlistWrapper from "../pages/WishlistWrapper";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound";

const RouteApp = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/wishlist" element={<WishlistWrapper />} />
      </Route>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<AnimeList />} />
      <Route path="/anime/:id" element={<AnimeDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouteApp;
