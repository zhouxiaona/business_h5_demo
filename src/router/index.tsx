import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Store from '../redux/store/Store';
import { browser } from '../utils/index'
import * as actionTypes from '../redux/constants/actionTypes'
import "../compontents/Loading/index.styl"
const Home = React.lazy(() => import("../page/Home"));
const About = React.lazy(() => import("../page/About"));
const AppRouter: React.FC = () => {
    useEffect(() => {
        if (browser.versions.ios) {
            Store.dispatch({
                type: actionTypes.SHARE_URL,
                data: {
                    url: window.location.href
                }
            })
        } else {
            Store.dispatch({
                type: actionTypes.SHARE_URL,
                data: {
                    url: false
                }
            })
        }
    });

    return (
        <Router>
            <Suspense fallback={<div className="Loading_box">
                <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
            </div>}>
                <div>
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/About' exact component={About} />
                        <Route render={() => <Redirect to="/" />} />
                    </Switch>
                </div>
            </Suspense>
        </Router>
    )

}

export default AppRouter