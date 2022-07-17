import React from "react";
import  ReactDOM  from "react-dom/client";
import Square from "./components/Square";
import './index.css'
import { calcWinner } from "./func/calcWinner";

const initialState = {
  squares: Array(9).fill(null),
  xIsnext: true,
}
  
  class Board extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    
    handleClick(i) {
        const squares = this.state.squares.slice();
        
        if(calcWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsnext ? 'X' : 'O';
        this.setState({
          squares: squares,
          xIsnext: !this.state.xIsnext,
        })
        this.restart = this.restart.bind(this)
    }

    renderSquare(i) {
      return <Square value = {this.state.squares[i]}
      onClick = {() => this.handleClick(i)}
      />;
    }

    restart() {
      
      this.setState(initialState)
    }
  
    render() {

      const winner = calcWinner(this.state.squares);
      let status;

      if(winner) {
        status = `Winner is ${winner}`;
      } else {
        status =  'Next player: ' + (this.state.xIsnext ? 'X' : 'O');
      }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <button
           style={{marginTop: 20}}
           onClick = { this.restart}
           >Restart</button>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  