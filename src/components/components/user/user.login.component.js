import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import {getAllUsers} from '../../../actions/users.actions'
import {bindActionCreators} from 'redux'
import Img from '../../../assets/Job-Fair-2016.jpg'
import ImgMob from '../../../assets/School-Graduation-Wallpaper-For-IPhone.jpg'
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBInput} from "mdbreact";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';
import logo from "../../../assets/DFN Logo.png";
import Background from "../../../assets/Job-Fair-2016.jpg"


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                DirectFN Student Info Portal
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


class UserLogin extends Component {

    constructor(props) {
        super(props);
        // reset login status
        // this.props.logout();
        this.state = {
            username: '',
            password: '',
            submitted: false,
            success: false,
            users: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({submitted: true});
        const {username, password} = this.state;
        let user = {
            email: username,
            password: password
        };
        if (username && password) {
            console.log("In the Login Component", username);
            this.props.getAllUsers(user);
        }
    }

    componentWillUpdate(nextState) {
        if (nextState.success) {
            this.props.history.push("/home");
            // window.location.reload();
        }
    }


    render() {
        const {loggingIn} = this.props;
        const {username, password, submitted} = this.state;
        const imageUrl = window.innerWidth >= 650 ? Img : ImgMob;
        const classes = this.props.classes;

        return (

            <Grid container component="main" style={{height: '100vh'}}>
                <CssBaseline/>
                <Grid item xs={false} sm={4} md={7} style={{
                    backgroundImage: `url(${Background})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
                      style={{
                          borderStyle: "solid",
                          borderColor: "#110e7e",
                          borderRadius: "5px",
                          outline: "5px solid white",
                          outlineOffset: "-10px"
                      }}>
                    <br/><br/><br/><br/>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margin: '10px',
                    }}>
                        <div style={{width:"30%",height:"20%"}}>
                            <img className="img-fluid" src={logo}/>
                        </div>
                        <br/><br/>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form style={{
                            form: {
                                width: '100%', // Fix IE 11 issue.
                            },
                        }} noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                autoComplete="email"
                                autoFocus
                                type="email"
                                id="defaultFormLoginEmailEx"
                                name="username" value={username}
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                id="password"
                                autoComplete="current-password"
                                type="password" name="password" value={password}
                                onChange={this.handleChange}

                            />
                            {/*<FormControlLabel*/}
                            {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                            {/*    label="Remember me"*/}
                            {/*/>*/}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Sign In
                            </Button>

                            <Box mt={5}>
                                <Copyright/>
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>

        );
    }
}


function mapStateToProps(state) {
    return {
        users: state.users.user,
        success: state.users.success
    }

}

function mapDispatchToProps(dispatch) {
    return {
        getAllUsers: bindActionCreators(getAllUsers, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
