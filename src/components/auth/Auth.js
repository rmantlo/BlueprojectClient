import React from 'react';
import Login from './Login';
import Signup from './Signup';
import './Auth.css';
import Radium from 'radium';

const styles = {
    modal: {
        border: '2px solid lightgrey',
        backgroundColor: '#EEEEEE',
        borderRadius: '20px',
        boxShadow: '2px 2px 2px',
        marginTop: '50px',
    }
}

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <div style={styles.modal} className='auth' >
                {!this.props.signup ? <Login setUserId={this.props.setUserId} setToken={this.props.setToken} /> : null}
                {this.props.signup ? <Signup setUserId={this.props.setUserId} setToken={this.props.setToken} /> : null}
            </div>
        )
    }
}

export default Radium(Auth);