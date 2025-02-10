import { useRef, useState,useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AuthForm.css"; // Unified CSS file
import { useNavigate } from "react-router";
import SignUpData from "./SignUpData";
import { AuthUser } from "../../store/Auth-store";
function AuthForm({heading}) {
    const navigate=useNavigate();
    const [role, setRole] = useState("student");
    const username = useRef("");
    const password = useRef("");
    const email = useRef("");
    const name = useRef("");
    const {setUser} = useContext(AuthUser);

    async function handleSubmit(event) {
        event.preventDefault();

        let endpoint = heading === "Sign Up" ? "signup" : "login";
        let endpointObj =
            heading === "Sign Up"
                ? {
                      username: username.current.value,
                      password: password.current.value,
                      email: email.current.value,
                      name: name.current.value,
                      role: role,
                  }
                : {
                      username: username.current.value,
                      password: password.current.value,
                  };

        try {
            const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
                method: "POST",
                body: JSON.stringify(endpointObj),
                headers: { "Content-Type": "application/json; charset=utf-8" },
            });

            const data = await res.json();
            console.log("Response:", data);
            setUser(data); //context api
            navigate('/home')
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="auth-card shadow-lg p-4">
                {/* Form Heading */}
                <h2 className="text-center text-primary mb-3">{heading} Form</h2>

                {/* Login/Signup Switch */}
                <div className="switch-container">
                    <div className="switch-bg" style={{ transform: heading === "Sign Up" ? "translateX(0%)" : "translateX(100%)" }} />
                    <button type="button" className={`switch-btn ${heading === "Sign Up" ? "active" : ""}`} onClick={() =>  navigate("/signup")}>
                        Sign Up
                    </button>
                    <button type="button" className={`switch-btn ${heading === "Login" ? "active" : ""}`} onClick={() =>  navigate("/login")}>
                        Login
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Username" ref={username} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Password" ref={password} required />
                    </div>
                    {heading === "Sign Up" && <SignUpData email={email} role={role} name={name} setRole={setRole} />}
                    <button className="btn btn-primary w-100 btn-lg fw-bold mt-3">{heading}</button>
                </form>
            </div>
        </div>
    );
}

export default AuthForm;
