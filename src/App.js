import './App.css';
import {Route, BrowserRouter as Router} from 'react-router-dom'
import AddEmployee from './components/AddEmployee';
import List from './components/List';
import EmployeePage from './components/EmployeePage';
import Header from './components/Header';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Route exact path="/" component={List}/>
        <Route path="/addemployee" component={AddEmployee}/>
        <Route path="/employee/:id" component={EmployeePage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/token/:token" component={LoginPage}/>
      </Router>
    </div>
  );
}

export default App;
