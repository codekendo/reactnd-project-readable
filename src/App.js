import React, { Component } from 'react';
import './App.css';
//Default view is Highest VoteScore
// Dynamically Add Categories
class App extends Component {
  render() {
    return (
    <div className= "app wrapper">
      <div className="flex-parent-center">
        <h1 >Readable</h1>
      </div>
        <div className="list-wrapper">
          <h2>Categories</h2>
          <ul className="flex-parent-right-columns">
            <li>wwa(aww)</li>
            <li>news</li>
            <li>GOT</li>
            <li>ClickBait Titles that will make you hate yourself</li>
          </ul>
        <div className="list-wrapper">
        <h2>Show</h2>
        <ul className="flex-parent-right-columns show">
            <li> Highest Vote Score</li>
            <li> Lowest Vote Score</li>
            <li >Newest</li>
            <li >Oldest</li>
          </ul>
        </div>
        <div>
        </div>
        <div>
        <h3>Display number of posts: <span>5</span>, <span>10</span>, <span>15</span>,  <span>20</span></h3>

        </div>

        <button className="new-post">
        New Post
        </button>


      </div>
    </div>
    );
  }
}

export default App;
