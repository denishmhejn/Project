import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import "../../css/Blogs/notes.css";
import bca from "../../images/bca.png";
import Navbar from "../navBar";
import AdLayout from "../AdLayout";
import Footer from "../Footer";
import { fetchNotes } from "../Services/apiService";

const Notescard=({note, navigate})=>{
  const handleClick=()=>{
    navigate (`/notes/${note.id}`);
  };
  return(
    <div className="note-card" onClick={handleClick}>
        <img 
        src={note.imageUrl || "/default-note.png"} 
        alt={note.title} 
        className="note-image"
        onError={(e) => {
          e.target.src = "/default-note.png";
        }}
      />
      <div className="note-details">
      {note.seats && <span>{note.seats}</span>}
      {note.duration && <span>{note.duration}</span>}
      </div>
      <div className="note-info">
        <h2 className="note-title">{note.title}</h2>
        <p className="note-descriptin">{note.description || "No description available"}</p>
        <button className="note-button">More about it...</button>
      </div>
    </div>
  );
};
const Notes=()=>{
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(()=>{
    const loadNotes=async()=>{
      try{
        const response=await fetchNotes();
        setNotes(response.data);
        setLoading(false);
      }catch(err){
        setError(err.response?.data?.message || err.message);
        setLoading(false);
        console.error("Error fetching Notes", err);
      }
    };
    loadNotes();
  },[]);

  const totalPages = Math.ceil(notes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = notes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if(loading){
    return(
      <div className="error-container">
        <p>Error:{error}</p>
        <button onClick={()=>window.location.reload()}>Retry</button>
      </div>
    );
  }
  return(
    <>
      <Navbar/>
      <AdLayout/>
      <div className="note-container">
        <hq className="note-heading">Notes</hq>

        {notes.length===0?(
          <div className="no-notes">
            <p>No notes available at the moment</p>
          </div>
        ):(
          <>
            <div className="note-list">
              {currentItems.map((note)=>(
                <Notescard key={note.id} note={note} navigate={navigate}/>
              ))}
            </div>
            {totalPages>1 &&(
              <div className="pagination">
                <button className="pagination-button" onClick={prevPage} disabled={currentPage===1}>
                  &laquo; Prev
                </button>
                {[Array(totalPages)].map((_,i)=>(
                  <button className={`pagination-button${currentPage===i+1?"active":""}`} 
                    key={i+1} 
                    onClick={()=>paginate(i+1)}
                  >
                    {i+1}
                  </button>
                ))}
                <button className="pagination-button"
                  onClick={nextPage}
                  disabled={currentPage===totalPages}>
                    Next &raquo;
                  </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer/>
    </>
  );
};
export default Notes;