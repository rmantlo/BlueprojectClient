import React from 'react';
import {Form, Button, Input} from 'reactstrap';
import APIURL from '../../helpers/environment';

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
        //console.log(e.target.id)
        fetch(`${APIURL}/comments/update/${e.target.id}`, {
            method:'PUT',
            headers: {
                "Content-Type":'application/json',
                "Authorization": this.props.token
            },
            body: JSON.stringify(this.state)
        })
        .then( result => result.json())
        .then( res =>{ 
            this.props.fetchComments();
            this.props.edit()
        })
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