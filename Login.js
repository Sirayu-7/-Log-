import React, { useState } from "react";
import { supabase } from "./supabaseClient"; // สังเกต .. เพื่อถอยหลังไปหา lib
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    const { error } = isRegister
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) alert(error.message);
    else navigate("/dashboard");
  };

  return (
    <div className="auth-box">
      <h2>{isRegister ? "Register" : "System Login"}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn">{isRegister ? "Sign Up" : "Sign In"}</button>
      </form>
      <p
        style={{
          fontSize: "0.9rem",
          cursor: "pointer",
          color: "#2563eb",
          marginTop: "10px",
        }}
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister ? "Back to Login" : "Create an Account"}
      </p>
    </div>
  );
}
