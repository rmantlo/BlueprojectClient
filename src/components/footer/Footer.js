import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import Radium from 'radium';

const styles = {
    p: {
        margin: 0
    },
    all: {
        textAlign: 'center',
        borderTop: '2px solid lightgrey'
    },
    link: {
        color: 'purple'
    }

}

const Footer = () => {
    return (
        <footer style={styles.all} className='footer'>
            <Link style={styles.link} to='/'>Home</Link><br/>
            <Link style={styles.link} to='/contact'>Contact</Link>
            <p style={styles.p} >© Mantlo 2019</p>
        </footer>
    )
}

export default Radium(Footer);