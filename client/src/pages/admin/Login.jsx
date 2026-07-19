import { useState } from "react";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useHotelConfig } from "../../context/HotelConfigContext";
import { Button } from "../../components/ui/Button";

export default function Login() {
  const { config } = useHotelConfig();
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={location.state?.from?.pathname || "/admin"} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate(location.state?.from?.pathname || "/admin", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin Login — {config.hotelName}</title>
      </Helmet>

      <div className="flex min-h-screen items-center justify-center bg-ink px-6">
        <div className="w-full max-w-sm rounded-2xl border border-warm-white/10 bg-white/[0.03] p-8 backdrop-blur">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
            <Lock className="h-5 w-5 text-gold" strokeWidth={1.5} />
          </div>
          <h1 className="mt-5 text-center font-display text-2xl text-warm-white">{config.hotelName}</h1>
          <p className="mt-1 text-center text-xs uppercase tracking-wider text-gold-light">Admin Console</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-warm-white/60">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg border border-warm-white/15 bg-transparent px-3 py-2.5 text-sm text-warm-white outline-none focus:border-gold"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-warm-white/60">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-lg border border-warm-white/15 bg-transparent px-3 py-2.5 text-sm text-warm-white outline-none focus:border-gold"
              />
            </label>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <Button type="submit" variant="gold" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-warm-white/50">
            Need an account?{" "}
            <Link to="/admin/register" className="text-gold-light underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
