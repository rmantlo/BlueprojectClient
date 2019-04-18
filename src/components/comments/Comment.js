import React from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import CreateComment from './CreateComment';
import EditComment from './EditComment';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            collapse: false,
            comments: [],
        }
    }
    componentDidMount(){
        this.fetchComments();
    }
    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }
    toggleEdit = (e) => {
        e.preventDefault();
        this.setState({edit: !this.state.edit})
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

    render() {
        return (
            <div>
                <Button onClick={this.toggle}>Comments</Button>
                <Collapse isOpen={this.state.collapse}>
                    {this.state.comments.map(comment => {
                        return (
                            <Card key={comment.id}>
                                {this.state.edit ? 
                                <EditComment token={this.props.token} comment={comment} />
                                : <CardBody>
                                    {comment.comment}
                                    <p>username</p>
                                </CardBody> 
                                }
                                <Button onClick={this.toggleEdit}>Edit</Button>
                            </Card>
                        )
                    })}
                    <CreateComment token={this.props.token} forumId={this.props.forumId} />
                </Collapse>
            </div>
        )
    }
}