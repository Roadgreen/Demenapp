import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Register from './components/user.components/Register'
import Login from './components/user.components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import UserDash from './components/user.components/UserDash';
import DashboardAdmin from './components/DashboardAdmin/DashboardAdmin'

const Root = () => (
  <BrowserRouter>
  <Switch>
    <Route exact path='/' component={App}></Route>
    <Route exact path='/register' component={Register}></Route>
    <Route exact path='/login' component={Login}></Route>
    <Route exact path='/api/user/:username' component={UserDash}></Route>
    <Route exact path='/DashboardAdmin/index' >
    <DashboardAdmin id={'index'}/>
    </Route>
    <Route exact path='/DashboardAdmin/fiche' >
    <DashboardAdmin id={'fiche'}/>
    </Route>
     <Route exact path='/DashboardAdmin/user' >
     <DashboardAdmin id={'user'}/>
     </Route>
  
    
  </Switch>
  </BrowserRouter>
)

ReactDOM.render(
  <React.StrictMode>
  <Root />
  </React.StrictMode>,
  document.getElementById('root')
);


