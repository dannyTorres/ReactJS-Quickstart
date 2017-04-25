import React, {Component, PropTypes} from 'react';
import Square from '../square/Square';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardArray: [0, 3, 6]
    };
    this.handleBoard = this.handleBoard.bind(this);
  }
  handleBoard(board, x, y) {
    this.props.onClick(board, x, y);
  }
  drawBoard(boardArray) {
    const draw = [];

    for (let i = 0; i < boardArray.length; i++) {
      draw.push(
        <div key={i} className="board-row">
          {this.renderSquare(boardArray, i)}
        </div>
      );
    }
    return draw;
  }
  renderSquare(boardArray, index) {
    const rows = [];
    for (let i = 0; i < 3; i++) {
      rows.push(<Square value={this.props.squares[boardArray[index] + i]} board={boardArray[index] + i} x={i + 1} y={index + 1} key={boardArray[index] + i} onClick={this.handleBoard}/>);
    }
    return rows;
  }
  render() {
    return (
      <div>
        {this.drawBoard(this.state.boardArray)}
      </div>
    );
  }
}

Board.propTypes = {
  squares: PropTypes.any,
  onClick: PropTypes.func
};
