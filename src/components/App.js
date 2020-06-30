import React, { Component } from 'react';

import './App.css';
import axios from 'axios';
import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from '../components/Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
      .then(res => this.setState({posts: res.data}))
      .catch(err => alert('Failed to get data'));
  }

  updatePost( id, text ) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text }).then( results => {
      this.setState({ posts: results.data });
    });
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then( res => {
        this.setState({posts: res.data});
      })
      .catch(err => alert('Failed to get delete'));
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', {text})
      .then(res => {
        this.setState({posts: res.data})
      })
      .catch(err => alert('Failed to post'));
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {
            posts.map( post => (
              <Post key={ post.id}
                    text={ post.text}
                    date={post.date}
                    id={ post.id }
                    updatePostFn={this.updatePost}
                    deletePostFn={this.deletePost} />
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;
