import React from 'react';
import {Form, Button, Input} from 'reactstrap';

export default class EditComment extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            comment: this.props.comment.comment
        }
    }
    handleChange = (e) =>{
        this.setState({ comment: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.id)
        fetch(`http://localhost:3000/comments/update/${e.target.id}`, {
            method:'PUT',
            headers: {
                "Content-Type":'application',
                "Authorization": this.props.token
            },
            body: JSON.stringify(this.state)
        })
        .then( result => result.json())
        .catch( err=> console.log(err))
    }

    render(){
        return(
            <Form id={this.props.comment.id} onSubmit={this.handleSubmit}>
                <Input type='text' name='edit' value={this.state.comment} onChange={this.handleChange} />
                <Button type='submit'>Update</Button>
            </Form>
        )
    }
}