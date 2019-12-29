import React, { Component } from 'react';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intervalIsSet: false,
            posts: []
        };
    }
    componentDidMount() {
        this.getPostsFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getPostsFromDb, 1000);
            this.setState({ intervalIsSet: interval });
        }
    }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }

    getPostsFromDb = async () => {
        await fetch('https://egs-localserver.run-us-west1.goorm.io/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
            .then(data => data.json())
            .then(res => this.setState({ posts: res }));
    };

    render() {
        const { posts } = this.state;
        const renderPost = post => {
            return (
                <li key={post._id} className="list__item post">
                    <h3 className="post__title">{post.title}</h3>
                    <p className="post__body">{post.body.substring(0, 600)}</p>
                </li>
            );
        };
        return (
            <div className="App">
                <ul className="list">
                    {posts && posts.length > 0 ? (
                        posts.map(post => renderPost(post))
                    ) : (
                        <p>No posts found</p>
                    )}
                </ul>
            </div>
        );
    }
}

export default Posts;