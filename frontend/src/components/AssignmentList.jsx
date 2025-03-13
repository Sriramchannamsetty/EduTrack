import { useEffect,useContext,useState } from "react";
import { AuthUser } from "../../store/Auth-store";
import ReusableCard from "./ReusableCard";
import { useNavigate } from "react-router";
function AssignmentList({assignmentArr}){
    const { user } = useContext(AuthUser);
    const [assignments, setAssignments] = useState([]);
    const navigate = useNavigate();
    const courseId = location.state?.courseId;
    let url = `http://localhost:5000/api/${user._id}/assignment`;
    let urlCourse = `http://localhost:5000/api/${user._id}/assignment`;
      useEffect(() => {
        const fetchAssigments = async () => {
          try {
            if(assignmentArr){
              setAssignments(assignmentArr);
            }
            else{
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch courses");
            const data = await response.json();
            console.log(assignmentArr);
            console.log(data);
            setAssignments(data);
            }
            
          } catch (error) {
            console.error("Error fetching courses:", error);
          }
        };
    
        fetchAssigments();
      }, [user,url]);
    
    return (
        <div className="container mt-5">
          <h2 className="mb-4">Assignments</h2>
          <div className="row">
            {assignments.map((assignment, index) => (
              <div className="col-md-4" key={assignment._id || index}>
               
                <ReusableCard
                  type="assignment"
                  doc={assignmentArr?assignment:assignment.assignment}
                  role={user ? user.role : "student"}
                  isEnrolled={true}
                  onClick={() => navigate("/specific-assignment",{ state: { userId: user._id, courseId } })}
                />
              </div>
            ))}
          </div>
        </div>
      );
}

export default AssignmentList;