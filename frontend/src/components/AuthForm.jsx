import { useRef, useState } from "react";
import SignUpData from "./SignUpData";

function AuthForm() {
    const [heading, setHeading] = useState("Sign Up");
    const [role, setRole] = useState("student");
    const username = useRef("");
    const password = useRef("");
    const email = useRef("");
    const name = useRef("");

    function toggleHeading() {
        setHeading((prev) => (prev === "Sign Up" ? "Login" : "Sign Up"));
    }

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

        // console.log("Email:", username.current.value);
        // console.log("Role:", role);

        try {
            const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
                method: "POST",
                body: JSON.stringify(endpointObj),
                headers: { "Content-Type": "application/json; charset=utf-8" },
            });

            const data = await res.json();
            console.log("Response:", data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    return (
        <>
            <h1>{heading}</h1>
            <button onClick={toggleHeading}>Login</button>
            <button onClick={toggleHeading}>Sign Up</button>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={username} />
                <br />
                <input type="password" placeholder="password" ref={password} />
                <br />
                {heading === "Sign Up" && <SignUpData email={email} role={role} name={name} setRole={setRole} />}
                <button>{heading}</button>
            </form>
        </>
    );
}

export default AuthForm;
