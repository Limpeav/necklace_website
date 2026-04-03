import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PageShell from "./components/layout/PageShell";
import AdminAddProductPage from "./pages/AdminAddProductPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import LoginPage from "./pages/LoginPage";
import ShopPage from "./pages/ShopPage";

const App = () => (
  <PageShell>
    <Routes>
      <Route path="/" element={<ShopPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/products/new" element={<ProtectedRoute adminOnly><AdminAddProductPage /></ProtectedRoute>} />
      <Route path="/admin/products/:productId/edit" element={<ProtectedRoute adminOnly><AdminAddProductPage /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboardPage /></ProtectedRoute>} />
    </Routes>
  </PageShell>
);

export default App;
