import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form);
      if (!user?.isAdmin) {
        logout();
        setError("This login is for admin access only");
        return;
      }
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to sign in");
    }
  };

  return (
    <section className="container-shell py-14">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface-card p-8 md:p-10">
          <p className="eyebrow">Admin access</p>
          <h1 className="mt-3 font-display text-5xl leading-none text-white">Sign in to manage the VETA STORE catalog.</h1>
          <p className="mt-6 text-sm leading-7 text-stone-300">
            This login is only for admin access to the product dashboard. The storefront remains public for visitors.
          </p>
        </div>

        <div className="surface-card p-8 md:p-10">
          <form onSubmit={submit} className="space-y-4">
            {error && <p className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</p>}
            <input className="input" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))} />
            <input className="input" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm((current) => ({ ...current, password: e.target.value }))} />
            <button className="btn-primary w-full" disabled={loading}>{loading ? "Signing in..." : "Admin sign in"}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
