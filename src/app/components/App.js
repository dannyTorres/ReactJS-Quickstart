import React, {Component} from 'react';
import Board from './board/Board';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0,
      coordinates: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleJumpTo = this.handleJumpTo.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleClick(board, x, y) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const coordinates = this.state.coordinates.slice(0, this.state.stepNumber);
    const a = document.getElementsByTagName('A');

    if (this.calculateWinner(squares) || squares[board]) {
      return;
    }
    for (const A of a) {
      A.removeAttribute('style');
    }
    squares[board] = this.state.xIsNext ? 'X' : 'O';
    coordinates.push(`[x = ${x}, y = ${y}]`);

    this.setState({
      history: history.concat([{
        squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      coordinates
    }, () => {
      a[a.length - 1].style.color = 'red';
      a[a.length - 1].style.fontWeight = 'bold';
    });
  }
  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], lines[i]];
      }
    }
    return null;
  }
  highLight(winner) {
    const square = document.getElementsByClassName('square');
    for (let i = 0; i < square.length; i++) {
      if (i === winner[1][0] || i === winner[1][1] || i === winner[1][2]) {
        square[i].style.backgroundColor = 'yellow';
      }
    }
  }
  handleJumpTo(e) {
    const tag = e.target;
    const step = Number(tag.getAttribute('value'));
    const a = document.getElementsByTagName('A');
    const square = document.getElementsByClassName('square');

    for (const S of square) {
      S.removeAttribute('style');
    }

    for (const A of a) {
      A.removeAttribute('style');
    }

    tag.style.color = 'red';
    tag.style.fontWeight = 'bold';
    let turn;
    if (step % 2) {
      turn = false;
    } else {
      turn = true;
    }
    this.setState({
      xIsNext: turn,
      stepNumber: step
    });
  }
  handleReset() {
    const square = document.getElementsByClassName('square');
    for (const S of square) {
      S.removeAttribute('style');
    }

    this.setState({
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0,
      coordinates: []
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    const coordinates = this.state.coordinates;

    let status;
    if (winner) {
      status = `Winner: ${winner[0]}`;
      this.highLight(winner);
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
      const desc = move ?
      `Move # ${move} => ${coordinates[move - 1]}` :
      'Game start';

      return (
        <li key={move}>
          <a href="#" value={move} onClick={this.handleJumpTo}>{desc}</a>
        </li>
      );
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board onClick={this.handleClick} squares={current.squares}/>
          {winner ? (<button onClick={this.handleReset}>Reset</button>) : (<p/>)}
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
