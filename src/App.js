import React from 'react';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import MainRoutes from '../src/components/includes/MainRoutes';
import './index.css';
import 'mdbreact/dist/css/mdb.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
        <div className="flexible-content" >
            <MainRoutes/>
        </div>
    </Router>
  );
}

export default App;
