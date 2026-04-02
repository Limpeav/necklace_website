const testimonials = [
  {
    name: "Elena R.",
    quote: "The new layout feels premium and the products are easier to compare. I went from browsing to checkout fast."
  },
  {
    name: "Naomi T.",
    quote: "Everything reads more like a real online store now. The cards show what I need before I open the product page."
  },
  {
    name: "Sofia K.",
    quote: "The darker visual system makes the jewelry photography stand out more and the whole brand feels stronger."
  }
];

const TestimonialSection = () => (
  <section className="container-shell mt-24">
    <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
      <div className="surface-card p-8 md:p-10">
        <p className="eyebrow">Customer feedback</p>
        <h2 className="mt-3 font-display text-5xl leading-none text-white">
          Better product focus, less decorative noise.
        </h2>
        <p className="mt-5 text-sm leading-7 text-stone-300">
          The redesign shifts emphasis toward sellable detail, image contrast, and obvious next actions throughout the storefront.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.name} className="surface-card p-7">
            <p className="font-display text-3xl leading-10 text-white">“{item.quote}”</p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-stone-400">{item.name}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialSection;
