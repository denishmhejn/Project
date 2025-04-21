import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/Training/CourseDetails.css";
import Footer from "../Footer";
import Navbar from "../navBar";
import { fetchTrainingById, createEnrollment } from "../Services/apiService";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    courseId: courseId
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('authToken') || localStorage.getItem('token');

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetchTrainingById(courseId);
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
        console.error("Error fetching course:", err);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    return errors;
  };

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await createEnrollment(formData);
      setSubmitStatus('success');
      setTimeout(() => {
        setShowEnrollForm(false);
        setSubmitStatus(null);
      }, 2000);
    } catch (err) {
      setSubmitStatus('error');
      console.error("Enrollment error:", err);
    }
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    // Handle enquiry form submission
    setSubmitStatus('success');
    setTimeout(() => {
      setShowEnquiryForm(false);
      setSubmitStatus(null);
    }, 2000);
  };

  const handleEnrollClick = () => {
    if (!isLoggedIn) {
      setActiveForm('enroll');
      setShowLoginPrompt(true);
      return;
    }
    setShowEnrollForm(true);
    setFormData({
      ...formData,
      courseId: courseId
    });
  };

  const handleEnquiryClick = () => {
    if (!isLoggedIn) {
      setActiveForm('enquiry');
      setShowLoginPrompt(true);
      return;
    }
    setShowEnquiryForm(true);
  };

  const handleNavigateToLogin = () => {
    navigate('/Login', { state: { from: `/course/${courseId}` } });
    setShowLoginPrompt(false);
  };

  const closeAllModals = () => {
    setShowEnquiryForm(false);
    setShowEnrollForm(false);
    setShowLoginPrompt(false);
    setFormErrors({});
    setSubmitStatus(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading course details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="not-found-container">
        <p>Course not found</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div>
        {/* UI/UX Training Section */}
        <div className="trainings-container">
          <div className="trainings-content">
            {/* Left Section */}
            <div className="trainings-text">
              <h2>{course.title}</h2>
              <div className="trainings-info">
                <span>📅 {course.duration || 'N/A'}</span>
                <span>🎨 {course.category || 'General'}</span>
                <span>🔗 Share with your Friends</span>
              </div>
              <p>{course.description || 'Training Mode: Both Physical & Live Online Classes, including Online Live Night Classes'}</p>
              <p>{course.location || 'Online Course'}</p>
              <div className="trainings-buttons">
                <button className="enroll-btn" onClick={handleEnrollClick}>Enroll Now</button>
                <button className="enquiry-btn" onClick={handleEnquiryClick}>Send Enquiry</button>
              </div>
            </div>

            {/* Right Section - Image */}
            <div className="trainings-image">
              <img 
                src={course.imageUrl || '/default-course.png'} 
                alt={course.title} 
                onError={(e) => {
                  e.target.src = '/default-course.png';
                }}
              />
            </div>
          </div>
        </div>

        {/* Navbar for Course Sections */}
        <nav className="trainings-course-navbar">
          <ul>
            <li><a href="#overview">Course Overview</a></li>
            <li><a href="#benefits">Course Benefits</a></li>
            <li><a href="#syllabus">Syllabus</a></li>
            <li><a href="#success">Success Stories</a></li>
          </ul>
        </nav>

        {/* Course Overview Section */}
        <div className="trainings-course-container">
          <div className="trainings-course-content">
            {/* Left Section - Course Overview and Benefits */}
            <div className="trainings-course-text">
              <h2 id="overview">Course Overview</h2>
              <h3>{course.title}</h3>
              <p>
                {course.overview || 'This course offers comprehensive training to help you develop essential skills.'}
              </p>

              <h2 id="benefits">Benefits</h2>
              <h3>Benefits of {course.title}</h3>
              <ul>
                {course.benefits?.length > 0 ? (
                  course.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))
                ) : (
                  <>
                    <li>Understand fundamental principles</li>
                    <li>Learn key tools and techniques</li>
                    <li>Develop practical skills</li>
                    <li>Career opportunities in the field</li>
                  </>
                )}
              </ul>
            </div>

            {/* Right Section - Ad Display */}
            <div className="course-ads">
              <div className="ad-box">Ad Display</div>
              <div className="ad-box">Ad Display</div>
              <div className="ad-box">Ad Display</div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Prompt Modal */}
      <div className={`modal-overlay ${showLoginPrompt ? 'show-form' : ''}`}>
        <div className="modal-content">
          <div className="login-prompt">
            <h2>Please Login First</h2>
            <p>You need to be logged in to {activeForm === 'enroll' ? 'enroll in this course' : 'send an enquiry'}</p>
            <div className="button-group">
              <button className="login-redirect-btn" onClick={handleNavigateToLogin}>
                Go to Login Page
              </button>
              <button className="close-button" onClick={closeAllModals}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enroll Form Modal */}
      <div className={`modal-overlay ${showEnrollForm ? "show-form" : ""}`}>
        <div className="modal-content">
          <h2>Enroll in {course.title}</h2>
          {submitStatus === 'success' ? (
            <div className="success-message">
              <p>Enrollment successful! We'll contact you shortly.</p>
            </div>
          ) : submitStatus === 'error' ? (
            <div className="error-message">
              <p>Error submitting enrollment. Please try again.</p>
            </div>
          ) : (
            <form onSubmit={handleEnrollSubmit}>
              <div className="form-group">
                <label>
                  Full Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.name && <span className="error">{formErrors.name}</span>}
                </label>
              </div>
              <div className="form-group">
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.email && <span className="error">{formErrors.email}</span>}
                </label>
              </div>
              <div className="form-group">
                <label>
                  Phone Number:
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.phone && <span className="error">{formErrors.phone}</span>}
                </label>
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Submit Enrollment
                </button>
                <button type="button" className="cancel-btn" onClick={closeAllModals}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Enquiry Form Modal */}
      <div className={`modal-overlay ${showEnquiryForm ? "show-form" : ""}`}>
        <div className="modal-content">
          <h2>Send Enquiry About {course.title}</h2>
          {submitStatus === 'success' ? (
            <div className="success-message">
              <p>Enquiry sent successfully! We'll contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleEnquirySubmit}>
              <div className="form-group">
                <label>
                  Full Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Message:
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Send Enquiry
                </button>
                <button type="button" className="cancel-btn" onClick={closeAllModals}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseDetails;