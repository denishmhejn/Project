import React, { useEffect, useState } from 'react';
import "../css/FeatureCourses.css";
import child from "../images/child.png"; // Replace with actual image URL
import Group from "../images/Group.png"; // Replace with actual image URL
import { useNavigate } from "react-router-dom";
import { fetchTrainings } from './Services/apiService';

export default function FeatureCourses(){
  const [showAll, setShowAll] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Image = Group;
  const navigate = useNavigate();

  useEffect(()=>{
    const getCourses=async()=>{
      try{
        const response=await fetchTrainings();

        const formattedCourses= response.data.map(course=>({
          id: course._id,
          title: course.title || 'Untitled Course',
          duration: course.duration || '0hr 0min',
          videos: course.videosCount ? `${course.videosCount} Videos` : '0 Videos',
          sales: course.enrollments ? `${course.enrollments} Sales` : '0 Sales',
          image: course.imageUrl || child, // Use default image if none provided
          rating: course.rating || 0,
          downloads: course.enrollments ? `${course.enrollments} sales` : '0 sales'
        }));
        setCourses(formattedCourses);
      }catch(err){
        setError(err.message);
        console.error('Failed to fetch Courses', err);
      }finally{
        setLoading(false);
      }
    };
    getCourses();
  },[]);
  const handleSeeMore = () => {
    navigate("/training-courses");
  };

  const handleCardClick = (courseId) => {
    navigate(`course/${courseId}`);
  };

  const visibleCourses = showAll ? courses : courses.slice(0, 3);

  if (loading) return <div className="feature-courses">Loading courses...</div>;
  if (error) return <div className="feature-courses">Error loading courses: {error}</div>;
  
  return(
    <div className="feature-courses">
      <h2>feature Courses</h2>
      <p>Learn at your own pace to make a greater difference for yourself.</p>
      <div className="course-container">
        {visibleCourses.map((course,index)=>(
          <div key={index} className="course-card" onClick={()=>handleCardClick(course.id)}>
            <img src={course.image} alt={course.title} className="course-image" />

            <div className="course-content">
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h3>{course.title}</h3>
                <div className="course-rating">{"⭐".repeat(Math.round(course.rating))}</div>
              </div>

              <div className="course-details">
              <p>⏱ {course.duration}</p>
                <p>🎥 {course.videos}</p>
                <p><img src={Image} alt="download icon" />  {course.downloads}</p>
              </div>

              <button className="join-button">Join Course</button>
            </div>
          </div>
        ))}
      </div>
      {!showAll && courses.length>3 &&(
        <button className="see-more-button" onClick={handleSeeMore}>See More...</button>
      )}
    </div>
  );
}