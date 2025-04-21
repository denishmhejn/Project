import React, { useEffect, useState } from "react";
import "../../css/Training/CourseView.css";
import child from "../../images/child.png";
import Navbar from '../navBar';
import Footer from '../Footer';
import { useNavigate } from "react-router-dom";
import { fetchTrainings } from "../Services/apiService";

export default function CourseView() {
  const [courses, setCourses] = useState([]); // Fixed variable name (was 'course')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => { // Fixed typo in function name (was 'loadCouses')
      try {
        const response = await fetchTrainings();
        setCourses(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="training-courses">
          <div className="loading-message">Loading courses...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="training-courses">
          <div className="error-message">{error}</div>
        </div>
        <Footer />
      </>
    );
  }

  if (courses.length === 0) {
    return (
      <>
        <Navbar />
        <div className="training-courses">
          <div className="no-courses-message">No courses available at the moment.</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="training-courses">
        <div className="training-course-container">
          {courses.map((course) => (
            <div
              className="training-course-card"
              key={course.id}
              onClick={() => handleCourseClick(course.id)} // Fixed: wrapped in arrow function
            >
              <img 
                src={course.image || child} 
                alt={course.title} 
                className="training-course-image" // Fixed typo (was 'umage')
              />
              <div className="training-course-content">
                <div className="training-course-header">
                  <h3>{course.title}</h3>
                  <div className="training-course-rating">
                    {"⭐".repeat(Math.round(course.rating || 4))}
                  </div>
                </div>

                <div className="training-course-details">
                  <p>⏱ {course.duration || "N/A"}</p>
                  <p>🎥 {course.videos || "N/A"}</p>
                  <p>📊 {course.downloads || course.sales || "N/A"}</p>
                </div>

                <button 
                  className="training-join-button" 
                  onClick={(e) => e.stopPropagation()}
                >
                  Join Course
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}