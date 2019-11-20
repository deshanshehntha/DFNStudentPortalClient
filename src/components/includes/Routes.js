import React from 'react';
import {Route, Switch,Redirect} from 'react-router-dom';
import DashboardPage from '../../components/components/student/student.data.component';
import ChartHome from '../../components/components/student/student.charts.component'
import NotFoundPage from '../pages/NotFoundPage';


class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/home" render={() => (
                    <Redirect to="/dashboard"/>
                )}/>
                <Route exact path='/chart' component={DashboardPage}/>
                <Route path='/dashboard' component={ChartHome}/>
                <Route path='/404' component={NotFoundPage}/>
            </Switch>
        );
    }
}

export default Routes;
