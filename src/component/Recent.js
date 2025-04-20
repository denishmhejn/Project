import React from 'react';
import FeatureCourses from './FeatureCourses';
import "../css/RecentBlog.css";
import arrowleft from "../images/arrowleft.png";
import arrowright from "../images/arrowright.png";

const blogData = [
  {
    title: "Updated Terms",
    content:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a BC, making it over 2000 years old.",
  },
  {
    title: "Cloud course update",
    content:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a BC, making it over 2000 years old.",
  },
  {
    title: "Website update",
    content:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a BC, making it over 2000 years old.",
  },
  {
    title: "New Product Launch",
    content: "We are excited to announce the launch of our newest product! Designed with [mention specific features or benefits], it offers [mention key advantages]. Learn more and experience the future of [product category] today."
  }
];

export default function Recent() {
  const [blogIndex, setBlogIndex] = React.useState(0);
  const blogPerPage = 3;

  const handleForward = () => {
    if (blogIndex + blogPerPage < blogData.length) {
      setBlogIndex(blogIndex + blogPerPage);
    }
  };

  const handleBackward = () => {
    if (blogIndex > 0) {
      setBlogIndex(blogIndex - blogPerPage);
    }
  };

  const visibleBlogs = blogData.slice(blogIndex, blogIndex + blogPerPage);

  return (
    <>
      <div className="recent-blogs">
        <h2>Recent Blogs</h2>
        <div className="carousel-controls">
          <button
            className={`action-button ${blogIndex === 0 ? "disabled" : ""}`}
            onClick={handleBackward}
            disabled={blogIndex === 0}
          >
            <img src={arrowleft} alt="backward" className="button-icon-left" />
          </button>
          <button
            className={`action-button ${blogIndex + blogPerPage >= blogData.length ? "disabled" : ""}`}
            onClick={handleForward}
            disabled={blogIndex + blogPerPage >= blogData.length}
          >
            <img src={arrowright} alt="forward" className="button-icon-right" />
          </button>
        </div>
        <div className="carousel">
          {visibleBlogs.map((blog, index) => (
            <div key={index} className="blog-card">
              <div className="blog-icon"></div> {/* Placeholder for icon */}
              <div className="blog-content">
                <h3 className="headtitle">{blog.title}</h3>
                <p className="content">{blog.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}