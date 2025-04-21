import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/CollegeDetails.css";
import Navbar from "../navBar";
import AdLayout from "../AdLayout";
import Footer from "../Footer";
import { fetchCollegeById, createAdmission } from "../Services/apiService";

const CollegeDetails = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    program: "",
    collegeId: id
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('authToken') || localStorage.getItem('token');

  useEffect(() => {
    const loadCollegeDetails = async () => {
      try {
        const response = await fetchCollegeById(id);
        setCollege(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    loadCollegeDetails();
  }, [id]);

  const handleApplyClick = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    setShowForm(true);
    // Set default program if available
    if (college?.programs?.length > 0) {
      setFormData(prev => ({
        ...prev,
        program: college.programs[0].name
      }));
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/Login', { state: { from: `/college/${id}` } });
    setShowLoginPrompt(false);
  };

  const closeAllModals = () => {
    setShowForm(false);
    setShowLoginPrompt(false);
    setFormErrors({});
    setSubmitStatus(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.contact.trim()) errors.contact = "Contact number is required";
    if (!formData.program.trim()) errors.program = "Program selection is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setSubmitStatus('submitting');
      await createAdmission(formData);
      setSubmitStatus('success');
      // Reset form after successful submission
      setTimeout(() => {
        closeAllModals();
        setFormData({
          fullName: "",
          email: "",
          contact: "",
          program: "",
          collegeId: id
        });
      }, 2000);
    } catch (err) {
      console.error("Admission error:", err);
      setSubmitStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading College details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="not-found-container">
        <p>College not found</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <AdLayout />
      <div className="college-details-container">
        <div className="college-header">
          <img 
            src={college.imageUrl || "/default-college.png"}
            alt={college.name}
            className="college-image"
            onError={(e) => { e.target.src = "/default-college.png"; }}
          />
          <h1>{college.name}</h1>
          <p>{college.university}</p>
          <p>{college.location || college.address}</p>
          <a 
            href={college.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="website-link"
          >
            {college.website}
          </a>
        </div>

        <div className="college-content">
          {college.description && (
            <>
              <h2>About the College</h2>
              <p>{college.description}</p>
            </>
          )}

          {college.programs?.length > 0 && (
            <>
              <h2>Offered Programs</h2>
              <ul className="programs-list">
                {college.programs.map((program, index) => (
                  <li key={index}>
                    <strong>{program.name}</strong>
                    {program.seats && ` - ${program.seats} Seats`}
                    {program.duration && ` (${program.duration})`}
                    {program.description && <p>{program.description}</p>}
                  </li>
                ))}
              </ul>
            </>
          )}

          {college.features?.length > 0 && (
            <>
              <h2>Key Features</h2>
              <ul className="features-list">
                {college.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </>
          )}

          {college.facilities && (
            <>
              <h2>Facilities</h2>
              <p>{college.facilities}</p>
            </>
          )}

          {college.admissionProcess && (
            <>
              <h2>Admission Process</h2>
              <p>{college.admissionProcess}</p>
            </>
          )}
        </div>

        <button className="apply-button" onClick={handleApplyClick}>
          Apply Now
        </button>

        {/* Application Form Modal */}
        <div className={`modal-overlay ${showForm ? 'show-form' : ''}`}>
          <div className="modal-content">
            <h2>Application Form</h2>
            
            {submitStatus === 'success' ? (
              <div className="success-message">
                <p>Application submitted successfully!</p>
                <p>We will contact you shortly.</p>
              </div>
            ) : submitStatus === 'error' ? (
              <div className="error-message">
                <p>Error submitting application. Please try again.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>
                    Full Name:
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className={formErrors.fullName ? 'error' : ''}
                    />
                    {formErrors.fullName && <span className="error-message">{formErrors.fullName}</span>}
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
                      className={formErrors.email ? 'error' : ''}
                    />
                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    Contact Number:
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      required
                      className={formErrors.contact ? 'error' : ''}
                    />
                    {formErrors.contact && <span className="error-message">{formErrors.contact}</span>}
                  </label>
                </div>

                {college.programs?.length > 0 && (
                  <div className="form-group">
                    <label>
                      Program:
                      <select
                        name="program"
                        value={formData.program}
                        onChange={handleInputChange}
                        required
                        className={formErrors.program ? 'error' : ''}
                      >
                        {college.programs.map((program, index) => (
                          <option key={index} value={program.name}>
                            {program.name}
                          </option>
                        ))}
                      </select>
                      {formErrors.program && <span className="error-message">{formErrors.program}</span>}
                    </label>
                  </div>
                )}

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={submitStatus === 'submitting'}
                  >
                    {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
                  </button>
                  <button 
                    type="button" 
                    className="cancel-btn" 
                    onClick={closeAllModals}
                    disabled={submitStatus === 'submitting'}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Login Prompt Modal */}
        <div className={`modal-overlay ${showLoginPrompt ? 'show-form' : ''}`}>
          <div className="modal-content">
            <div className="login-prompt">
              <h2>Login Required</h2>
              <p>You need to be logged in to access the application form.</p>
              <div className="prompt-actions">
                <button className="primary-btn" onClick={handleNavigateToLogin}>
                  Go to Login
                </button>
                <button className="secondary-btn" onClick={closeAllModals}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdLayout />
      <Footer />
    </>
  );
};

export default CollegeDetails;