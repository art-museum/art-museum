import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Post from '../Post/Post';
import './PostList.css';

class PostList extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        category: 'Paintings'
        
    }

    //classification= Paintings
    componentDidMount () {
        axios.get(`https://api.harvardartmuseums.org/object?classification=${this.state.category}&apikey=1da9b44f-392a-4d5f-8782-ff00202ed72a&page=3&size=10`)
        .then(response => {
            console.log(response)
            this.setState({posts: response.data.records});
        })
    }

    postSelectedHandler = (id) => {
        console.log(id)
        this.setState({selectedPostId: id});
    }

    
    postCategoryHandler = (event) => {
        //console.log(event.target.value)
        axios.get(`https://api.harvardartmuseums.org/object?classification=${event.target.value}&apikey=1da9b44f-392a-4d5f-8782-ff00202ed72a&page=3&size=10`)
        .then(response => {
            console.log(response)

            this.setState({posts: response.data.records, category: event.target.value} );
        })
    }

    render() {
        const posts = this.state.posts.map(post => {
            //console.log(post);
            //return [post.classification, post.id]
            return (
                <Link to={'/' + post.id} key={post.id}>
                    {post.primaryimageurl !== null ? <Post url={post.primaryimageurl} clicked={() => this.postSelectedHandler(post.id)} />
                        : null}
                </Link>
            );
        })

        return (
            <>
                <header className="header-container">

                    <div className="art-search">
                        <input type="search"placeholder="Search" />
                        <button type="submit">Search</button>
                    </div>

                    <select value={this.state.value} onChange={this.postCategoryHandler} className="art-options" >
                        <option value="showall">showall</option>
                        <option value="Paintings">Paintings</option>
                        <option value="Jewelry">Jewelry</option>
                        <option value="Sculpture">Sculpture</option>
                    </select>

                    <nav>

                        <ul>
                            <li><a href="/">Home</a></li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <section className='post-list-container'>
                        {posts}
                    </section>
                </main>
            </>
        );
    }
}
 
export default PostList;