import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import EngageId from './Pages/EngageId';
import StudentId from './Pages/StudentId';
import { isIOS } from './Utilties';

const App = () => (
    <Router>
        <div
            id='app-root'
            style={{ position: 'absolute', height: '100%', width: '100%' }}
        >
            <Switch>
                <Route path='/studentId'>
                    <StudentId />
                </Route>
                <Route path='/engageId'>
                    <EngageId ios={isIOS()} />
                </Route>
                <Route path='/'>
                    <Home />
                </Route>
            </Switch>
        </div>
    </Router>
);

export default App;
