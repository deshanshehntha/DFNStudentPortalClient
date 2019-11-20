import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";

import Routes from '../includes/Routes';
import TopNavigation from '../includes/topNavigation';
import SideNavigation from '../includes/sideNavigation';
import Footer from '../includes/Footer';
import DashboardPage from "../components/student/student.data.component";
import {MDBContainer} from "mdbreact";
import Grid from "@material-ui/core/Grid";
// import '../../index.css';


function Main() {
    return (
        <Router>
            <div className="flexible-content" >
                <TopNavigation/>
                <br/><br/>
                <div className="flexible-content" >
                    <Routes />
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default Main;
