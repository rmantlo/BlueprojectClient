import React from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import EditComment from '../comments/EditComment';

class ProfileComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            edit: false,
        }
    }
    componentDidMount = () => {
        this.fetchComments();
    }
    toggleEdit = (e) => {
        //e.preventDefault();
        this.setState({ edit: !this.state.edit })
    }
    fetchComments = () => {
        fetch('http://localhost:3000/comments/getmine', {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.token
            }
        })
            .then(comments => comments.json())
            .then(comments => this.setState({ comments: comments }, () => this.forceUpdate()))
    }

    handleDelete = (e) => {
        //e.preventDefault();
        fetch(`http://localhost:3000/comments/delete/${e.target.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.token
            }
        })
            .then(response => response.json())
            .then( res => this.fetchComments())
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className='profileComments'>
                {this.state.comments.map(comment => {
                    let userId = Number(this.props.userId)
                    return (
                        <Card key={comment.id} className='commentBody'>
                            {this.state.edit ?
                                <EditComment fetchComments={this.fetchComments} edit={this.toggleEdit} token={this.props.token} comment={comment} />
                                : <CardBody>
                                    <p>--{comment.username}--</p>
                                    <p><b>{comment.comment}</b></p>
                                </CardBody>
                            }
                            {comment.owner_id === userId ?
                                <div>
                                    <Button className='profileForumBtn' onClick={(e) => { e.preventDefault(); this.toggleEdit() }}>Edit</Button>
                                    <Button className='profileForumBtn' color='danger' id={comment.id} onClick={this.handleDelete}>Delete</Button>
                                </div>
                                : null}
                        </Card>
                    )
                })}
            </div>
        )
    }
}

export default ProfileComments;