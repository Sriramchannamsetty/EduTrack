import React, { useState, useEffect,useContext } from "react";
import { useLocation } from "react-router-dom";
import AssignmentList from "./AssignmentList";
import { AuthUser } from "../../store/Auth-store";
import { useNavigate } from "react-router";
const SpecificCourse = () => {
  const location = useLocation();
  const userId = location.state?.userId; // Get userId
  const courseId = location.state?.courseId; // Get courseId
  const [course, setCourse] = useState(null);
  const {user,getMe} = useContext(AuthUser);
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

  const leaveCourse = async () => {
    if (!userId || !courseId) return;

    try {
        const res = await fetch(`http://localhost:5000/api/${userId}/course/${courseId}/leave`, {
            method: "DELETE",
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Failed to leave course");
        }

        console.log("Successfully left the course");
         await getMe();
        // Ensure this runs after fetch completes
        navigate("/home", { state: { userId, courseId } });

    } catch (error) {
        console.error("Error leaving course:", error.message);
    }
};



  if (!course) return <div>Loading...</div>;
  return (
    <div className="container mt-5">
      {/* Top-right Leave Course Button */}
      {user && user.role === "student" && (
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-outline-danger" onClick={leaveCourse}>
            <i className="bi bi-box-arrow-right me-2"></i>Leave Course
          </button>
        </div>
      )}
  
     {/* Course Info Section */}
<div className="card shadow-lg border-0 mb-4">
  <div className="row g-0">
    {/* Left - Title and Description */}
    <div className="col-md-8 p-4">
      <h2 className="text-center mb-4">{course.title}</h2>

      <div>
        <h5 className="fw-semibold" style={{ color: "#6610f2" }}>Description</h5>
        <p className="mt-2">{course.description}</p>
      </div>
    </div>

    {/* Right - Image */}
    <div className="col-md-4">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIBMT5P_VnXmhsFcKgM25bCScyEEi7SGSCZA&s"
        alt="Course"
        className="img-fluid rounded-end w-100 h-100"
        style={{ objectFit: "cover" }}
      />
    </div>
  </div>
</div>


  
      {/* Instructor Section */}
      <div className="card mb-4 shadow-sm border-0">
        <div className="card-body">
          <h4 className="text-primary mb-3">
            <i className="bi bi-person-circle me-2"></i>Instructor
          </h4>
          <p className="mb-1"><strong>Name:</strong> {course.teacher.name}</p>
          <p className="mb-0"><strong>Email:</strong> {course.teacher.email}</p>
        </div>
      </div>
  
      {/* Assignments Section */}
      <div className="card mb-4 shadow-sm border-0">
        <div className="card-body">
          {/* Only show button row if teacher */}
          {user && user.role === "teacher" && (
            <div className="d-flex justify-content-end mb-3">
              <button
                className="btn btn-primary"
                onClick={() =>
                  navigate("/assignment", {
                    state: { userId: user._id, courseId },
                  })
                }
              >
                <i className="bi bi-plus-circle me-2"></i>Create Assignment
              </button>
            </div>
          )}
  
          <AssignmentList assignmentArr={course.assignments} />
        </div>
      </div>
  
      {/* Students Section */}
      <div className="card mb-5 shadow-sm border-0">
        <div className="card-body">
          <h4 className="text-info mb-3">
            <i className="bi bi-people-fill me-2"></i>Enrolled Students
          </h4>
          {course.students.length > 0 ? (
            <ul className="list-group list-group-flush">
              {course.students.map((student, idx) => (
                <li
                  key={idx}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{student.name}</span>
                  <small className="text-muted">{student.email}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No students enrolled yet.</p>
          )}
        </div>
      </div>
    </div>
  );
  

};

export default SpecificCourse;
