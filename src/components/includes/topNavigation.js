import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from "react-router-dom";

import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBListGroupItem, MDBListGroup
} from 'mdbreact';
import logo from "../../assets/DFN Logo.png";

class TopNavigation extends Component {
    state = {
        collapse: false
    }

    onClick = () => {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
                <MDBNavbarBrand href="/dashboard" style={{backgroundColor : "white"}}>
                        <img alt="Procument System" src={logo} style={{width:"100px"}}/>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.onClick}/>
                <MDBCollapse isOpen={this.state.collapse} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem className="list-group-flush ">
                            <NavLink to="/dashboard" activeClassName="activeClass ">
                                <MDBListGroupItem>
                                    <MDBIcon icon="chart-pie" className="mr-3"/>
                                    Dashboard
                                </MDBListGroupItem>
                            </NavLink>
                        </MDBNavItem>
                        <MDBNavItem className="list-group-flush ">
                            <NavLink to="/chart" activeClassName="activeClass">
                                <MDBListGroupItem>
                                    <MDBIcon icon="user" className="mr-3"/>
                                    Table
                                </MDBListGroupItem>
                            </NavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

export default TopNavigation;