import React from 'react';
import Comment from '../comments/Comment';

export default class ForumPosts extends React.Component{
    constructor(props){
        super(props);
        this.state ={
        }
    }

    render(){
        return(
            this.props.results.map(result => {
                return (
                    <div className='forums' key={result.id}>
                        <div className='forumPost'>
                            <p id='keywordp'>{result.keyword}</p>
                            <h2>{result.title}</h2>
                            <p>{result.forumMessage}</p>
                            <a href={result.url} target='blank'>{result.url}</a>
                        </div>
                        <Comment userId={this.props.userId} token={this.props.token} forumId={result.id} />
                    </div>
                )
            })
        )
    }
}