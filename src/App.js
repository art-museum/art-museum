import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import PostList from './components/PostList/PostList';
import './App.css';
import PostDetail from './components/PostDetail/PostDetail';
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <div className="App">
            <Route path="/" exact component={PostList} />
            <Route path="/:id" exact component={PostDetail} />
          </div>
        </BrowserRouter>

      </>
    );
  }
}

export default App;
