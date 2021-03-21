import './App.css';
import {Route, BrowserRouter as Router} from 'react-router-dom'
import AddEmployee from './components/AddEmployee';
import List from './components/List';
import EmployeePage from './components/EmployeePage';

function App() {
  return (
    <div className="App">
      <Router>
          <Route exact path="/" component={List}/>
          <Route path="/addemployee" component={AddEmployee}/>
          <Route path="/employee/:id" component={EmployeePage}/>
      </Router>
    </div>
  );
}

export default App;
