import React from 'react';
import logo from "../../assets/DFN Logo.png";
import {MDBListGroup, MDBListGroupItem, MDBIcon} from 'mdbreact';
import {NavLink} from 'react-router-dom';

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed ">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="Procument System" className="img-fluid" src={logo}/>
            </a>
            <MDBListGroup className="list-group-flush ">
                <NavLink to="/charts" activeClassName="activeClass ">
                    <MDBListGroupItem>
                        <MDBIcon icon="chart-pie" className="mr-3"/>
                        Dashboard
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/profile" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="user" className="mr-3"/>
                        Profile
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default TopNavigation;