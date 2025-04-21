import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../css/Blogs/notesDetail.css';
import AdLayout from '../AdLayout';
import Navbar from '../navBar';
import Footer from '../Footer';
import { fetchNoteById } from '../Services/apiService';

const NotesDetail = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        const response = await fetchNoteById(id);
        const noteData = response.data;
        
        // Transform API data to match your expected format
        const formattedNote = {
          id: noteData._id || noteData.id,
          title: noteData.title || 'Untitled Notes',
          description: noteData.description || 'No description available',
          semesters: noteData.semesters?.map(semester => ({
            sem: semester.semesterName || `Semester ${semester.semesterNumber}`,
            courses: semester.courses?.map(course => ({
              name: course.courseName || 'Unnamed Course',
              notesDescription: course.description || 'No description available',
              notesFile: course.fileUrl || null
            })) || []
          })) || []
        };
        
        setNote(formattedNote);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch note:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNoteData();
  }, [id]);

  const downloadNotes = (fileUrl, fileName) => {
    if (!fileUrl) return;
    
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || fileUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="notes-detail-container">Loading notes...</div>;
  if (error) return <div className="notes-detail-container">Error: {error}</div>;
  if (!note) return <div className="notes-detail-container">Notes not found</div>;

  return (
    <>
      <Navbar />
      <AdLayout />
      <div className="notes-detail-container">
        <div className="main-content">
          <h1>{note.title}</h1>
          <p className="course-description">{note.description}</p>

          {note.semesters.map((semester, semIndex) => (
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