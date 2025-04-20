import React, { useState } from 'react';
import "../css/FeatureCourses.css";
import child from "../images/child.png"; // Replace with actual image URL
import Group from "../images/Group.png"; // Replace with actual image URL
import { useNavigate } from "react-router-dom";

const courses = [
  {
    id:1,
    title: "Cloud Computing",
    duration: "5hr 30min",
    videos: "10 Videos",
    sales: "444 Sales",
    image: child, // Replace with actual image URL
    rating: 4.5,
    downloads: "444 sales"
  },
  {
    id:2,
    title: "Cyber Law",
    duration: "5hr 30min",
    videos: "10 Videos",
    sales: "444 Sales",
    image: child, // Replace with actual image URL
    rating: 4.5,
    downloads: "444 sales"
  },
  {
    title: "Cloud Computing",
    duration: "5hr 30min",
    videos: "10 Videos",
    sales: "444 Sales",
    image: child, // Replace with actual image URL
    rating: 4.5,
    downloads: "444 sales"
  },
  {
    title: "Jim Course",
    duration: "4hr 15min",
    videos: "8 Videos",
    sales: "300 Sales",
    image: child, // Replace with actual image URL
    rating: 4.0,
    downloads: "300 sales"
  },
  {
    title: "Data Science",
    duration: "6hr 45min",
    videos: "12 Videos",
    sales: "500 Sales",
    image: child, // Replace with actual image URL
    rating: 4.7,
    downloads: "500 sales"
  },
  {
    title: "Machine Learning",
    duration: "7hr 00min",
    videos: "15 Videos",
    sales: "600 Sales",
    image: child, // Replace with actual image URL
    rating: 4.8,
    downloads: "600 sales"
  }
];

export default function FeatureCourses() {
  const [showAll, setShowAll] = useState(false);
  const Image = Group; // Replace with actual image URL
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate("/training-courses");
  };
  const handleCardClick=(courseId)=>{
    navigate(`course/${courseId}`);
  };

  const visibleCourses = showAll ? courses : courses.slice(0, 3);

  return (
    <div className="feature-courses">
      <h2>Feature Courses</h2>
      <p>Learn at your own pace to make a greater difference for yourself.</p>
      <div className="course-container">
        {visibleCourses.map((course, index) => (
          <div key={index} className="course-card" onClick={()=>handleCardClick(course.id)}>
            {/* Course Image */}
            <img src={course.image} alt={course.title} className="course-image" />

            {/* Course Content */}
            <div className="course-content">
              {/* Title and Rating */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>{course.title}</h3>
                <div className="course-rating">{"⭐".repeat(Math.round(course.rating))}</div>
              </div>

              {/* Dotted Line Separator */}
              <div className="course-details">
                <p>⏱ {course.duration}</p>
                <p>🎥 {course.videos}</p>
                <p><img src={Image} alt="download icon" />  {course.downloads}</p>
              </div>

              {/* Join Button */}
              <button className="join-button">Join Course</button>
            </div>
          </div>
        ))}
      </div>

      {!showAll && (
        <button className="see-more-button" onClick={handleSeeMore}>
          See More...
        </button>
      )}
    </div>
  );
}