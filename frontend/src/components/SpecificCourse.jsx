import React, { useState, useEffect,useContext } from "react";
import { useLocation } from "react-router-dom";
import AssignmentList from "./AssignmentList";
import { AuthUser } from "../../store/Auth-store";
import { useNavigate } from "react-router";
const SpecificCourse = () => {
  const location = useLocation();
  const userId = location.state?.userId; // Get userId
  const courseId = location.state?.courseId; // Get courseId
  console.log(userId+" "+courseId);
  const [course, setCourse] = useState(null);
  const {user} = useContext(AuthUser);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourse = async () => {
      if (!userId || !courseId) return; // Ensure both IDs are available

      try {
        const response = await fetch(`http://localhost:5000/api/${userId}/course/${courseId}`);
        if (!response.ok) throw new Error("Failed to fetch course details");
        const data = await response.json();
        // console.log("looke here ->")
        // console.log(data.assignments);
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [userId, courseId]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <h4>Assignments</h4>
      { <AssignmentList assignmentArr={course.assignments} /> }
      { user&&user.role=="teacher"&&(<button className="btn btn-primary" onClick={()=> navigate("/assignment",{ state: { userId: user._id, courseId } })}>Create Assignment</button>)}
    </div>
  );
};

export default SpecificCourse;
