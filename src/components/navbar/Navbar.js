import React from 'react';
import './Navbar.css';
//import { Link } from 'react-router-dom';
import {
    Button, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Nav, NavLink
} from 'reactstrap';
import Auth from '../auth/Auth';
import Logout from '../auth/Logout';
import logo from '../../assets/MedicalConnect.png'
import Radium from 'radium';
import Reorder from '@material-ui/icons/Reorder';

const styles= {
    img: {
        maxWidth: '100px',
        maxHeight: '60px',
        marginLeft: '25px'
    }
}

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            sessionToken: '',
            login: false,
            signup: false,
        }
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    handleLoginToggle = (e) => {
        e.preventDefault();
        this.setState({ login: true, signup: false })
    }
    handleSignupToggle = (e) => {
        e.preventDefault();
        this.setState({ signup: true, login: false })
    }

    render() {
        let buttonToggle = !this.props.sessionToken ? (
            <div className='navItems'>
                <NavbarToggler onClick={this.toggle}><Reorder /></NavbarToggler>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className='ml-auto' navbar>
                        <NavItem>
                            <Button className='greenBtn' onClick={this.handleSignupToggle} >Sign up</Button>
                        </NavItem>
                        <NavItem>
                            <Button className='greenBtn' onClick={this.handleLoginToggle} >Login</Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </div>
        ) : (
                <div className='navItems'>
                    <NavbarToggler onClick={this.toggle}><Reorder /></NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className='ml-auto' navbar>
                            <NavItem>
                                <NavLink href='/'>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href='/forums'>Forums</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href='/profile'>Profile</NavLink>
                            </NavItem>
                            <Logout logout={this.props.logout} />
                        </Nav>
                    </Collapse>
                </div>
            );

        return (
            <div className='nav'>
                <Navbar expand='md'>
                    <NavbarBrand href='/'><img style={styles.img} src={logo} alt='site logo' /></NavbarBrand>
                    {buttonToggle}
                </Navbar>
                <div>
                    {this.props.sessionToken ? null : <Auth setUserId={this.props.setUserId} setToken={this.props.setToken} signup={this.state.signup} />}
                </div>
            </div>
        )
    }
}

export default Radium(NavBar);