import React, { useState, useEffect, useContext } from "react";
import ReusableCard from "./ReusableCard";
import { AuthUser } from "../../store/Auth-store";
import { useLocation, useNavigate } from "react-router";

const CourseList = ({ type }) => {
  const location = useLocation();
  const query= location.state?.searchQuery|| "";
  console.log(`queryb is ${query}`);
  const { user } = useContext(AuthUser);
  const navigate = useNavigate();

  let url = `http://localhost:5000/api/courses?search=${query}`;
  if (user) url = `http://localhost:5000/api/${user._id}/course/all?search=${query}`;
  if (type === "searched") url = `http://localhost:5000/api/courses?search=${query}`;

  const [courses, setCourses] = useState([]);
  console.log(url);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [type, user,url]);

  const view = (courseId) => {
    console.log(courseId);
    if (!user) return; // Ensure user is logged in
    navigate("/specific", { state: { userId: user._id, courseId } }); // Pass userId and courseId
  };
  const join=(courseId)=>{
      if(!user)return;
      navigate("/join",{state:{userId:user._id,courseId}});
  }
   
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Courses</h2>
      <div className="row">
        {courses.map((course, index) => (
          <div className="col-md-4" key={course._id || index}>
           
            <ReusableCard
              type="course"
              doc={course}
              role={user ? user.role : "student"}
              isEnrolled={user?.courses?.some((c) => String(c.course) == String(course._id))}
              onClick={() => view(course._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
