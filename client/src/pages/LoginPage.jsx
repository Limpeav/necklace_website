import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Admin.css";

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
    <section className="container-shell admin-section">
      <div className="admin-split">
        <div className="surface-card" style={{ padding: '2.5rem' }}>
          <p className="eyebrow">Admin access</p>
          <h1 className="admin-title mt-3">Sign in to manage the VETA STORE catalog.</h1>
          <p className="mt-4 text-stone-300">
            This login is only for admin access to the product dashboard. The storefront remains public for visitors.
          </p>
        </div>

        <div className="surface-card" style={{ padding: '2.5rem' }}>
          <form onSubmit={submit} className="admin-form">
            {error && <p className="admin-error">{error}</p>}
            <input className="input" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))} />
            <input className="input" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm((current) => ({ ...current, password: e.target.value }))} />
            <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={loading}>{loading ? "Signing in..." : "Admin sign in"}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
