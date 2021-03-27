import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './Main.scss'
import Home from './pages/Home'

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}
