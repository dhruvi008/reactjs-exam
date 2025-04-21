import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogForm = ({ addBlog }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: 'Technology',
    title: '',
    blogger_name: '',
    image: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const categories = [
    'Technology', 'Entertainment', 'Sports', 
    'Business', 'Health', 'Science'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title || formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (!formData.blogger_name || formData.blogger_name.length < 3) {
      newErrors.blogger_name = 'Blogger name must be at least 3 characters';
    }
    
    if (!formData.image) {
      newErrors.image = 'Image URL is required';
    } else if (!/^https?:\/\/.+\/.+$/.test(formData.image)) {
      newErrors.image = 'Please enter a valid image URL';
    }
    
    if (!formData.description || formData.description.length < 3) {
      newErrors.description = 'Description must be at least 3 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newBlog = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString()
      };
      
      addBlog(newBlog);
      navigate('/');
    }
  };

  return (
    <div className="blog-form-container">
      <h2 className="mb-4">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            minLength="3"
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="blogger_name" className="form-label">Blogger Name</label>
          <input
            type="text"
            className={`form-control ${errors.blogger_name ? 'is-invalid' : ''}`}
            id="blogger_name"
            name="blogger_name"
            value={formData.blogger_name}
            onChange={handleChange}
            required
            minLength="3"
          />
          {errors.blogger_name && <div className="invalid-feedback">{errors.blogger_name}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input
            type="text"
            className={`form-control ${errors.image ? 'is-invalid' : ''}`}
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
          {errors.image && <div className="invalid-feedback">{errors.image}</div>}
          {formData.image && (
            <div className="mt-2">
              <img 
                src={formData.image} 
                alt="Preview" 
                className="img-thumbnail" 
                style={{ maxHeight: '200px' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                }}
              />
            </div>
          )}
        </div>
        
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            id="description"
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            required
            minLength="3"
          ></textarea>
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>
        
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="submit" className="btn btn-primary me-md-2">Submit</button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;