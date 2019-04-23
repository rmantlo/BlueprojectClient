import React from 'react';
import { Button } from 'reactstrap';
import UpdateForum from './UpdateForum';
import Comment from '../comments/Comment';

export default class ProfileForum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            postId: '',
        }
    }

    deletePost = (event) => {
        fetch(`http://localhost:3000/forum/delete/${event.target.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.token
            },
            body: JSON.stringify({ id: event.target.id })
        })
            .then(response => response.json())
            .then(data => this.props.fetchUserForums())
            .catch(err => console.log(err))
    }
    togglePopup = (e) => {
        
        this.setState({ showPopup: !this.state.showPopup });
        if (this.state.postId === '') {
            this.setState({ postId: e.target.id })
        } else {
            this.setState({ postId: '' })
        }
    }

    render() {
        return (
            <div >
                {this.props.results.map(result => {
                    return (
                        <div key={result.id}>
                            <div id='profileForum' >
                                <p id='keywordp'>{result.keyword}</p>
                                <h2>{result.title}</h2>
                                <p>{result.forumMessage}</p>
                                <a href={result.url} target='blank' >{result.url}</a><br />
                                <Button className='profileForumBtn' id={result.id} onClick={(e) => {e.preventDefault(); this.togglePopup(e)}}>Edit</Button>
                                <Button className='profileForumBtn' color='danger' id={result.id} onClick={this.deletePost}>Delete</Button>
                                <Comment userId={this.props.userId} token={this.props.token} forumId={result.id} />
                            </div>
                        </div>
                    )
                })}
                {
                    this.state.showPopup ?
                        <UpdateForum fetchUserForums={this.props.fetchUserForums} token={this.props.token} postId={this.state.postId} togglePopup={this.togglePopup} />
                        : <div></div>
                }
            </div>
        )
    }
}