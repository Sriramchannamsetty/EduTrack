function SignUpData({ email, role, name, setRole }) {
    function handleRoleChange(newRole) {
        setRole(newRole);
    }

    return (
        <>
            <div className="mb-3">
                <input type="email" className="form-control" placeholder="Email" ref={email} required />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Full Name" ref={name} required />
            </div>

            {/* Role Switch */}
            <div className="role-switch-container">
                <label className="form-label d-block text-center">Role</label>
                <div className="switch-container">
                    <div className="switch-bg" style={{ transform: role === "student" ? "translateX(0%)" : "translateX(100%)" }} />
                    <button type="button" className={`switch-btn ${role === "student" ? "active" : ""}`} onClick={() => handleRoleChange("student")}>
                        Student
                    </button>
                    <button type="button" className={`switch-btn ${role === "teacher" ? "active" : ""}`} onClick={() => handleRoleChange("teacher")}>
                        Teacher
                    </button>
                </div>
            </div>
        </>
    );
}

export default SignUpData;
