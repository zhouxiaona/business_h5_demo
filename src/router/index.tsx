import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Store from '../redux/store/Store';
import { browser } from '../utils/index'
import * as actionTypes from '../redux/constants/actionTypes'
import "../compontents/Loading/index.styl"
const Home = React.lazy(() => import("../page/Home"));
const About = React.lazy(() => import("../page/About"));
const Index = React.lazy(() => import("../page/Index"));
const GamePannel = React.lazy(() => import("../page/GamePannel"))
const DragMove = React.lazy(() => import("../page/DragMove"));

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Suspense fallback>
                <div>
                    <Switch>
                        <Route path='/' exact component={GamePannel} />
                        <Route path='/About' exact component={About} />
                        <Route path='/Home' exact component={Home} />
                        <Route path='/Index' exact component={Index} />
                        <Route render={() => <Redirect to="/" />} />
                    </Switch>
                </div>
            </Suspense>
        </Router>
    )
}

export default AppRouter