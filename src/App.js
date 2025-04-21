import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BlogForm from './BlogForm';
import BlogList from './BlogList';
import BlogDetails from './BlogDetails';
import './App.css';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:3001/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const addBlog = async (newBlog) => {
    try {
      const response = await fetch('http://localhost:3001/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });
      const data = await response.json();
      setBlogs([...blogs, data]);
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  const filteredBlogs = filter === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.category === filter);

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">Blog App</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add">Add Blog</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={
              <>
                <div className="mb-4">
                  <h2 className="mb-3">Latest Blogs</h2>
                  <div className="btn-group">
                    <button 
                      className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setFilter('all')}
                    >
                      All
                    </button>
                    <button 
                      className={`btn ${filter === 'Technology' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setFilter('Technology')}
                    >
                      Technology
                    </button>
                    <button 
                      className={`btn ${filter === 'Entertainment' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setFilter('Entertainment')}
                    >
                      Entertainment
                    </button>
                    <button 
                      className={`btn ${filter === 'Sports' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setFilter('Sports')}
                    >
                      Sports
                    </button>
                    <button 
                      className={`btn ${filter === 'Business' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setFilter('Business')}
                    >
                      Business
                    </button>
                    <button 
                      className={`btn ${filter === 'Health' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setFilter('Health')}
                    >
                      Health
                    </button>
                    <button 
                      className={`btn ${filter === 'Science' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setFilter('Science')}
                    >
                      Science
                    </button>
                  </div>
                </div>
                <BlogList blogs={filteredBlogs} />
              </>
            } />
            <Route path="/add" element={<BlogForm addBlog={addBlog} />} />
            <Route path="/blog/:id" element={<BlogDetails blogs={blogs} />} />
          </Routes>
        </div>

        <footer className="bg-dark text-white py-4 mt-5">
          <div className="container text-center">
            <p>&copy; 2023 Blog App. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;