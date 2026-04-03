import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const PageShell = ({ children }) => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f4f7fb", color: "#0f172a" }}>
        {children}
      </div>
    );
  }

  return (
    <div style={{ position: "relative", overflowX: "hidden", minHeight: "100vh", width: "100%" }}>
      <div className="bg-blob-1" />
      <div className="bg-blob-2" />
      <div className="bg-blob-3" />
      <Navbar />
      <main style={{ position: "relative", zIndex: 10 }}>{children}</main>
    </div>
  );
};

export default PageShell;
