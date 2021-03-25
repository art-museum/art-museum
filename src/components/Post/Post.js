import React from 'react';
import './Post.css';

const Post = (props) => (

    <article className="art-container">
        <img src={props.url} alt="" />
        <div className="info-box">
            <h1>{props.title}</h1>
            <p>{props.artName}</p>
            <div>{props.author}</div>
            <button onClick={props.clicked}>Show More</button>
        </div>
    </article>
);

export default Post;