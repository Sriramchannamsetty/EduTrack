import FormComponent from "./FormComponent"
import { useContext } from "react";
import { AuthUser } from "../../store/Auth-store";
import { useLocation } from "react-router-dom";
function AssignmentForm(){
    const location = useLocation();
    //const {user} = useContext(AuthUser);
    const courseId = location.state?.courseId; // Get courseId
    const userId = location.state?.userId; // Get userId
    console.log("courseID is "+courseId);
    async function onSubmit(formData){
        console.log(formData);
        const res = await fetch(`http://localhost:5000/api/${userId}/course/${courseId}/assignment/new`,{
            method : "POST",
            body : JSON.stringify(formData),
            headers: { "Content-Type": "application/json; charset=utf-8" },
        })
        console.log(res);

    }
    const fields = [{name:"title",type:"input",label:"title"},{name:"description",type:"text",label:"description"},{name:"points",type:"text",label:"points"},{name:"dueDate",type:"date",label:"dueDate"}];
    return <>
    <FormComponent fields = {fields} button = {"Create Assignment"} onSubmit={onSubmit} heading={"create new Assignment"}/>
    </>
}
export default AssignmentForm