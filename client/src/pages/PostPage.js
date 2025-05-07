import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getPost();
  }, [id]);
  
  const getPost = () => {
    console.log("getPost function");
    // Mock data
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockPost = {
        id: parseInt(id),
        title: `פוסט ${id}`,
        content: `זהו תוכן מפורט של פוסט מספר ${id}. כאן יופיע תוכן הפוסט המלא.`,
        createdAt: new Date().toLocaleDateString()
      };
      
      setPost(mockPost);
      setEditedPost(mockPost);
      setLoading(false);
    }, 300);
  };
  
  const updatePost = (e) => {
    e.preventDefault();
    console.log("updatePost function");
    
    setPost(editedPost);
    setIsEditing(false);
  };
  
  const deletePost = () => {
    console.log("deletePost function");
    
    if (window.confirm('האם אתה בטוח שברצונך למחוק את הפוסט?')) {
      // Redirect to posts page after delete
      navigate('/posts');
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost(prev => ({ ...prev, [name]: value }));
  };
  
  if (loading) {
    return <div>טוען...</div>;
  }
  
  if (!post) {
    return <div>הפוסט לא נמצא</div>;
  }
  
  return (
    <div className="post-page">
      {!isEditing ? (
        <div className="post-content">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>פורסם בתאריך: {post.createdAt}</span>
          </div>
          <div className="post-body">
            <p>{post.content}</p>
          </div>
          
          {isAdmin && (
            <div className="admin-controls">
              <button onClick={() => setIsEditing(true)}>עריכה</button>
              <button onClick={deletePost} className="delete-btn">מחיקה</button>
            </div>
          )}
        </div>
      ) : (
        <div className="edit-post-form">
          <h2>עריכת פוסט</h2>
          <form onSubmit={updatePost}>
            <div>
              <label>כותרת</label>
              <input 
                type="text"
                name="title"
                value={editedPost.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>תוכן</label>
              <textarea
                name="content"
                value={editedPost.content}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit">שמור</button>
              <button type="button" onClick={() => setIsEditing(false)}>ביטול</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}



export default PostPage;
