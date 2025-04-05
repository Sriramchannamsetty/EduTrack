import { useContext, useRef } from "react";
import { AuthUser } from "../../store/Auth-store";

function EditProfile({ setDisplay }) {
  const nameRef = useRef();
  const profileImageRef = useRef();
  const { user, getMe } = useContext(AuthUser);

  async function handleSubmit(event) {
    event.preventDefault();

    const name = nameRef.current.value;
    const profileImage = profileImageRef.current.value;

    const updates = { name, profileImage };

    try {
      const res = await fetch(`http://localhost:5000/api/auth/getMe/${user._id}/`, {
        method: "PUT",
        body: JSON.stringify(updates),
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error updating profile:", errorData);
        return;
      }

      await getMe();
      console.log("Profile updated successfully");
      setDisplay("profile");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="container mt-5 animate-fade-in">
      <div className="card shadow-lg p-4 border-0 rounded-4 bg-light animate-slide-up">
        <h2 className="text-center mb-4 text-primary fw-bold">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">Name</label>
            <input
              type="text"
              id="name"
              ref={nameRef}
              defaultValue={user.name}
              className="form-control"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="profileImage" className="form-label fw-semibold">Profile Image URL</label>
            <input
              type="text"
              id="profileImage"
              ref={profileImageRef}
              defaultValue={user.profileImage}
              className="form-control"
              placeholder="Enter image URL"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold shadow-sm animate-pulse">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
