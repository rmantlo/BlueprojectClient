import React from 'react';
import './CreateForum.css';
import { Button, Form, FormGroup, Label, Input, Collapse } from 'reactstrap';
import APIURL from '../../helpers/environment';

export default class CreateForum extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            title: '',
            forumMessage: '',
            url: '',
            keyword: '',
        }
    }
    toggleIsOpen = (e) => {
        e.preventDefault();
        this.setState({isOpen: !this.state.isOpen})
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${APIURL}/forum/create`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.token
            },
            body: JSON.stringify(this.state)
        })
            .then(post => post.json())
            .then(post => this.props.fetchForums())
    }

    render() {
        return (
            <div className='createForum'>
                <h1>Create Forum Post</h1>
                <Collapse isOpen={this.state.isOpen} >
                    <Form onSubmit={this.handleSubmit}>
                        <div className='bothGroups'>
                            <FormGroup>
                                <Label for='keyword'>Keyword: </Label>
                                <Input type='select' name='keyword' value={this.state.keyword} onChange={this.handleChange} placeholder='select'>
                                    <option></option>
                                    <option value='Clinical Trials'>Clinical Trials</option>
                                    <option value='Chemistry'>Chemistry</option>
                                    <option value='Environmental'>Environmental</option>
                                    <option value='Genetics'>Genetics</option>
                                    <option value='Immunology'>Immunology</option>
                                    <option value='Medicine'>Medicine</option>
                                    <option value='Neuroscience'>Neuroscience</option>
                                    <option value='Psychology'>Psychology</option>
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
                        <Button className='greenBtn' type='submit'>Create Post</Button>
                    </Form>
                </Collapse>
                <Button className='collapseBtn' onClick={this.toggleIsOpen}>{this.state.isOpen? '^' : 'v'}</Button>
            </div>
        )
    }
}