import { useRef } from "react";
function SignUpData({email,role,name,setRole}){
    
    return <>
    <input type="text" placeholder="email" ref={email}/>
    <br />
    <input type="text" placeholder="name" ref={name}/>
    <br />
    <input type="radio" name="role"  id="teacher" value="teacher"checked={role === "teacher"} onChange={()=>{setRole("teacher")}}/>
    <label htmlFor="teacher">Teacher</label>
    <br />
    <input type="radio" name="role"  id="student" value="student" checked={role === "student"} onChange={()=>{setRole("student")}}/>
    <label htmlFor="student">Student</label>
    <br />
    </>
}
export default SignUpData;