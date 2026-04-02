const promoItems = [
  { label: "Category-first", title: "Shop by collection", copy: "Pearl, minimal, layered, and statement styles feel separated and easier to scan." },
  { label: "Stronger cards", title: "See the selling details", copy: "Ratings, stock, materials, and direct product actions are visible before a click." },
  { label: "Cleaner journey", title: "From browse to checkout", copy: "Auth, cart, and account pages now share the same darker, sharper store system." }
];

const PromoBanner = () => (
  <section className="container-shell mt-8">
    <div className="grid gap-5 lg:grid-cols-3">
      {promoItems.map((item) => (
        <article key={item.title} className="surface-card p-7">
          <p className="eyebrow">{item.label}</p>
          <h3 className="mt-4 font-display text-3xl leading-none text-white">{item.title}</h3>
          <p className="mt-4 text-sm leading-7 text-stone-300">{item.copy}</p>
        </article>
      ))}
    </div>
  </section>
);

export default PromoBanner;
