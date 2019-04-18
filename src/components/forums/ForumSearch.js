import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

export default class ForumSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        //console.log(this.state.keyword)
        return (
            <div className='sideSearchHolder'>
                <div className='sideSearch'>
                    <h3>Forum search</h3>
                    <Form onSubmit={this.props.toggleSearch} id={this.state.keyword}>
                        <FormGroup>
                            <Label for='keyword'>Keyword:</Label> <br />
                            <Input type='select' name='keyword' value={this.state.keyword} onChange={this.handleChange}>
                                <option></option>
                                <option value='Medical'>Medical</option>
                                <option value='Environmental'>Environmental</option>
                                <option value='Chemistry'>Chemistry</option>
                                <option value='Technology'>Technology</option>
                            </Input>
                        </FormGroup>
                        <Button type='submit'>Search</Button>
                    </Form>
                </div>
            </div>
        )
    }
}