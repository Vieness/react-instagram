import './App.css';
import {Redirect, Route, Switch } from "react-router";
import Register from "./pages/Register";
import Posts from "./pages/Posts";
import {useSelector} from "react-redux";

function App() {
  const {authorized} = useSelector(state => state.auth);

  if (!authorized){
    return (
      <Switch>
        <Route exact path={'/register'} component={Register}/>
        <Redirect to={'/register'}/>
      </Switch>
    )
  }

  return (
    <>
     <Switch>
       <Route exact path={'/posts'} component={Posts}/>
     </Switch>

    </>
  );
}

export default App;
