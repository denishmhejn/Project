import React from 'react';
import { useParams } from 'react-router-dom';
import { notesData } from '../Data/notesData';
import '../../css/Blogs/notesDetail.css';
import AdLayout from '../AdLayout';
import Navbar from '../navBar';
import Footer from '../Footer';

const NotesDetail = () => {
  const { id } = useParams();
  const notes = notesData.find(n => n.id === id);

  if (!notes) {
    return <div>Notes not found</div>;
  }

  const downloadNotes = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || fileUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Navbar />
      <AdLayout />
      <div className="notes-detail-container">
        <div className="main-content">
          <h1>{notes.title}</h1>
          <p className="course-description">{notes.description}</p>

          {notes.semesters.map((semester, semIndex) => (
            <div key={semIndex} className="semester-container">
              <h2>{semester.sem}</h2>
              <table className="notes-table">
                <thead>
                  <tr>
                    <th>SN</th>
                    <th>Course Name</th>
                    <th>Description</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {semester.courses.map((course, courseIndex) => (
                    <tr key={courseIndex}>
                      <td>{courseIndex + 1}</td>
                      <td>{course.name}</td>
                      <td>{course.notesDescription}</td>
                      <td>
                        {course.notesFile ? (
                          <button
                            className="download-btn"
                            onClick={() => downloadNotes(
                              course.notesFile,
                              `${course.name.replace(/\s+/g, '_')}.pdf`
                            )}
                          >
                            Download
                          </button>
                        ) : (
                          <span className="status-missing">Not Available</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotesDetail;