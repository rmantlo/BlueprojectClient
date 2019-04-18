import React from 'react';
import './Profile.css';
import ProfileForum from './ProfileForum';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            userInfo: {},
            showPopup: false,
            deletePopup: false,

        }
    }
    componentDidMount() {
        this.fetchUserForums();
        this.fetchUserInfo();
    }
    fetchUserInfo = () => {
        fetch('http://localhost:3000/forum/userinfo', {
            method: 'GET',
            headers: {
                "Content-Type": "application",
                "Authorization": this.props.token
            }
        })
            .then(result => result.json())
            .catch(err => console.log(err))
            .then(result => this.setState({ userInfo: result }))
        //console.log(this.state.results)
    }
    fetchUserForums = () => {
        fetch('http://localhost:3000/forum/getmine', {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.token
            }
        })
            .then(result => result.json())
            .catch(err => console.log(err))
            .then(result => this.setState({ results: result }))
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
        console.log(this.state)
    }

    handleSubmit = (e) => {
        //e.preventDefault();
        fetch('http://localhost:3000/forum/updateuser', {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.token
            },
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(data => {
                console.log('user updated')
            })
    }
    handlePassSubmit = () => {
        if (!this.state.password) {
            alert('please enter a new password')
        } else {
            fetch('http://localhost:3000/forum/updatepassword', {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": this.props.token
                },
                body: JSON.stringify(this.state.password)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('user password updated')
                })
            alert('Password Changed')
        }
    }

    warnDelete = (e) => {
        e.preventDefault();
        this.setState({ deletePopup: true })
    }
    deleteAccount = () => {
        this.deleteUserPosts();
        this.props.logout();
        this.setState({ deletePopup: false });
        fetch('http://localhost:3000/forum/deleteuser', {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application',
                "Authorization": this.props.token
            }
        })
            .then(response => response.json())
            .then(response => { console.log('user deleted'); this.setState({ results: [] }) })
    }
    deleteUserPosts = () => {
        fetch('http://localhost:3000/forum/deleteallbyuser', {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application',
                "Authorization": this.props.token
            }
        })
            .then(response => response.json())
            .then(response => { console.log("delete user's post deleted") })
    }


    render() {
        return (
            <div className='mainPage'>
                <div className='wrapper'>
                    <div className='profile'>
                        <div className='profileSide'>
                            <img src={this.state.userInfo.img} alt='' />
                            <h2>{this.state.userInfo.username}</h2>
                            <br />
                            <Button className='updateModal' onClick={this.togglePopup}>Update User Information</Button>
                            <br />
                            <Button className='deleteUser' onClick={this.warnDelete}>Delete Account</Button>
                        </div>
                        {this.state.showPopup ?
                            <div className='modal'>
                                <div className='modalContent'>
                                    <Button className='xbtn' onClick={this.togglePopup}>X</Button>
                                    <Form onSubmit={this.handleSubmit}>
                                        <p>Only fill in information you wish to change</p>
                                        <FormGroup>
                                            <Label for='username'>Username:</Label>
                                            <br />
                                            <Input type='text' id='username' placeholder='enter new username' name='username' value={this.state.username} onChange={this.handleChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for='img'>Profile Picture:</Label>
                                            <br />
                                            <Input type='text' id='img' placeholder='enter image url' name='img' value={this.state.img} onChange={this.handleChange} />
                                        </FormGroup>
                                        <br />
                                        <Button type='submit'>Update</Button>
                                    </Form>
                                    <br />
                                    <Form onSubmit={this.handlePassSubmit}>
                                        <FormGroup>
                                            <Label for='password'>Password:</Label>
                                            <br />
                                            <Input type='password' id='password' placeholder='enter new password' name='password' value={this.state.password} onChange={this.handleChange} />
                                        </FormGroup>
                                        <br />
                                        <Button type='submit'>Update Password</Button>
                                    </Form>
                                </div>
                            </div> : <div></div>}
                        {this.state.deletePopup ?
                            <div className='modal'>
                                <h2>Are you sure you want to delete your account?</h2>
                                <Button onClick={e => this.setState({ deletePopup: false })}>Cancel</Button>
                                <Button onClick={this.deleteAccount}>Delete</Button>
                            </div>
                            : <div></div>}
                        <ProfileForum results={this.state.results} token={this.props.token} />

                    </div>
                </div>
            </div>
        )
    }
}
export default Profile;