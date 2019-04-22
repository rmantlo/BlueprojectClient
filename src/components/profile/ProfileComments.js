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
    componentDidMount() {
        this.fetchComments();
    }
    toggleEdit = (e) => {
        e.preventDefault();
        this.setState({ edit: !this.state.edit })
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

    fetchComments = () => {
        fetch('http://localhost:3000/comments/getmine', {
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
        //console.log(this.props.userId)
        return (
            <div>
                {this.state.comments.map(comment => {
                    let userId = Number(this.props.userId)
                    return (
                        <Card key={comment.id}>
                            {this.state.edit ?
                                <EditComment token={this.props.token} comment={comment} />
                                : <CardBody>
                                    {comment.comment}
                                    <p>--{comment.username}--</p>
                                </CardBody>
                            }
                            {comment.owner_id === userId ?
                                <div>
                                    <Button onClick={this.toggleEdit}>Edit</Button>
                                    <Button id={comment.id} onClick={this.handleDelete}>Delete</Button>
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