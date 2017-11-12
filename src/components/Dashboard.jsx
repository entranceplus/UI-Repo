import React, { Component } from 'react';
import Header from 'Header';
import { connect } from 'react-redux';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { saveBookMarkAction, getBookMarkAction } from '../actions/bookmarkAction/bookmarkAction';
import '../css/Dashboard.css';

const mapStateToProps = (state) => {
    //bookmarkList: this.state.bookmarkList
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveBookmark: (url, tags, callback) => {
            dispatch(saveBookMarkAction(url, tags, callback));
        },
        getBookmark: () => {
            dispatch(getBookMarkAction());
        }
    };
}

class DashboardComp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            tags: []
        };

        this.onSave = this.onSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleChange(tags) {
        this.setState({tags})
    }


    onSave() {
        console.log(this.state.url);
        console.log(this.state.tags);
        this.props.saveBookmark(this.state.url, this.state.tags, this.onSaveResponse.bind(this, this.state.url, this.state.tags));

    }

    onSaveResponse(url, tags, respJson) {
        if (respJson.msg && respJson.msg === "Links recorded") {
            this.props.getBookmark();
        } else {
            alert('error while saving');
        }
    }

    render() {
        return (
            <div>
                <Header />
                <form id="adminForm">
                    <div className="col-sm-12">
                        <div className="form-group col-sm-4 col-sm-offset-1">
                            <label className="control-label" htmlFor="url">Url</label>
                            <div className="">
                                <input id="url" name="url" type="text" placeholder="bookmark url" className="url-input" required="" onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="form-group col-sm-4">
                            <label className="control-label" htmlFor="tag">Tags</label>
                            <div>
                                <TagsInput name="tags" value={this.state.tags} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-group col-sm-2 col-xs-12">
                            <input type="button" className="btn btn-lg btn-primary" value="Save" id="saveBookmark" onClick={this.onSave} />
                        </div>
                    </div> 
                </form> 
                
                    <div className="col-sm-9" id="list-view">
                        <ul className="list-group ticketView">
                            <li className="list-group-item ticketView">
                                <div className="col-sm-5">
                                    <span className="badge pull-left">dkf</span>
                                </div>
                                skd ef wef ejflksdf
                            </li>
                            <li className="list-group-item ticketView">
                                <div className="col-sm-5">
                                    <span className="badge pull-left">dkf</span>
                                </div>
                                skdjflk wefsdf
                            </li>  
                            <li className="list-group-item ticketView">
                                <div className="col-sm-5">
                                    <span className="badge pull-left">dkf</span>
                                </div>
                                skdjfl wefwq efksdf
                            </li>
                        </ul>
                    </div>
                
            </div>
        )
    }
}

const Dashboard = connect(null, mapDispatchToProps)(DashboardComp);
export default Dashboard;