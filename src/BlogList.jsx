import React from 'react';
import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {
  if (blogs.length === 0) {
    return (
      <div className="alert alert-info">
        No blogs found. Be the first to add one!
      </div>
    );
  }

  return (
    <div className="row">
      {blogs.map(blog => (
        <div key={blog.id} className="col-md-6 col-lg-4 mb-4">
          <div className="card h-100">
            <img 
              src={blog.image} 
              className="card-img-top" 
              alt={blog.title}
              style={{ height: '200px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
              }}
            />
            <div className="card-body">
              <span className="badge bg-primary mb-2">{blog.category}</span>
              <h5 className="card-title">{blog.title}</h5>
              <p className="card-text text-muted">
                By {blog.blogger_name} • {new Date(blog.date).toLocaleDateString()}
              </p>
              <p className="card-text">
                {blog.description.length > 100 
                  ? `${blog.description.substring(0, 100)}...` 
                  : blog.description}
              </p>
              <Link to={`/blog/${blog.id}`} className="btn btn-outline-primary">
                Read More...
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;