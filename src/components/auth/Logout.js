import React from 'react';
import { Button } from 'reactstrap';

const Logout = (props) => {
    return (
        <Button href='/' className='greenBtn logoutBtn' onClick={props.logout}>Logout</Button>
    )
}


export default Logout;