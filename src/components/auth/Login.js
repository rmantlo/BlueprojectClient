import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Radium from 'radium';


const styles= {
    header: {
        textAlign: 'center',
    },
    button: {
        margin: '10px',
        textAlign: 'center'
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.username || !this.state.password) {
            this.handleValidation();
        } else {
            fetch('http://localhost:3000/user/login', {
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
                    console.log(data)
                })
                .catch(err => console.log(err))
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
            <div>
                <h1 style={styles.header}>Login</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for='username'>Username:</Label><br />
                        <Input id='li_username' type='test' name='username' placeholder='enter username' onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password:</Label><br />
                        <Input id='li_password' type='password' name='password' placeholder='enter password' onChange={this.handleChange} />
                    </FormGroup>
                    <Button style={styles.button} type='submit'>Login</Button>
                </Form>
            </div>
        )
    }
}

export default Radium(Login);