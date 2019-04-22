import React from 'react';
import { Button, CardBody } from 'reactstrap';
import EditComment from './EditComment';

class CommentBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
        }
    }
    toggleEdit = () => {
        this.setState({ edit: !this.state.edit })
    }
    render() {
        let userId = Number(this.props.userId)
        return (
            <div className='commentBody'>
                {this.state.edit ?
                    <EditComment edit={this.toggleEdit} token={this.props.token} comment={this.props.comment} />
                    : <CardBody>
                        <p>--{this.props.comment.username}--</p>
                        <p><b>{this.props.comment.comment}</b></p>
                    </CardBody>
                }
                {this.props.comment.owner_id === userId ?
                    <div>
                        {this.state.edit ? null : <Button onClick={(e) => { e.preventDefault(); this.toggleEdit() }}>Edit</Button> }
                        <Button color='danger' onClick={(e) =>{e.preventDefault(); this.props.handleDelete(this.props.comment.id)}}>Delete</Button>
                    </div>
                    : null}
            </div>
        )
    }
}

export default CommentBody;