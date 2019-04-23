import React from 'react';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';

export default class UpdateForum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    togglePopup = (e) => {
        //console.log('clicked')
        e.preventDefault();
        this.setState({ showPopup: !this.state.showPopup })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        //console.log(this.state)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/forum/update/${e.target.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.token
            },
            body: JSON.stringify(this.state)
        })
            .then(post => post.json())
            .then(post => {this.props.fetchUserForums(); this.props.togglePopup()})
    }

    render() {
        return (
            <div className='modal1'>
                <div className='modalContent'>
                    <Button className='xbtn' onClick={this.props.togglePopup}>X</Button>
                    <Form onSubmit={this.handleSubmit} id={this.props.postId}>
                        <br />
                        <FormGroup>
                            <Label for='keyword'>Keyword: </Label>
                            <Input type='select' id='keyword' name='keyword' value={this.state.keyword} onChange={this.handleChange}>
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
                            <Label for='title'>Title:</Label>
                            <br />
                            <Input type='text' id='title' placeholder='enter new title' name='title' value={this.state.title} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='img'>URL:</Label>
                            <br />
                            <Input type='text' id='url' placeholder='enter new url' name='url' value={this.state.url} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='forumMessage'>Post content:</Label>
                            <br />
                            <Input type='textarea' id='forumMessage' placeholder='enter post content' name='forumMessage' value={this.state.forumMessage} onChange={this.handleChange} />
                        </FormGroup>
                        <br />
                        <Button type='submit' >Update</Button>
                    </Form>
                </div>
            </div>
        )
    }
}