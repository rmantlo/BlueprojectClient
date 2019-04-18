import React from 'react';
import { Input, Button, Form } from 'reactstrap';

export default class CreateComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forum_id: this.props.forumId,
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        fetch('http://localhost:3000/comments/create', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.token
            },
            body: JSON.stringify(this.state)
        })
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Input name='comment' value={this.state.comment} placeholder='enter comment' onChange={this.handleChange} required />
                    <Button type='submit'>Create comment</Button>
                </Form>
            </div>
        )
    }
}