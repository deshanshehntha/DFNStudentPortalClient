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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import {getAllUsers} from '../../../actions/users.actions'
import {bindActionCreators} from 'redux'
import Img from '../../../assets/Job-Fair-2016.jpg'
import ImgMob from '../../../assets/School-Graduation-Wallpaper-For-IPhone.jpg'
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBInput} from "mdbreact";
import * as classes from "swal/.eslintrc";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignInSide() {
    var classes = useStyles();

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
        SignInSide();
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

        return (

            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
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
