import React, { Component } from 'react';
import axios from 'axios';
import './PostDetail.css';

class PostDetail extends Component {

    state = {
        loadedPost: null
    }

    componentDidMount() {
        console.log(this.props)
        if (this.props.match.params.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get(`https://api.harvardartmuseums.org/object/${this.props.match.params.id}?apikey=1da9b44f-392a-4d5f-8782-ff00202ed72a`)
                    .then(response => {
                        console.log(response);
                        this.setState({ loadedPost: response.data });
                    });
            }
        }
    }

    handleClick() {
        this.props.history.push('/');
      }

    render() {
        let post = <p style={{ textAlign: 'center' }}>loaded</p>;
        if (this.props.id) {
            post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <main className="details">
                    <article className="pic-detail">
                        <figure>
                            <figcaption>
                                <h1>{this.state.loadedPost.title}</h1>
                                <p>{this.state.loadedPost.period}</p>
                            </figcaption>
                            <img src={this.state.loadedPost.primaryimageurl} alt="" />
                        </figure>
                    </article>

                    <article className="info-detail">
                        <div>
                            <h3>Author</h3>
                            <p>{this.state.loadedPost.people[0].displayname}</p>
                            <br />

                            <h3>Classification</h3>
                            <p>{this.state.loadedPost.classification}</p>
                            <br />

                            <h3>Date</h3>
                            <p>{this.state.loadedPost.dated}</p>
                            <br />

                            <h3>Culture</h3>
                            <p>{this.state.loadedPost.culture}</p>
                            <br />
                            <h3>Medium</h3>
                            <p>{this.state.loadedPost.medium}</p>
                            <br />

                            <h3>Dimensions</h3>
                            <p>{this.state.loadedPost.dimensions}</p>
                            <br />
                            <button type="button" onClick={() => this.handleClick()}>
                            Go Back
                            </button>
                        </div>
                        
                    </article>

                </main>
            );
        }
        return post;
    }
}

export default PostDetail;