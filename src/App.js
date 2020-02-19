import React, {Component} from 'react';
//Importing custom components
import {CardList} from "./components/card-list/card-list.js";
import {SearchBox} from "./components/serach-box/search-box";
import './App.css';

class App extends Component {
  constructor() {
    super(); //calls the constructor of component class

    this.state = {
      monsters: [],
      searchField: ""
    }
  }

  //life cycle method -> fetching users from api
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        //after fetching the response return to json format
        .then(users => this.setState({monsters: users}))
        //putting json data to the monsters array in constructor
  }

  handleChange = e => {
    this.setState({searchField: e.target.value});
  }

  render() {
    //easier way for ex. const monsters = this.state.monsters;
    const { monsters, searchField } =  this.state;
    const filterMonsters = monsters.filter(monster => (
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    ));

    return (
        //JSX syntax (HTML inside JS)
        <div className="App">
          <h1>Monster Rolodex</h1>
          <SearchBox placeholder='Search for monsters...' handleChange={this.handleChange}/>
          <CardList monsters={filterMonsters}/>
        </div>
    );
  }
}

export default App;
