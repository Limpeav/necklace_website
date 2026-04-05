const imageModules = import.meta.glob("../assets/product_image/*.{jpeg,jpg,png,webp}", {
  eager: true,
  import: "default"
});

const sortedImages = Object.entries(imageModules)
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([, src]) => src);

const productBlueprints = [
  { name: "Venta Glow Strand", productCode: "VT-001", price: 4, category: "Everyday", material: ["Alloy"], color: ["Gold"], length: ["40cm"], featured: true },
  { name: "Venta Pearl Drop", productCode: "VT-002", price: 4, category: "Pearl", material: ["Pearl"], color: ["Cream"], length: ["42cm"], featured: true },
  { name: "Venta Layer Chain", productCode: "VT-003", price: 4, category: "Layered", material: ["Stainless Steel"], color: ["Gold"], length: ["45cm"], featured: true },
  { name: "Venta Soft Shine", productCode: "VT-004", price: 4, category: "Minimal", material: ["Alloy"], color: ["Silver"], length: ["40cm"], featured: false },
  { name: "Venta Heart Lock", productCode: "VT-005", price: 4, category: "Statement", material: ["Alloy"], color: ["Gold"], length: ["45cm"], featured: true },
  { name: "Venta Classic Pearl", productCode: "VT-006", price: 4, category: "Pearl", material: ["Pearl"], color: ["White"], length: ["41cm"], featured: false },
  { name: "Venta Night Chain", productCode: "VT-007", price: 4, category: "Minimal", material: ["Stainless Steel"], color: ["Black"], length: ["43cm"], featured: false },
  { name: "Venta Twin Layer", productCode: "VT-008", price: 4, category: "Layered", material: ["Alloy"], color: ["Gold"], length: ["46cm"], featured: true },
  { name: "Venta Round Pearl", productCode: "VT-009", price: 4, category: "Pearl", material: ["Pearl"], color: ["Ivory"], length: ["42cm"], featured: false },
  { name: "Venta Dune Pendant", productCode: "VT-010", price: 4, category: "Everyday", material: ["Alloy"], color: ["Gold"], length: ["40cm"], featured: false },
  { name: "Venta Fine Drop", productCode: "VT-011", price: 4, category: "Minimal", material: ["Stainless Steel"], color: ["Silver"], length: ["44cm"], featured: true },
  { name: "Venta Ribbon Glow", productCode: "VT-012", price: 4, category: "Statement", material: ["Alloy"], color: ["Rose Gold"], length: ["45cm"], featured: false },
  { name: "Venta Star Layer", productCode: "VT-013", price: 4, category: "Layered", material: ["Alloy"], color: ["Gold"], length: ["47cm"], featured: true },
  { name: "Venta Mini Pearl", productCode: "VT-014", price: 4, category: "Pearl", material: ["Pearl"], color: ["White"], length: ["39cm"], featured: false },
  { name: "Venta Soft Curve", productCode: "VT-015", price: 4, category: "Everyday", material: ["Alloy"], color: ["Silver"], length: ["41cm"], featured: false },
  { name: "Venta Luxe Strand", productCode: "VT-016", price: 4, category: "Statement", material: ["Stainless Steel"], color: ["Gold"], length: ["48cm"], featured: true },
  { name: "Venta Bloom Pearl", productCode: "VT-017", price: 4, category: "Pearl", material: ["Pearl"], color: ["Cream"], length: ["43cm"], featured: false },
  { name: "Venta Light Chain", productCode: "VT-018", price: 4, category: "Minimal", material: ["Alloy"], color: ["Gold"], length: ["40cm"], featured: false },
  { name: "Venta Orbit Drop", productCode: "VT-019", price: 4, category: "Everyday", material: ["Stainless Steel"], color: ["Silver"], length: ["42cm"], featured: false }
];

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const products = sortedImages.map((image, index) => {
  const blueprint = productBlueprints[index] || {
    name: `Venta Piece ${index + 1}`,
    productCode: `VT-${String(index + 1).padStart(3, "0")}`,
    price: 4,
    category: "Everyday",
    material: ["Alloy"],
    color: ["Gold"],
    length: ["40cm"],
    featured: index < 6
  };

  return {
    _id: blueprint.productCode,
    slug: slugify(blueprint.name),
    name: blueprint.name,
    productCode: blueprint.productCode,
    description: `${blueprint.name} from the local gallery collection.`,
    price: blueprint.price,
    images: [image],
    category: blueprint.category,
    material: blueprint.material,
    color: blueprint.color,
    length: blueprint.length,
    stock: 1,
    featured: blueprint.featured
  };
});

export const featuredProducts = products.filter((product) => product.featured);
