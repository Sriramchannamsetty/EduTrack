import { AuthUser } from "../../store/Auth-store";
import { useContext } from "react";
import Navbar from "./Navbar";
function Home(){
    const {user} = useContext(AuthUser);
    console.log(user);
    return <>
        <Navbar />
        <h1>{user.username}</h1>
    </>
}
export default Home;