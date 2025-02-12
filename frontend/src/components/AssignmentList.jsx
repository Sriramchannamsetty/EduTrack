import { useEffect,useContext,useState } from "react";
import { AuthUser } from "../../store/Auth-store";
import ReusableCard from "./ReusableCard";
function AssignmentList(){
    const { user } = useContext(AuthUser);
    const [assignments, setAssignments] = useState([]);
    let url = `http://localhost:5000/api/${user._id}/assignment`;
      useEffect(() => {
        const fetchAssigments = async () => {
          try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch courses");
            const data = await response.json();
            console.log(url,data);
            setAssignments(data);
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
                  doc={assignment.assignment}
                  role={user ? user.role : "student"}
                  isEnrolled={true}
                  onClick={() => view(assignment._id)}
                />
              </div>
            ))}
          </div>
        </div>
      );
}

export default AssignmentList;