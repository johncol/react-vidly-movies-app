import React, { Component } from 'react';

class ListGroup extends Component {
  render() {
    return (
      <ul className="list-group list-group-flush">
        {this.props.items.map(item => (
          <a
            key={item[this.props.propertyId]}
            className={this.getItemClasses(item)}
            onClick={() => this.props.onItemSelected(item)}
          >
            {item[this.props.propertyToDisplay]}
          </a>
        ))}
      </ul>
    );
  }

  getItemClasses = item => {
    const defaultClasses = 'list-group-item list-group-item-action';
    return this.props.selectedItem === item
      ? defaultClasses + ' active'
      : defaultClasses;
  };
}

ListGroup.defaultProps = {
  propertyId: '_id',
  propertyToDisplay: 'name'
};

export default ListGroup;
