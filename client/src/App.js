import './App.css';
import {Redirect, Route, Switch } from "react-router";
import Register from "./pages/Register";
import Posts from "./pages/Posts";
import {useSelector} from "react-redux";
import Login from "./pages/Login";

function App() {
  const {authorized} = useSelector(state => state.auth);

  if (!authorized){
    return (
      <Switch>
        <Route exact path={'/register'} component={Register}/>
        <Route exact path={'/login'} render={(props)=><Login firstProp={'kek'} {...props} />}/>
        {/*<Route exact path={'/login'} component={Login}/> тоже самое что и ^|^ */}
        <Redirect to={'/login'}/>
      </Switch>
    )
  }


  return (
    <>
     <Switch>
       <Route exact path={'/'} component={Posts}/>
       <Redirect to={'/'}/>
     </Switch>

    </>
  );
}

export default App;
