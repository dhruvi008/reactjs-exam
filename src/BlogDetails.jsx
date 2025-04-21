import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogDetails = ({ blogs }) => {
  const { id } = useParams();
  const blog = blogs.find(blog => blog.id === parseInt(id));

  if (!blog) {
    return (
      <div className="alert alert-danger">
        Blog not found. <Link to="/">Go back to home</Link>
      </div>
    );
  }

  return (
    <div className="blog-details">
      <div className="card mb-4">
        <img 
          src={blog.image} 
          className="card-img-top" 
          alt={blog.title}
          style={{ maxHeight: '500px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Available';
          }}
        />
        <div className="card-body">
          <span className="badge bg-primary mb-3">{blog.category}</span>
          <h1 className="card-title mb-3">{blog.title}</h1>
          <p className="card-subtitle text-muted mb-4">
            By {blog.blogger_name} • {new Date(blog.date).toLocaleDateString()}
          </p>
          <p className="card-text" style={{ whiteSpace: 'pre-line' }}>{blog.description}</p>
        </div>
      </div>
      <Link to="/" className="btn btn-primary">
        Back
      </Link>
    </div>
  );
};

export default BlogDetails;