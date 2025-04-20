import React, { useState } from 'react';
import "../../css/Blogs/blogs.css"
import blog from "../../images/blog.png"
import Navbar from '../navBar';
import AdLayout from '../AdLayout';
import Footer from '../Footer';

const blogs=Array.from({length:100},(_,i)=>({
    id:i+1,
    title:`Unlocking Opportunities: Why IT Training is the Key to Success in 2025 and Beyond?${i+1}`,
    description:"Adaptability has become essential in the modern era with its ever-changing technology; therefore, knowing “why IT training is the key to success in 2025” ",
    image:blog,
    date:"Feb 5, 2025"
}));

const BlogCard=({blog})=>{
    return(
        <div className="blogs-card">
            <img src={blog.image} alt={blog.title} className="blog-image"/>
            <div className="blog-info">
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-description">{blog.description}</p>
                <span className="blog-date">{blog.date}</span>
            </div>
        </div>
     
    );
};
const Blogs = () => {
    const [currentPage, setCurrentPage]=useState(1);
    const itemsPerPage=6;
    const totalPages=Math.ceil(blogs.length/itemsPerPage);

    const indexOfLastItem=currentPage*itemsPerPage;
    const indexOfFirstItem=indexOfLastItem-itemsPerPage;
    const currentItems=blogs.slice(indexOfFirstItem,indexOfLastItem);

    const paginate=(pageNumber)=>setCurrentPage(pageNumber);
    const nextPage=()=>setCurrentPage((prev)=>Math.min(prev+1,totalPages));
    const prevPage=()=>setCurrentPage((prev)=>Math.max(prev-1,1));



return (
    <>
    <Navbar/>
    <AdLayout/>


    <div className="blog-container">
        <h1 className="blog-heading">Blogs</h1>
        <div className="blogs-list">
            {currentItems.map((blog)=>(
                <BlogCard key={blog.id} blog={blog}/>
            ))}
        </div>
        <div className="pagination">
            <button onClick={prevPage} disabled={currentPage===1}>
                &laquo; Prev
            </button>
            {[...Array(totalPages)].map((_,i)=>(
                <button key={i+1} onClick={()=>paginate(i+1)} disabled={currentPage===i+1}>
                    {i+1}
                </button>
            ))}
            <button onClick={nextPage} disabled={currentPage===totalPages}>
                Next &raquo;
            </button>
        </div>
    </div>
    <Footer/>
    </>
);
};
export default Blogs;

