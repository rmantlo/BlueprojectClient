import React from 'react';
import {  Button, CardBody } from 'reactstrap';
import EditComment from './EditComment';

class CommentBody extends React.Component {
    constructor(props){
        super(props);
        this.state={
            edit: false,
        }
    }
    toggleEdit = (e) => {
        e.preventDefault();
        this.setState({ edit: !this.state.edit })
    }
    render() {
        return (
            <div>
                {this.state.edit ?
                    <EditComment token={this.props.token} comment={this.props.comment} />
                    : <CardBody>
                        {this.props.comment.comment}
                        <p>--{this.props.comment.username}--</p>
                    </CardBody>
                }
                <Button onClick={this.toggleEdit}>Edit</Button>
            </div>
        )
    }
}

export default CommentBody;