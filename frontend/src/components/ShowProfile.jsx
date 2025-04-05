import { useState } from "react"
import EditProfile from "./EditProfile";
import Profile from "./Profile";
function ShowProfile(){
    const [display,setDisplay] = useState("profile");
    return <>
    {display==="profile"? < Profile setDisplay={setDisplay}/>:<EditProfile setDisplay={setDisplay}/>}
    </>
}

export default ShowProfile