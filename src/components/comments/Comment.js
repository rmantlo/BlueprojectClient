import React from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import CreateComment from './CreateComment';
import CommentBody from './CommentBody';
import './Comment.css'


class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            comments: [],
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
        //e.preventDefault();
        fetch(`http://localhost:3000/comments/delete/${e.target.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.token
            }
        })
            .then(response => response.json())
            .catch(err => console.log(err))
        window.location.reload();
    }

    render() {
        return (
            <div>
                <Collapse isOpen={this.state.collapse}>
                    {this.state.comments.map(comment => {
                        //console.log(comment.owner_id, this.props.userId)
                        let userId = Number(this.props.userId)
                        return (
                            <Card key={comment.id}>
                                <CommentBody token={this.props.token} comment={comment} edit={this.state.edit} />
                                {comment.owner_id === userId ?
                                    <div>
                                        
                                        <Button id={comment.id} onClick={this.handleDelete}>Delete</Button>
                                    </div>
                                    : null}
                            </Card>
                        )
                    })}
                    <CreateComment token={this.props.token} forumId={this.props.forumId} />
                </Collapse>
                <Button onClick={this.toggle}>Comments</Button>
            </div >
        )
    }
}

export default Comment;
