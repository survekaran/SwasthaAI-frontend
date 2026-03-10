import { useState } from "react";

const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: "white"}}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);

export default function SwasthyaAuth() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [submitted, setSubmitted] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setSubmitted({ type: "login", email: loginData.email });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setSubmitted({ type: "signup", name: signupData.name, email: signupData.email });
    setTimeout(() => { setActiveTab("login"); setSubmitted(null); }, 2000);
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body, #root {
          height: 100%;
          width: 100%;
        }
        .auth-wrapper {
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f7fa 50%, #f0fdf4 100%) !important;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          font-family: Georgia, serif;
          color: #1f2937;
        }
        .auth-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.95) !important;
          border-radius: 24px;
          box-shadow: 0 8px 40px rgba(6,182,212,0.15), 0 2px 8px rgba(0,0,0,0.08);
          border: 1px solid rgba(6,182,212,0.2);
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          color: #1f2937 !important;
        }
        .shimmer-line {
          position: absolute;
          top: 0; left: 20%; right: 20%;
          height: 3px;
          background: linear-gradient(90deg, transparent, #06b6d4, #84cc16, transparent);
          border-radius: 0 0 4px 4px;
        }
        .logo-wrap {
          text-align: center;
          margin-bottom: 2rem;
        }
        .logo-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .logo-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #06b6d4, #0891b2);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(6,182,212,0.4);
        }
        .logo-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a !important;
          letter-spacing: -0.5px;
        }
        .auth-title {
          margin-top: 1.25rem;
          font-size: 1.75rem;
          font-weight: 700;
          color: #0f172a !important;
          letter-spacing: -0.5px;
        }
        .auth-subtitle {
          font-size: 0.85rem;
          color: #64748b !important;
          font-family: system-ui, sans-serif;
          margin-top: 0.25rem;
        }
        .tabs {
          display: flex;
          margin-bottom: 1.75rem;
          background: #f1f5f9;
          border-radius: 12px;
          padding: 4px;
        }
        .tab-btn {
          flex: 1;
          padding: 0.6rem;
          border-radius: 9px;
          border: none;
          cursor: pointer;
          font-family: system-ui, sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }
        .tab-btn.active {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
          color: #fff !important;
          box-shadow: 0 2px 8px rgba(6,182,212,0.35);
        }
        .tab-btn.inactive {
          background: transparent;
          color: #64748b !important;
        }
        .success-banner {
          margin-bottom: 1rem;
          padding: 0.75rem 1rem;
          background: linear-gradient(135deg, #f0fdf4, #dcfce7) !important;
          border: 1px solid #86efac;
          border-radius: 10px;
          font-size: 0.85rem;
          color: #166534 !important;
          font-family: system-ui, sans-serif;
        }
        .form-wrap {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .field-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: #374151 !important;
          margin-bottom: 0.4rem;
          font-family: system-ui, sans-serif;
        }
        .field-input {
          width: 100%;
          padding: 0.65rem 0.9rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          outline: none;
          font-size: 0.9rem;
          color: #0f172a !important;
          background: #fafafa !important;
          font-family: system-ui, sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .field-input:focus {
          border-color: #06b6d4;
          box-shadow: 0 0 0 3px rgba(6,182,212,0.12);
          background: rgba(6,182,212,0.02) !important;
        }
        .submit-btn {
          margin-top: 0.5rem;
          width: 100%;
          padding: 0.8rem;
          background: linear-gradient(135deg, #06b6d4, #0891b2);
          color: #fff !important;
          border: none;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          font-family: system-ui, sans-serif;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(6,182,212,0.35);
          transition: all 0.2s ease;
          letter-spacing: 0.3px;
        }
        .submit-btn:hover {
          background: linear-gradient(135deg, #0891b2, #0e7490);
          box-shadow: 0 6px 20px rgba(6,182,212,0.5);
          transform: translateY(-1px);
        }
        .footer-text {
          text-align: center;
          font-size: 0.75rem;
          color: #94a3b8 !important;
          margin-top: 1.25rem;
          font-family: system-ui, sans-serif;
        }
        .footer-text a {
          color: #06b6d4 !important;
          text-decoration: none;
        }
        .footer-text a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="shimmer-line" />

          {/* Logo */}
          <div className="logo-wrap">
            <a href="/" className="logo-link">
              <div className="logo-icon">
                <ActivityIcon />
              </div>
              <span className="logo-name">SwasthyaAI</span>
            </a>
            <h2 className="auth-title">
              {activeTab === "login" ? "Welcome back" : "Create account"}
            </h2>
            <p className="auth-subtitle">
              {activeTab === "login"
                ? "Access your personalized health dashboard."
                : "Start your health journey with SwasthyaAI."}
            </p>
          </div>

          {/* Tabs */}
          <div className="tabs">
            {["login", "signup"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-btn ${activeTab === tab ? "active" : "inactive"}`}
              >
                {tab === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Success Banner */}
          {submitted && (
            <div className="success-banner">
              {submitted.type === "login"
                ? `✓ Logging in as ${submitted.email}…`
                : `✓ Account created for ${submitted.name}! Redirecting to login…`}
            </div>
          )}

          {/* Login Form */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="form-wrap">
              <Field label="Email Address" type="email" value={loginData.email}
                onChange={(v) => setLoginData({ ...loginData, email: v })} placeholder="you@example.com" />
              <Field label="Password" type="password" value={loginData.password}
                onChange={(v) => setLoginData({ ...loginData, password: v })} placeholder="••••••••" />
              <button type="submit" className="submit-btn">Log In</button>
            </form>
          )}

          {/* Signup Form */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignup} className="form-wrap">
              <Field label="Full Name" type="text" value={signupData.name}
                onChange={(v) => setSignupData({ ...signupData, name: v })} placeholder="Jane Doe" />
              <Field label="Email Address" type="email" value={signupData.email}
                onChange={(v) => setSignupData({ ...signupData, email: v })} placeholder="you@example.com" />
              <Field label="Password" type="password" value={signupData.password}
                onChange={(v) => setSignupData({ ...signupData, password: v })} placeholder="••••••••" />
              <button type="submit" className="submit-btn">Create Account</button>
            </form>
          )}

          <p className="footer-text">
            By continuing, you agree to our{" "}
            <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </>
  );
}

function Field({ label, type, value, onChange, placeholder }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="field-input"
      />
    </div>
  );
}