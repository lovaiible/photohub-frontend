"use strict";

import React from 'react';

import {CategoryList} from '../components/CategoryList';
import CategoryService from '../services/CategoryService';
import LandingPage from "../components/LandingPage";


export class CategoryListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });

        CategoryService.getCategories().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <LandingPage>
                <CategoryList data={this.state.data}/>
            </LandingPage>
        );
    }
}
