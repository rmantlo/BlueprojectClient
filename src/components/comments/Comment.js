import React from 'react';
import { Collapse, Button, Card } from 'reactstrap';
import CreateComment from './CreateComment';
import CommentBody from './CommentBody';
import './Comment.css'


class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            comments: []
        }
    }
    componentDidMount() {
        this.fetchComments();
    }
    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }
    fetchComments = () => {
        fetch(`http://localhost:3000/comments/comment/${this.props.forumId}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.token
            }
        })
            .then(comments => comments.json())
            .then(comments => this.setState({ comments: comments }))
    }

    handleDelete = (e) => {
        fetch(`http://localhost:3000/comments/delete/${e}`, {
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
            <div className='comment'>
                <Collapse isOpen={this.state.collapse}>
                    {this.state.comments.map(comment => {
                        //console.log(comment.owner_id, this.props.userId)
                        //let userId = Number(this.props.userId)
                        return (
                            <Card className='commentCard' key={comment.id}>
                                <CommentBody fetchComments={this.fetchComments} handleDelete={this.handleDelete} userId={this.props.userId} token={this.props.token} comment={comment} edit={this.state.edit} />
                            </Card>
                        )
                    })}
                    <CreateComment fetchComments={this.fetchComments} token={this.props.token} forumId={this.props.forumId} />
                </Collapse>
                <Button className='commentBtn greenBtn' onClick={this.toggle}>Comments</Button>
            </div >
        )
    }
}

export default Comment;
