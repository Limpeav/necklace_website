const ContactPage = () => (
  <section className="container-shell py-14">
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="surface-card p-8">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 font-display text-5xl text-white">Support that fits the redesigned store.</h1>
        <div className="mt-6 space-y-4 text-sm leading-8 text-stone-300">
          <p>Email: care@lunellejewelry.com</p>
          <p>Phone: +1 (555) 218-4471</p>
          <p>Hours: Monday to Friday, 9 AM to 6 PM</p>
          <p>Use this for order support, gifting help, styling questions, or product details.</p>
        </div>
      </div>
      <form className="surface-card space-y-4 p-8">
        <input className="input" placeholder="Your name" />
        <input className="input" placeholder="Email" />
        <input className="input" placeholder="Subject" />
        <textarea className="input min-h-40" placeholder="How can we help?" />
        <button className="btn-primary">Send message</button>
      </form>
    </div>
  </section>
);

export default ContactPage;
