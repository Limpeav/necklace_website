import { formatCurrency } from "../../utils/format";
import FallbackImage from "../FallbackImage";
import "../../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <article className="product-card">
      <div className="product-image-container">
        <FallbackImage
          src={product.images[0]}
          alt={product.name}
          className="product-image"
        />
        <div className="product-image-overlay" />
        <div className="product-id-badge">
          Available
        </div>
      </div>

      <div className="product-info">
        <div className="product-price-container">
          <span className="product-price">{formatCurrency(product.price || 0)}</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
