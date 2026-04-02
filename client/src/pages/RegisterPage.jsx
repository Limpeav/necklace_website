import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useStore } from "../context/StoreContext";

const RegisterPage = () => {
  const { register, loading } = useAuth();
  const { syncProtectedState } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      await syncProtectedState();
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create account");
    }
  };

  return (
    <section className="container-shell py-14">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface-card p-8 md:p-10">
          <p className="eyebrow">Create account</p>
          <h1 className="mt-3 font-display text-5xl leading-none text-white">Join the store with a cleaner, faster account flow.</h1>
          <p className="mt-6 text-sm leading-7 text-stone-300">
            Save favorites, track purchases, and keep checkout details close without the old disconnected sign-up screen.
          </p>
        </div>

        <div className="surface-card p-8 md:p-10">
          <form onSubmit={submit} className="space-y-4">
            {error && <p className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</p>}
            <input className="input" placeholder="Full name" value={form.name} onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))} />
            <input className="input" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))} />
            <input className="input" placeholder="Phone" value={form.phone} onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value }))} />
            <input className="input" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm((current) => ({ ...current, password: e.target.value }))} />
            <button className="btn-primary w-full" disabled={loading}>{loading ? "Creating account..." : "Create account"}</button>
          </form>
          <p className="mt-6 text-sm text-stone-300">
            Already have an account? <Link className="font-semibold text-gold" to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
