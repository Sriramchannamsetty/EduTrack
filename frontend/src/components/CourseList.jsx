import React, { useState, useEffect } from "react";
import ReusableCard from "./ReusableCard";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses"); // API Endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Courses</h2>
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4" key={course._id}>
            <ReusableCard
              title={course.title}
              description={course.description}
              type="course"
              onClick={() => console.log(`Viewing course: ${course.title}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
