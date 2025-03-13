import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthUser } from "../../store/Auth-store";
import "./Profile.css"; // Import the CSS file
import placeholderImage from "../assets/profile.jpg"; // Importing the placeholder

function Profile() {
  const { user } = useContext(AuthUser);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card profile-card p-4 shadow-lg text-center">
        <div className="profile-img mx-auto">
          <img
            src={user.profileImage || placeholderImage} 
            alt="Profile"
            className="rounded-circle img-fluid"
          />
        </div>
        <h2 className="mt-3">{user.name}</h2>
        <p className="text-muted">@{user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> <span className="badge bg-primary">{user.role}</span></p>

        <button className="btn btn-primary mt-3 edit-btn">Edit Profile</button>
      </div>
    </div>
  );
}

export default Profile;
