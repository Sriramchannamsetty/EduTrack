import { useRef, useState } from "react";
import SignUpData from "./SignUpData";

function AuthForm(){
    const [heading,setHeading] = useState("Sign Up");
    const [role, setRole] = useState("student");
    const username = useRef("");
    const password = useRef("");
    const email = useRef("");
    const name = useRef("");
    function toggleHeading(){
        setHeading((prev)=>{
            return prev==="Sign Up"? "Login":"Sign Up";
        });
    }
    async function handleSubmit(event){
        event.preventDefault();
        //console.log(event);
        let endpoint =  heading==="Sign Up"?"signup":"login";
        let endpointObj=heading==="Sign Up"?{username,password,email,name,role}:{username,password};
        
        console.log(email.current.value);
        console.log(role);
        const res = await fetch(`http://localhost:8080/api/auth/${endpoint}`,{
            method:"POST",
            body : JSON.stringify(endpointObj),
            header : {"Content-Type":"application/json; charset=utf-8"},

        });

        console.log(res);
    }
    return <>
    <h1>{heading}</h1>
    <button onClick={toggleHeading}>Login</button>
    <button onClick={toggleHeading}>Sign Up</button>
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={username}/>
        <br />
        <input type="password" placeholder="password" ref={password}/>
        <br />
        {(heading==="Sign Up")&&<SignUpData email={email} role={role} name={name} setRole={setRole} />}
        <button >{heading}</button>
    </form>
    </>
}

export default AuthForm;