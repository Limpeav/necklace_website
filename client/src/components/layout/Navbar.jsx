import { Link } from "react-router-dom";
import "../../styles/Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar-container">
      <div className="container-shell navbar-inner">
        <div className="navbar-content text-white">
          <div className="flex items-center justify-center">
            <Link to="/shop" className="navbar-logo">
              VENTA
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
