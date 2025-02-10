import FormComponent from "./FormComponent"
import { useContext } from "react";
import { AuthUser } from "../../store/Auth-store";
function AssignmentForm(){
    const {user} = useContext(AuthUser);
    async function onSubmit(formData){
        console.log(formData);
        const res = await fetch(`http://localhost:5000/api/${user._id}/course/new`,{
            method : "POST",
            body : JSON.stringify(formData),
            headers: { "Content-Type": "application/json; charset=utf-8" },
        })

    }
    const fields = [{name:"title",type:"input",label:"title"},{name:"description",type:"text",label:"description"},{name:"points",type:"text",label:"points"},{name:"dueDate",type:"date",label:"dueDate"}];
    return <>
    <FormComponent fields = {fields} button = {"Create Course"}/>
    </>
}
export default AssignmentForm