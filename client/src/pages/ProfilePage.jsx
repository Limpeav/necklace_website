import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await updateProfile(form);
    setMessage("Profile updated");
  };

  return (
    <section className="container-shell py-14">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <form onSubmit={submit} className="surface-card p-8">
          <p className="eyebrow">Account</p>
          <h1 className="mt-3 font-display text-5xl text-white">Profile details</h1>
          {message && <p className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">{message}</p>}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <input className="input" value={form.name} onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))} placeholder="Name" />
            <input className="input" value={user?.email || ""} disabled placeholder="Email" />
            <input className="input" value={form.phone} onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value }))} placeholder="Phone" />
            <input className="input" type="password" value={form.password} onChange={(e) => setForm((current) => ({ ...current, password: e.target.value }))} placeholder="New password" />
          </div>
          <button className="btn-primary mt-8">Save changes</button>
        </form>

        <div className="surface-card h-fit p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-400">Quick links</p>
          <div className="mt-5 space-y-3">
            <Link className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-stone-200 transition hover:border-gold hover:text-white" to="/wishlist">
              Saved wishlist
            </Link>
            <Link className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-stone-200 transition hover:border-gold hover:text-white" to="/orders">
              Order history
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
