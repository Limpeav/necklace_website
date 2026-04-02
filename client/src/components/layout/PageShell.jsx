import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const PageShell = ({ children }) => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <div className="min-h-screen bg-[#f4f7fb] text-slate-900">{children}</div>;
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(199,153,83,0.14),_transparent_58%)]" />
        <div className="absolute right-[-8rem] top-40 h-80 w-80 rounded-full bg-[rgba(88,144,156,0.16)] blur-3xl" />
        <div className="absolute bottom-0 left-[-6rem] h-96 w-96 rounded-full bg-[rgba(123,58,43,0.16)] blur-3xl" />
      </div>
      <Navbar />
      <main className="relative z-10">{children}</main>
    </div>
  );
};

export default PageShell;
