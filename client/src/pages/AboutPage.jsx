import FallbackImage from "../components/FallbackImage";

const AboutPage = () => (
  <section className="container-shell py-14">
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <FallbackImage
        src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80"
        alt="Jewelry studio"
        className="h-[540px] w-full rounded-[2rem] object-cover"
      />
      <div className="surface-card p-8 md:p-10">
        <p className="eyebrow">About Venta</p>
        <h1 className="section-title mt-3">A sharper jewelry storefront with a stronger point of view.</h1>
        <div className="mt-6 space-y-5 text-sm leading-8 text-stone-300">
          <p>Venta is built around necklaces that feel elevated but wearable, with collections spanning pearl, statement, minimal, and layered categories.</p>
          <p>The new interface strips away the softer campaign-style treatment and leans into contrast, image-first commerce, and clearer shopping intent.</p>
          <p>That means more useful navigation, stronger product focus, and a customer flow that feels more like a real retail experience from landing page to checkout.</p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutPage;
