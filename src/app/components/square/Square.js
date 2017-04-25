import React, {Component, PropTypes} from 'react';

export default class Square extends Component {
  constructor(props) {
    super(props);
    this.handleOnClickButton = this.handleOnClickButton.bind(this);
  }
  handleOnClickButton() {
    this.props.onClick(
      this.props.board,
      this.props.x,
      this.props.y
    );
  }
  render() {
    return (
      <button onClick={this.handleOnClickButton} className="square">
        {this.props.value}
      </button>
    );
  }
}

Square.propTypes = {
  onClick: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number,
  board: PropTypes.number,
  value: PropTypes.string
};
