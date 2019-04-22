import React from 'react';
//import './Logout.css';
import { Button } from 'reactstrap';

const Logout = (props) => {
    return (
        <Button className='greenBtn' onClick={props.logout}>Logout</Button>
    )
}


export default Logout;