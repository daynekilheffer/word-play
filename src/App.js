import React, { Component } from 'react';

import GameGrid from './components/GameGrid';

const ten = [0,1,2,3,4,5,6,7,8,9];

if (localStorage.getItem('word-play-grid') === null) {
  const grid = ten.map(y => {
    return ten.map(x => {
      return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    })
  });
  localStorage.setItem('word-play-grid', JSON.stringify(grid))
}


class App extends Component {
  render() {
    return (
      <GameGrid />
    );
  }
}

export default App;
