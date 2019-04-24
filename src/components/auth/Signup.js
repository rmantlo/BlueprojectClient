import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Radium from 'radium';
import APIURL from '../../helpers/environment';


const styles = {
    header: {
        textAlign: 'center',
    },
    button: {
        margin: '10px',
        textAlign: 'center'
    },
    exitButton:{
        float: 'right',
        margin: '10px'
    },
    modal: {
        border: '2px solid lightgrey',
        backgroundColor: '#EEEEEE',
        borderRadius: '20px',
        boxShadow: '2px 2px 2px',
        top: '100px',
    }
}

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            img: ''
        }
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.username || !this.state.password) {
            this.handleValidation();
        } else {
            fetch(`${APIURL}/user/createuser`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(this.state)
            })
                .then(response => response.json())
                .then(data => {
                    this.props.setToken(data.sessionToken);
                    this.props.setUserId(data.user.id);
                    //console.log('user created')
                })
        }
    }

    handleValidation = () => {
        if (!this.state.username) {
            alert('Please enter a username.')
        }
        if (!this.state.password) {
            alert('Please enter a password.')
        }
    }
    render() {
        return (
            <div style={styles.modal} className='auth'>
                <Form onSubmit={this.handleSubmit}>
                    <h1 style={styles.header}>Sign up</h1>
                    <FormGroup>
                        <Label for='username'>Username:</Label><br />
                        <Input type='text' name='username' placeholder='enter username' value={this.state.username} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password:</Label><br />
                        <Input type='password' placeholder='enter password' name='password' value={this.state.password} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='img'>Image:</Label><br />
                        <Input type='text' placeholder='enter img url' name='img' value={this.state.img} onChange={this.handleChange} />
                    </FormGroup>
                    <Button className='greenBtn' style={styles.button} type='submit'>Sign up</Button>
                    <Button style={styles.exitButton} onClick={(e)=>{e.preventDefault(); this.props.exit();}}>X</Button>
                </Form>
            </div>
        )
    }
}

export default Radium(Signup);