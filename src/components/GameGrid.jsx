import React from 'react';

import GameCell from './GameCell';

import css from './GameGrid.module.css';

class GameGrid extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      startTarget: {},
      endTarget: {}
    };
  }
  componentWillMount () {
    this.setState({
      grid: JSON.parse(localStorage.getItem('word-play-grid'))
    });
  }

  triggerTarget (e) {
    const { clientX, clientY } = e.touches[0];
    const elem = document.elementFromPoint(clientX, clientY);
    elem.dispatchEvent(new Event('selected'))
  }

  finalizeSelection () {
    console.log(this.state);
    this.getSelectedCells()
    this.setState({
      startTarget: {},
      endTarget: {},
    })
  }

  getSelectedCells () {
    let rowStart = this.state.startTarget.row
    let rowEnd = this.state.endTarget.row
    if (this.state.startTarget.row > this.state.endTarget.row) {
      rowStart = this.state.endTarget.row
      rowEnd = this.state.startTarget.row
    }

    let colStart = this.state.startTarget.col
    let colEnd = this.state.endTarget.col
    if (this.state.startTarget.col > this.state.endTarget.col) {
      colStart = this.state.endTarget.col
      colEnd = this.state.startTarget.col
    }

    console.log(rowStart, rowEnd, colStart, colEnd);

    const cells = [];
    for (let i = rowStart; i <= rowEnd; i++) {
      for (let j = colStart; j <= colEnd; j++) {
        cells.push({
          row: i,
          col: j,
          val: this.state.grid[i][j]
        })
      }
    }

    console.log(cells);
  }

  setSelected (row, col) {
    if (typeof this.state.startTarget.row === 'undefined') {
      const target = {row, col}
      this.setState({
        startTarget: target,
        endTarget: target,
      })
    } else if (this.state.startTarget.row === row || this.state.startTarget.col === col) {
      this.setState({
        endTarget: {
          row,
          col,
        }
      })
    } else {
      this.setState({
        endTarget: this.state.startTarget,
      })
    }

  }

  isBetween (testVal, idx1, idx2) {
    return (testVal >= idx1 && testVal <= idx2 ) || (testVal <= idx1 && testVal >= idx2 )
  }

  isSelected (row, col) {
    if (typeof this.state.startTarget.row === 'undefined') {
      return false;
    }

    if (row === this.state.startTarget.row && this.isBetween(col, this.state.startTarget.col, this.state.endTarget.col)) {
      return true;
    }
    if (col === this.state.startTarget.col && this.isBetween(row, this.state.startTarget.row, this.state.endTarget.row)) {
      return true;
    }

  }

  render () {
    const { grid } = this.state;

    return <table className={css.component}
        onTouchStart={e => this.triggerTarget(e)}
        onTouchMove={e => this.triggerTarget(e)}
        onTouchEnd={e => this.finalizeSelection()}>
      <tbody>
        {Object.values(grid).map((val, rowIdx) => {
          return <tr key={rowIdx}>
            {val.map((letter, colIdx) => (
              <td key={colIdx} className={css.item}>
                <GameCell letter={letter}
                  selected={this.isSelected(rowIdx, colIdx)}
                  onSelected={() => this.setSelected(rowIdx, colIdx)}/>
              </td>
            ))}
          </tr>
        })}
      </tbody>
    </table>
  }
}

export default GameGrid;
