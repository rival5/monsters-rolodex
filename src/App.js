import React, { Component } from 'react';
import { CardList } from './components/cardList/cardList.component';
import { SearchBox } from './components/searchBox/searchBox.component';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  // componentDidMount() {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response => response.json())
  //     .then(users => this.setState({ monsters: users }));
  // }
  async componentDidMount() {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const resJSON = await res.json();
      this.setState({ monsters: resJSON });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <SearchBox
          placeholder="search monsters"
          handleChange={e => this.setState({ searchField: e.target.value })}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
