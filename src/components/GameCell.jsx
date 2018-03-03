import React from 'react';

import cn from 'classnames';

import css from './GameCell.module.css';

class GameCell extends React.Component {
  componentDidMount () {
    this.elemRef.addEventListener('selected', this.props.onSelected)
  }
  render () {
    return <div className={cn(
        css.component,
        {
          [css.selected]: this.props.selected
        }
      )}
      ref={ref => this.elemRef = ref}
      >{this.props.letter}</div>
  }
}

export default GameCell;
