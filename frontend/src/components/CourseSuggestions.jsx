import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";

const CourseSuggestions = ({ query, onSelect }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(`/api/courses/suggestions?search=${query}`);
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [query]);

  return (
    <ListGroup className="suggestions-list">
      {suggestions.map((item) => (
        <ListGroup.Item key={item._id} action onClick={() => onSelect(item.title)}>
          {item.title}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CourseSuggestions;
