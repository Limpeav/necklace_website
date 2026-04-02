import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <div className="container-shell pt-4">
        <div className="rounded-[1.75rem] border border-white/10 bg-[rgba(11,12,14,0.82)] px-4 py-3 shadow-luxury backdrop-blur-xl sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link to="/shop" className="font-display text-[2rem] leading-none tracking-[0.18em] text-white">
              VETA STORE
            </Link>

            <button
              onClick={() => setOpen((value) => !value)}
              className="rounded-full border border-white/10 bg-white/5 p-2.5 text-white md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="container-shell mt-3 md:hidden">
          <div className="rounded-[1.75rem] border border-white/10 bg-[rgba(11,12,14,0.92)] p-5 shadow-luxury backdrop-blur-xl" />
        </div>
      )}
    </header>
  );
};

export default Navbar;
