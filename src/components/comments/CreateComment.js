import React from 'react';
import { Input, Button, Form } from 'reactstrap';

export default class CreateComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forum_id: this.props.forumId,
            update: '',
            comment: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/comments/create', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.token
            },
            body: JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ update: res });
                this.props.fetchComments();
                this.setState({ comment: '' });
            })
    }

    render() {
        return (
            <div id='createComment'>
                <Form onSubmit={this.handleSubmit}>
                    <Input name='comment' value={this.state.comment} placeholder='enter comment' onChange={this.handleChange} required />
                    <Button className='greenBtn' type='submit'>Create Comment</Button>
                </Form>
            </div>
        )
    }
}