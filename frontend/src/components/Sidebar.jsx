import { useState, useContext } from "react";
import { AuthUser } from "../../store/Auth-store";

function Sidebar() {
    const { user } = useContext(AuthUser);
    const [selectedCourse, setSelectedCourse] = useState(null);

    if (!user) return <p>Loading...</p>; // Show loading if user data isn't available

    return (
        <div className="d-flex flex-column p-3 bg-light" style={{ width: "250px", height: "100vh" }}>
            <div className="text-center">
                <img 
                    src={user.profileImage || "default-avatar.png"} 
                    alt="Profile" 
                    className="rounded-circle" 
                    width="80" 
                    height="80"
                />
                <h5 className="mt-2">{user.name}</h5>
                <p className="text-muted">{user.role}</p>
            </div>

            <hr />

            <h6>Enrolled Courses</h6>
            <ul className="list-group">
                {user.courses.map((c) => (
                    <li 
                        key={c.course._id} 
                        className="list-group-item list-group-item-action"
                        onClick={() => setSelectedCourse(c.course._id)}
                        style={{ cursor: "pointer" }}
                    >
                        {c.course.name}
                    </li>
                ))}
            </ul>

            {selectedCourse && (
                <>
                    <hr />
                    <h6>Assignments</h6>
                    <ul className="list-group">
                        {user.assignments
                            .filter(a => a.assignment.course === selectedCourse)
                            .map((a) => (
                                <li key={a.assignment._id} className="list-group-item">
                                    {a.assignment.title} {a.submitted ? "✅" : "❌"}
                                </li>
                            ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default Sidebar;
