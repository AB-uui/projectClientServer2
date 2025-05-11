import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
 
function BootstrapExample() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>ברוך הבא</h1>
                    <button className="btn btn-primary">התחבר</button>
                </div>
                <div className="col">
                    <h1>ברוך הבא</h1>
                    <button className="btn btn-primary">התחבר</button>
                </div>
                <div className="col">
                    <h1>ברוך הבא</h1>
                    <button className="btn btn-primary">התחבר</button>
                </div>
            </div>
        </div>
    );
}
function HomePage() {
  return (<>
  {/* <BootstrapExample/> */}
    <div className="home-page">
      <h1>דף הבית</h1>
      <p>ברוכים הבאים לאתר שלנו</p>

      <div className="featured-sections">
        <div className="featured-posts">
          <h2>פוסטים מומלצים</h2>
          <ul>
            <li><Link to="/posts">כל הפוסטים</Link></li>
            <li><Link to="/post/1">פוסט 1</Link></li>
            <li><Link to="/post/2">פוסט 2</Link></li>
          </ul>
        </div>

        <div className="featured-topics">
          <h2>נושאים פופולריים</h2>
          <ul>
            <li><Link to="/topics">כל הנושאים</Link></li>
            <li><Link to="/topic/1">נושא 1</Link></li>
            <li><Link to="/topic/2">נושא 2</Link></li>
          </ul>
        </div>
      </div>
    </div></>
  );
}

export default HomePage;