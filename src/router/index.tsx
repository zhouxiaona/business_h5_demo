import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Store from '../redux/store/Store';
import { browser } from '../utils/index'
import * as actionTypes from '../redux/constants/actionTypes'
import "../compontents/Loading/index.styl"
const About = React.lazy(() => import("../page/About"));
const Index = React.lazy(() => import("../page/Index"));
const Clear = React.lazy(() => import("../page/Clear"));

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Suspense fallback>
                <div>
                    <Switch>
                        <Route path='/' exact component={Index} />
                        <Route path='/About' exact component={About} />
                        <Route path='/Clear' exact component={Clear} />
                        <Route render={() => <Redirect to="/" />} />
                    </Switch>
                </div>
            </Suspense>
        </Router>
    )
}

export default AppRouter