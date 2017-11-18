import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { saveBookMarkAction, getBookMarkAction } from '../actions/bookmarkAction/bookmarkAction';
import '../css/Dashboard.css';

const mapStateToProps = (state) => {
    return {
        bookmarkList: state.bookmarkListReducer.bookmarkList
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveBookmark: (url, tags, callback) => {
            dispatch(saveBookMarkAction(url, tags, callback));
        },
        getBookmark: (callback) => {
            dispatch(getBookMarkAction(callback));
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

    componentDidMount() {
        this.props.getBookmark();
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
        this.props.saveBookmark(this.state.url, this.state.tags, this.onSaveResponse.bind(this, this.state.url, this.state.tags));
        this.setState({
            url: '',
            tags: []
        })
    }

    onSaveResponse(url, tags, respJson) {
        console.log('at SaveResponse');
        console.log(respJson.msg);
        if (respJson.msg) {
            this.props.getBookmark(() => {
                console.log('at dashboard'); 
                console.log(this.props.bookmarkList);
            });            
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
                                <input id="url" name="url" type="text" value={this.state.url} placeholder="bookmark url" className="url-input" required="" onChange={this.handleInputChange} />
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
                    <ul className="list-group">
                        {
                            this.props.bookmarkList ? this.props.bookmarkList.map((list, index) => {
                                var listTag = list.tags; 
                                return (
                                    <li key={index} className="list-group-item justify-content-between">
                                        {list.url ? 
                                            <a href={list.url}>{list.url}</a> : 'NO URL'} 
                                        {
                                            listTag.map(function (element, tagindex) {
                                                return(
                                                    <span key={tagindex} className="badge badge-default badge-pill">{element}</span>
                                                )
                                            })
                                        }
                                    </li>
                                )
                            }) : <li className="list-group-item ticketView">
                                    <div className="col-sm-5">
                                        <span>No Data avilable</span>
                                    </div>
                                </li>
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComp);
export default Dashboard;