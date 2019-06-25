import React, { Component } from 'react';
import axios from 'axios';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      loading: false,
      currentPage: 1,
      postsPerPage: 10
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true
    });
    const res = await axios.get('http://jsonplaceholder.typicode.com/posts');
    this.setState({
      posts: res.data,
      loading: false
    });
  }

  render() {
    const { currentPage, postsPerPage, posts } = this.state;

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber =>
      this.setState({
        currentPage: pageNumber
      });

    return (
      <div className="container mt-5">
        <h1 className="text-primary mb-3">My Blog</h1>
        <Posts posts={currentPosts} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>
    );
  }
}

export default App;
