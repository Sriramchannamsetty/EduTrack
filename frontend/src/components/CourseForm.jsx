import FormComponent from "./FormComponent"
import { useContext } from "react";
import { AuthUser } from "../../store/Auth-store";
function CourseForm(){
    const {user} = useContext(AuthUser);
    async function onSubmit(formData){
        console.log(formData);
        const res = await fetch(`http://localhost:5000/api/${user._id}/course/new`,{
            method : "POST",
            body : JSON.stringify(formData),
            headers: { "Content-Type": "application/json; charset=utf-8" },
        })

    }
    const fields = [{name:"title",type:"input",label:"title"},{name:"description",type:"text",label:"description"},{name:"passkey",type:"text",label:"passkey"}];
    return <>
    <FormComponent fields = {fields} button = {"Create Course"} heading ={"Create New Course"} onSubmit={onSubmit}/>
    </>
}
export default CourseForm