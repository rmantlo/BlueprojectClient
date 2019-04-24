import React from 'react';
import './Profile.css';
import './ProfileUser.css';
import './ProfileTabs.css';
import './ProfileModal.css';
import ProfileForum from './ProfileForum';
import ProfileComments from './ProfileComments';
import CreateForumPro from './CreateForumPro';
import { Button, Form, FormGroup, Label, Input, Alert, Nav, NavLink, NavItem, TabContent, TabPane, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Radium from 'radium';
import APIURL from '../../helpers/environment';

const styles = {
    danger: {
        position: 'absolute',
        marginTop: '100px',
        width: '100%',
        zIndex: 5,
        textAlign: 'center',
        height: '200px',
        padding: '50px',
        backgroundColor: '#E95041',
        color: 'black'
    }
}
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            userInfo: {},
            showPopup: false,
            deletePopup: false,
            activeTab: '1',
            password:'',
        }
    }
    componentDidMount() {
        this.fetchUserForums();
        this.fetchUserInfo();
    }
    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }
    fetchUserInfo = () => {
        fetch(`${APIURL}/userinfo/userinfo`, {
            method: 'GET',
            headers: {
                "Content-Type": "application",
                "Authorization": this.props.token
            }
        })
            .then(result => result.json())
            .catch(err => console.log(err))
            .then(result => {
                this.setState({ userInfo: result });
            })
        //console.log(this.state.results)
    }
    fetchUserForums = () => {
        fetch(`${APIURL}/forum/getmine`, {
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
        e.preventDefault();
        this.setState({ showPopup: !this.state.showPopup })
        console.log(this.state.showPopup);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value

        })
        console.log(this.state)
    }
    handlePassChange = (e) =>{
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit = (e) => {
        //e.preventDefault();
        fetch(`${APIURL}/userinfo/updateuser`, {
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
            fetch(`${APIURL}/userinfo/updatepassword`, {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": this.props.token
                },
                body: JSON.stringify(this.state)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
                .catch(err => console.log(err))
            alert('Password Changed')
        }
    }

    warnDelete = (e) => {
        e.preventDefault();
        this.setState({ deletePopup: true })
    }
    deleteAccount = () => {
        this.deleteUserPosts();
        this.deleteUserComments();
        this.setState({ deletePopup: false });
        fetch(`${APIURL}/userinfo/deleteuser`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application',
                "Authorization": this.props.token
            }
        })
            .then(response => response.json())
            .then(response => { console.log('user deleted'); this.setState({ results: [] }) })
        this.props.logout();
    }
    deleteUserPosts = () => {
        fetch(`${APIURL}/forum/deleteallbyuser`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application',
                "Authorization": this.props.token
            }
        })
            .then(response => response.json())
            .then(response => { console.log("deleted user's post deleted") })
    }
    deleteUserComments = () => {
        fetch(`${APIURL}/comments/deleteallbyuser`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.token
            }
        })
            .then(response => response.json())
            .then(response => { console.log("deleted user's comments deleted") })
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
                            <Button className='greenBtn' onClick={this.togglePopup}>Update User Information</Button>
                            <br />
                            <Button color='danger' className='deleteUser' onClick={this.warnDelete}>Delete Account</Button>
                        </div>
                        {this.state.showPopup ?
                            <div className='modal1'>
                                <div className='modalContent'>
                                    <Button id='xbtn' onClick={this.togglePopup}>X</Button>
                                    <Form onSubmit={this.handleSubmit}>
                                        <p>Only fill in new information</p>
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
                                        <Button className='greenBtn' type='submit'>Update</Button>
                                    </Form>
                                    <br />
                                    <Form onSubmit={this.handlePassSubmit}>
                                        <FormGroup>
                                            <Label for='password'>Password:</Label>
                                            <br />
                                            <Input type='password' id='password' placeholder='enter new password' name='password' value={this.state.password} onChange={this.handlePassChange} />
                                        </FormGroup>
                                        <br />
                                        <Button className='greenBtn' type='submit'>Update Password</Button>
                                    </Form>
                                </div>
                            </div> : <div></div>}
                        {this.state.deletePopup ?
                            <Alert style={styles.danger}>
                                <h2 id='deleteHeader'>Are you sure you want to delete your account?</h2>
                                <Button onClick={e => this.setState({ deletePopup: false })}>Cancel</Button>
                                <Button onClick={this.deleteAccount}>Delete</Button>
                            </Alert>
                            : <div></div>}
                        <div className='profileMain'>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink id='nav-link1' className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggleTab('1') }} >
                                        <h2 id='profileHeader'>User forum posts:</h2>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink id='nav-link1' className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggleTab('2') }} >
                                        <h2 id='profileHeader'>User Comments:</h2>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId='1'>
                                    <Row>
                                        <Col sm='12'>
                                        { this.state.results.length < 1 ?
                                            <CreateForumPro token={this.props.token} />
                                           : <ProfileForum fetchUserForums={this.fetchUserForums} userId={this.props.userId} results={this.state.results} token={this.props.token} />}
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId='2'>
                                    <Row>
                                        <Col sm='12'>
                                            <ProfileComments userId={this.props.userId} token={this.props.token} />
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default Radium(Profile);