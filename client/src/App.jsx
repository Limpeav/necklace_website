import { Route, Routes } from "react-router-dom";
import PageShell from "./components/layout/PageShell";
import ShopPage from "./pages/ShopPage";

const App = () => (
  <PageShell>
    <Routes>
      <Route path="/" element={<ShopPage />} />
      <Route path="/shop" element={<ShopPage />} />
    </Routes>
  </PageShell>
);

export default App;
