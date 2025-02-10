import { useRef, useEffect, useState } from "react";
import "./FormComponent.css"; // Import the CSS file

function FormComponent({ fields, button, onSubmit, heading }) {
  const formRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); // Trigger animation when component loads
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = {};

    fields.forEach((field) => {
      if (formRef.current[field.name]) {
        formData[field.name] = formRef.current[field.name].value;
      }
    });

    onSubmit(formData);
  }

  return (
    <div className={`form-container ${animate ? "fade-in" : ""}`}>
      <h1 className="form-heading">{heading}</h1>
      <form onSubmit={handleSubmit} ref={formRef} className="form">
        {fields.map((field, idx) => (
          <div key={idx} className="form-group">
            {field.label && (
              <label htmlFor={field.name} className="form-label">
                {field.label}
              </label>
            )}
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              className="form-input"
              placeholder={field.placeholder ? field.placeholder : ""}
            />
          </div>
        ))}
        <button type="submit" className="form-button">
          {button}
        </button>
      </form>
    </div>
  );
}

export default FormComponent;
