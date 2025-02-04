import React, { useState } from "react";
import "./App.css";

function App() {
  const [isSignIn, setIsSignIn] = useState(true);

  const togglePanels = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="container">
      <div className={toggle-section ${isSignIn ? "" : "active"}}>
        <div className="left-panel">
          <h2>Welcome Back!</h2>
          <p>To keep connected with us, please login with your personal info.</p>
          <button onClick={togglePanels}>SIGN IN</button>
        </div>
        <div className="right-panel">
          <h2>Hello Friend!</h2>
          <p>Enter your personal details and start your journey with us.</p>
          <button onClick={togglePanels}>SIGN UP</button>
        </div>
      </div>
      <div className={form-section ${isSignIn ? "active" : "hidden"}}>
        <h2>Sign In</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">SIGN IN</button>
        </form>
      </div>
      <div className={form-section ${isSignIn ? "hidden" : "active"}}>
        <h2>Create Account</h2>
        <form>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">SIGN UP</button>
        </form>
      </div>
    </div>
  );
}

export default App;
