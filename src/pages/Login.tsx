import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "/logo.jpeg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebaseClient";
import { KeyRound, Mail, AlertCircle, Loader2 } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/management");
    } catch (err: any) {
      console.error("Login failed:", err);
      if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Invalid email address or password.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many login attempts. Please try again later.");
      } else {
        setError("Failed to sign in. Please check your internet connection.");
      }
      setLoading(false);
    }
  };

  const handleCreateTestUser = async () => {
    setError("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, "testadmin@scisa.edu", "Password123!");
      alert("Test user created successfully!\n\nEmail: testadmin@scisa.edu\nPassword: Password123!");
      setEmail("testadmin@scisa.edu");
      setPassword("Password123!");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        alert("Test account already exists. Credentials have been auto-filled!");
        setEmail("testadmin@scisa.edu");
        setPassword("Password123!");
      } else {
        alert("Failed to create test user: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Background soft gradients */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-blue-50 blur-3xl"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-rose-50 blur-3xl"></div>

      <div className="w-full max-w-md bg-white border border-slate-250 p-8 rounded-2xl shadow-xl relative z-10 mx-4">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 shadow-md mb-4">
            <img src={logo} alt="SCISA Logo" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 text-center tracking-tight">
            SCISA Portal
          </h2>
          <p className="text-slate-500 text-sm mt-1 text-center font-medium">
            Management & Administration Dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-slate-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition duration-200"
                placeholder="admin@scisa.edu"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-slate-400">
                <KeyRound className="w-5 h-5" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm px-4 py-3 rounded-xl text-center font-semibold flex items-center justify-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition duration-200 shadow-md shadow-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Developer Helper Option */}
        <div className="mt-6 border-t border-slate-100 pt-4 text-center">
          <button
            type="button"
            onClick={handleCreateTestUser}
            className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-bold transition"
          >
            Setup / Autofill Test Account (testadmin@scisa.edu)
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
