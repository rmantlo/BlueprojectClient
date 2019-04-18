import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class CreateForum extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            forumMessage: '',
            url: '',
            keyword: '',
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = () => {
        fetch('http://localhost:3000/forum/create', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.token
            },
            body: JSON.stringify(this.state)
        })
            .then(post => post.json())
            .then(post => console.log('post created'))
    }

    render() {
        return (
            <div className='createForum'>
                <h1>Create Forum Post</h1>
                <Form onSubmit={this.handleSubmit}>
                    <div className='bothGroups'>
                        <FormGroup>
                            <Label for='keyword'>Keyword: </Label>
                            <Input type='select' name='keyword' value={this.state.keyword} onChange={this.handleChange} placeholder='select'>
                                <option></option>
                                <option value='Medical'>Medical</option>
                                <option value='Environmental'>Environmental</option>
                                <option value='Chemistry'>Chemistry</option>
                                <option value='Technology'>Technology</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for='title'>Post title: </Label>
                            <Input type='text' name='title' placeholder='enter title' value={this.state.title} onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for='url'>Source URL: </Label>
                            <Input type='text' name='url' placeholder='source url' value={this.state.url} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='forumMessage'>Post content: </Label>
                            <Input type='textarea' name='forumMessage' placeholder='body content' maxLength='400' value={this.state.forumMessage} onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <Button type='submit'>Create Post</Button>
                </Form>
            </div>
        )
    }
}