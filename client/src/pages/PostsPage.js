import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PostsPage() {
  const { isAdmin } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = () => {
    console.log("getAllPosts function");
    // Mock data
    const mockPosts = [
      { id: 1, title: 'פוסט 1', content: 'תוכן פוסט 1' },
      { id: 2, title: 'פוסט 2', content: 'תוכן פוסט 2' },
      { id: 3, title: 'פוסט 3', content: 'תוכן פוסט 3' }
    ];
    setPosts(mockPosts);
  };

  const createPost = (e) => {
    e.preventDefault();
    console.log("createPost function");
    
    // Add new post to state
    const newPostWithId = {
      id: posts.length + 1,
      ...newPost
    };
    
    setPosts([...posts, newPostWithId]);
    setNewPost({ title: '', content: '' });
    setShowCreateForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="posts-page">
      <h1>פוסטים</h1>
      
      {isAdmin && (
        <div className="admin-controls">
          <button onClick={() => setShowCreateForm(!showCreateForm)}>
            {showCreateForm ? 'ביטול' : 'צור פוסט חדש'}
          </button>
          
          {showCreateForm && (
            <form onSubmit={createPost} className="create-form">
              <h3>יצירת פוסט חדש</h3>
              <div>
                <label>כותרת</label>
                <input 
                  type="text"
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>תוכן</label>
                <textarea
                  name="content"
                  value={newPost.content}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit">שמור</button>
            </form>
          )}
        </div>
      )}
      
      <ul className="posts-list">
        {posts.map(post => (
          <li key={post.id} className="post-item">
            <h3>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h3>
            <p>{post.content.substring(0, 100)}...</p>
            <Link to={`/post/${post.id}`} className="read-more">קרא עוד</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsPage;