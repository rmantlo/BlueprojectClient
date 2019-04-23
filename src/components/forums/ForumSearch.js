import React from 'react';
import './ForumSearch.css';
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
                                <option value='Clinical Trials'>Clinical Trials</option>
                                <option value='Chemistry'>Chemistry</option>
                                <option value='Environmental'>Environmental</option>
                                <option value='Genetics'>Genetics</option>
                                <option value='Immunology'>Immunology</option>
                                <option value='Medicine'>Medicine</option>
                                <option value='Neuroscience'>Neuroscience</option>
                                <option value='Psychology'>Psychology</option>
                                <option value='Technology'>Technology</option>
                            </Input>
                        </FormGroup>
                        <Button className='greenBtn' type='submit'>Search</Button>
                    </Form>
                </div>
            </div>
        )
    }
}