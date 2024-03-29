"use strict";

import React from 'react';

import ReviewService from '../services/ReviewService';
import ProfileService from '../services/ProfileService';
import UserService from '../services/UserService';

import ReviewListItem from '../components/ReviewListItem';
import ReviewAverageValue from '../components/ReviewAverageValue';
import PhotographerDescription from '../components/PhotographerDescription';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, Cell, Grid} from 'react-md';

import Pagination from '../components/PaginationNew';

import {Link} from 'react-router-dom';
import Page from "../components/page/Page";

const countRowStyles = {
    margin: 'auto',
    width: '70%',
    border: '0px solid black',
    marginTop: '10px',
    padding: '5px'
};

const lineStyle = {
    width: '100%',
};

const fontStyleReviews = {
    fontSize: '18px'
};

const lineItemStyle = {
    listStyleType: 'none'
};

const marginNoReviews = {
    marginTop: '20px',
    marginBottom: '100px'
};

const itemsPerPage = 5;

export class ReviewItemListView extends React.Component {
    constructor(props) {
        super(props);
        let pId = this.props.match.params.id;
        this.state = {
            loading: true,
            avg: [],
            data: [],
            slicedReviews: [],
            pId: pId,
            page: 1,
            total: 0,
            countForNoti: 0,
            profile: [],
            title: '',
            description: '',
            city: '',
            noReviews: true,
            avgRating: 0,
            searchLink: '',
            pagiCount: 0
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(page) {
        const slicedReviews = this.state.data.slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage);
        this.setState({page, slicedReviews});
    }

    notifySuccess() {
        toast.success("Thank you! Your review could successfully be added!");
    }

    notifyDeleted() {
        toast.success("Your review could successfully be deleted!");
    }

    notifyUpdated() {
        toast.success("Your review could successfully be updated!");
    }

    notifyError() {
        toast.error("Something went wrong! Your review couldn't be added!");
    }

    notifyAborted() {
        toast.info("The review creation was aborted!");
    }

    componentWillMount() {
        this.setState({
            loading: true
        });

        ProfileService.getProfile(this.state.pId).then((data) => {
            this.setState({
                profile: data,
                city: data.location.city,
                description: data.description,
                title: data.title,
                pUserId: data.user._id,
            });
        }).catch((e) => {
            console.error(e);
        });

        ReviewService.getReviews(this.state.pId).then((data) => {
            this.setState({
                data: [...data],
                slicedReviews: data.slice(0, itemsPerPage),
                total: data.length,
                pagiCount: Math.ceil(data.length / itemsPerPage),
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });

        ReviewService.getAvgRating(this.state.pId).then((data) => {
            this.setState({
                avg: [...data],
                noReviews: false
            });
            if (this.state.avg.length != 0) {
                this.setState({
                    avgRating: data[0].avgRating
                });
            }
            this.setState({
            });
        }).catch((e) => {
            console.error(e);
        });
        this.setState({user: UserService.getCurrentUser(), userId: UserService.getCurrentUser().id});

        if(localStorage.getItem('city') == null){
          this.setState({
            searchLink: '/'
          });
        } else {
          this.setState({
            searchLink: '/results?city=' + localStorage.getItem('city') + '&category=' + localStorage.getItem('category') + '&date=' + localStorage.getItem('date')
          });
        }
    }

    componentDidUpdate() {
        if (this.state.countForNoti == 0) {
            if (localStorage.getItem('notification') == 'success') {
                this.notifySuccess();
                localStorage.removeItem('notification');
            } else if (localStorage.getItem('notification') == 'error') {
                this.notifyError();
                localStorage.removeItem('notification');
            } else if (localStorage.getItem('notification') == 'deleted') {
                this.notifyDeleted();
                localStorage.removeItem('notification');
            } else if (localStorage.getItem('notification') == 'aborted') {
                this.notifyDeleted();
                localStorage.removeItem('notification');
            } else if (localStorage.getItem('notification') == 'successUpdated') {
                this.notifyUpdated();
                localStorage.removeItem('notification');
            }
            this.setState({countForNoti: 1});
        }
    }

    render() {


        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        } else {
          let pagination = <Pagination
              margin={2}
              page={this.state.page}
              count={this.state.pagiCount}
              onPageChange={this.handlePageChange}/>;
            if (this.state.data.length > 0) {
                if (this.state.data.length > itemsPerPage) {
                    return (
                        <Page>
                            <div className="breadcrumbs">
                              <Link to={'/'} className="breadcrumbLink">Home</Link> > <Link to={'' + this.state.searchLink} className="breadcrumbLink">Search</Link> > <Link to={'/profile/' + this.state.pId} className="breadcrumbLink">{this.state.title}</Link> > <b>Reviews</b>
                            </div>
                            <div id="photographer-profile">
                                <div>
                                    <PhotographerDescription profile={this.state.profile} title={this.state.title}
                                                             city={this.state.city} size={'small'}
                                                             description={this.state.description} pID={this.state.pId}
                                                             avg={this.state.avg} avgRating={this.state.avgRating}
                                                             noReviews={false} disabledEdit={true}/>
                                </div>
                                <div style={countRowStyles}>
                                    <Grid>
                                        <Cell size={11} style={fontStyleReviews}>
                                            <ReviewAverageValue size={'big'} length={this.state.data.length}
                                                                avgRating={this.state.avgRating}/>
                                        </Cell>
                                        <Cell size={1}>
                                            <Button floating primary swapTheming
                                                    onClick={() => this.props.history.push('/addReview/' + this.state.pId)}
                                                    disabled={this.state.buttonDisabled}>add</Button>
                                        </Cell>
                                    </Grid>
                                </div>
                                <hr className="horizontalLine" style={lineStyle}/>
                            </div>
                            <ul id="review-list">
                                {
                                    this.state.slicedReviews.map((review) =>
                                        <li key={review._id} id="review-list" style={lineItemStyle}>
                                            <ReviewListItem review={review} user={this.state.user} pId={this.state.pId}
                                                            history={this.props.history}/>
                                        </li>)
                                }
                            </ul>
                            {pagination}
                        </Page>
                    );
                } else {
                    return (
                        <Page>
                        <div className="breadcrumbs">
                          <Link to={'/'} className="breadcrumbLink">Home</Link> > <Link to={'' + this.state.searchLink} className="breadcrumbLink">Search</Link> > <Link to={'/profile/' + this.state.pId} className="breadcrumbLink">{this.state.title}</Link> > <b>Reviews</b>
                        </div>
                            <div id="photographer-profile">
                                <div>
                                    <PhotographerDescription profile={this.state.profile} title={this.state.title}
                                                             city={this.state.city} avgRating={this.state.avgRating}
                                                             description={this.state.description} size={'small'}
                                                             pID={this.state.pId} avg={this.state.avg}
                                                             noReviews={this.state.noReviews} disabledEdit={true}/>
                                </div>
                                <div style={countRowStyles}>
                                    <Grid>
                                        <Cell size={11} style={fontStyleReviews}>
                                            <ReviewAverageValue size={'big'} length={this.state.data.length}
                                                                avgRating={this.state.avgRating}
                                                                noReviews={this.state.noReviews}/>
                                        </Cell>
                                        <Cell size={1}>
                                            <Button floating primary swapTheming
                                                    onClick={() => this.props.history.push('/addReview/' + this.state.pId)}
                                                    disabled={this.state.buttonDisabled}>add</Button>
                                        </Cell>
                                    </Grid>
                                </div>
                                <hr className="horizontalLine" style={lineStyle}/>
                            </div>
                            <ul id="review-list">
                                {
                                    this.state.slicedReviews.map((review) =>
                                        <li key={review._id} id="review-list" style={lineItemStyle}>
                                            <ReviewListItem review={review} user={this.state.user} pId={this.state.pId}
                                                            history={this.props.history}/>
                                        </li>)
                                }
                            </ul>
                        </Page>
                    );
                }
            } else {
                return (
                    <Page>
                    <div className="breadcrumbs">
                      <Link to={'/'} className="breadcrumbLink">Home</Link> > <Link to={'' + this.state.searchLink} className="breadcrumbLink">Search</Link> > <Link to={'/profile/' + this.state.pId} className="breadcrumbLink">{this.state.title}</Link> > <b>Reviews</b>
                    </div>
                        <div id="photographer-profile">
                            <div>
                                <PhotographerDescription profile={this.state.profile} title={this.state.title}
                                                         city={this.state.city} disabledEdit={true}
                                                         description={this.state.description} size={'small'}
                                                         avgRating={0} pID={this.state.pId} noReviews={true}/>
                            </div>
                            <hr className="horizontalLine" style={lineStyle}/>
                            <div style={marginNoReviews}>
                                <b>There are no reviews yet!</b>
                            </div>
                        </div>
                    </Page>
                );
            }
        }
    }
}
