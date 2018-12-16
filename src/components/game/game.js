import React, { Component } from 'react';
import Board from '../board/board';
import './game.css';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      result: null,
      xIsNext: true
    };
  }

  calculateWinner(squares) {
    const boardLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < boardLines.length; i++) {
      const [a, b, c] = boardLines[i];

      if (squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const result = this.state.result;
    const gameover = result || history.length > 9 ? true : false;

    if (gameover || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      result: this.calculateWinner(squares),
      xIsNext: !this.state.xIsNext
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const result = this.state.result;
    const gameover = result || history.length > 9 ? true : false;

    let gameStatus;

    if (result) {
      gameStatus = result + ' wins!';
    } else if (gameover) {
      gameStatus = "It's a draw."
    } else {
      gameStatus = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className={gameover ? 'game gameover' : 'game'}>
        {gameStatus}
        <Board
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}
        />
        {gameover
          ? <button className="replay">Play Again</button>
          : null
        }
      </div>
    );
  }
}

export default Game;