import React from 'react';
import {Route, Switch,Redirect} from 'react-router-dom';
import UserLogin from '../../components/components/user/user.login.component';
import Main from '../pages/MainPage';

class MainRoutes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/' exact component={UserLogin}/>
                <Route path='/home' component={Main}/>
                <Route render={() => <Redirect to={{pathname: "/"}} />} />
            </Switch>
        );
    }
}

export default MainRoutes;