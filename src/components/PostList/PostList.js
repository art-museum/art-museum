import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Post from '../Post/Post';
import './PostList.css';
import anass from '../img/mona_anass.png';

class PostList extends Component {
    state = {
        posts: ['init'],
        selectedPostId: null,
        category: 'Mosaics&Text&Prints&Paintings&Drawings',
        entry: '',
        error: false,
        isViewVertical: false
    }

    //classification= Paintings
    componentDidMount () {
        axios.get(`https://api.harvardartmuseums.org/object?classification=${this.state.category}&apikey=1da9b44f-392a-4d5f-8782-ff00202ed72a&page=1&size=300`)
        .then(response => {
            console.log(response)
            this.setState({posts: response.data.records});
        })
        .catch(error => {
            console.log(error);
            this.setState({error: true})
        })
    }

    postSelectedHandler = (id) => {
        console.log(id)
        this.setState({selectedPostId: id});
    }

    
    postCategoryHandler = (event) => {
        //console.log(event.target.value)
        axios.get(`https://api.harvardartmuseums.org/object?classification=${event.target.value}&apikey=1da9b44f-392a-4d5f-8782-ff00202ed72a&page=1&size=15`)
        .then(response => {
            console.log(response)
            this.setState({posts: response.data.records});
        })
        .catch(error => {
            console.log(error);
            this.setState({error: true})
        })
    }

    onInputChange(event) {
        console.log(event.target.value);
    }

    onFormSubmit = (event) => {
        event.preventDefault()
        console.log(this.state.entry);
        axios.get(`https://api.harvardartmuseums.org/object?title=${this.state.entry}&apikey=1da9b44f-392a-4d5f-8782-ff00202ed72a&page=1&size=20`)
        .then(response => {
            console.log(response)
            this.setState({posts: response.data.records});
        })
    }

    render() {
        let posts = <h1 style={{textAlign: 'center'}}>Something...!</h1>
        // console.log(this.state.isViewVertical)
        if (!this.state.error) {
        posts = this.state.posts.map(post => {
            //console.log(post);
            //return [post.classification, post.id]
            return (
                <>
                    {post.primaryimageurl != null && post.imagecount !== 0 && post.title !== 0 ?
                        <Link to={'/' + post.id} key={post.id}>
                            <Post
                                url={post.primaryimageurl}
                                author={post.title}
                                clicked={() => this.postSelectedHandler(post.id)}
                            />

                        </Link>
                    : null
                    }
                </>
            );
        })
    }

        return (
            <>
                <header className="header-container">
                    <div className="header-elements">
                        <div className="art-search">
                            <form onSubmit={this.onFormSubmit}>
                                <input type="text" placeholder="Search for Title" onChange={(event) => this.setState({ entry: event.target.value })}
                                value={this.state.entry}
                                />
                                <button type="submit">➝</button>
                            </form>
                        </div>

                        <select value={this.state.value} onChange={this.postCategoryHandler} className="art-options" >
                            <option value="Mosaics&Paintings&Prints&Drawings">Show all</option>
                            <option value="Prints">Prints</option>
                            <option value="Paintings">Paintings</option>
                            <option value="Drawings">Drawings</option>
                        </select>
                        <label class="switch">
                            <input type="checkbox" onClick={ () => this.setState({isViewVertical: !this.state.isViewVertical}) } />
                            <span class="slider"></span>
                        </label>
                    </div>

                    <nav>

                        <ul>
                            <li><a href="/">Home</a></li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <section className={ this.state.isViewVertical ? 'post-list-container-vertical' : 'post-list-container'} >
                    {posts.length > 0 ? posts : 
                            <div>
                                <h1>Sorry nothing found</h1>
                                <img src={anass} alt="no resultes"/>
                            </div>}
                    </section>
                </main>
            </>
        );
    }
}
 
export default PostList;