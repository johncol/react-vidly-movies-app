import React, { Component } from 'react';

class Favorite extends Component {
  render() {
    const classes = 'fa fa-heart' + (this.props.isFavorite ? '' : '-o');
    return (
      <i
        style={{ cursor: 'pointer' }}
        className={classes}
        aria-hidden="true"
        onClick={() => this.props.onToggleFavorite()}
      />
    );
  }
}

export default Favorite;
