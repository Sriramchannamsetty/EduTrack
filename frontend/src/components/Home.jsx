import { AuthUser } from "../../store/Auth-store";
import { useContext } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar"
function Home(){
    const {user} = useContext(AuthUser);
    console.log(user);
    return <>
        <Navbar />
        <div>
        <Sidebar />
        <h1>{user.username}</h1>
        </div>
        
    </>
}
export default Home;