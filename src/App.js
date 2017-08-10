import React, { Component } from 'react';
import './App.css';
//Default view is Highest VoteScore
// Dynamically Add Categories
class App extends Component {
  render() {
    return (
    <div>
    <div className="center-txt">
      <h1 >Readable</h1>
      <div className="wrapper-category">
        <h2>Categories</h2>
        <ul>
          <li>wwa(aww)</li>
          <li>news</li>
          <li>wow</li>
          <li>GOT</li>
        </ul>
      </div>
      <div>
          <li> Highest Vote Score</li>
          <li> Lowest Vote Score</li>
          <li >Newest</li>
          <li >Oldest</li>
      </div>
      <div>
      </div>
      <div>
      Display number of posts: <span>5</span>, <span>10</span>, <span>15</span>,  <span>20</span>

      </div>

      <button>
      New Post
      </button>



    </div>
    </div>
    );
  }
}

export default App;
