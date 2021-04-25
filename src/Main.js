import React, { Component } from 'react';
import {canMove} from './canMove';
import {check} from './check';
import {checkmate} from './checkmate';
import {stalemate} from './stalemate';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [['WR','WN','WB','WQ','WK','WB','WN','WR'],
              ['WP','WP','WP','WP','WP','WP','WP','WP'],
              [' ',' ',' ',' ',' ',' ',' ',' '],
              [' ',' ',' ',' ',' ',' ',' ',' '],
              [' ',' ',' ',' ',' ',' ',' ',' '],
              [' ',' ',' ',' ',' ',' ',' ',' '],
              ['BP','BP','BP','BP','BP','BP','BP','BP'],
              ['BR','BN','BB','BQ','BK','BB','BN','BR']],
      clicked: [false, 8, 8, 8, 8],
      turn: 'White',
      message: '',
      canCastle: [[true, [true, true]], [true, [true, true]]],
      changePawn: false
    }
    this.move = this.move.bind(this)
    this.clicked = this.clicked.bind(this)
    this.reset = this.reset.bind(this)
    this.changePawn = this.changePawn.bind(this)
  }

  move(){

    var board = this.state.board
  /*i=final row, j=final col, k=initial row, m=initial col*/
    var k = this.state.clicked[1]
    var m = this.state.clicked[2]
    var i = this.state.clicked[3]
    var j = this.state.clicked[4]

    /*determines based on piece if that piece can perfom move*/
    if(canMove(board, k, m, i, j, this.state.turn, false, this.state.canCastle)){
      board[i][j] = board[k][m]
      board[k][m] = ' '
      var turn = 'White'
      if(this.state.turn === 'White'){
        turn = 'Black'
      }
      /*changes if castle or king moves to not allow castling in the future*/
      var canCastle = this.state.canCastle
      if(k === 0){
        if(m === 0){
          canCastle[0][1][0] = false
        } else if(m === 7){
          canCastle[0][1][1] = false
        } else if(m === 4){
          canCastle[0][0] = false
        }
      } else if(k === 7){
          if(m === 0){
            canCastle[1][1][0] = false
          } else if(m === 7){
            canCastle[1][1][1] = false
          } else if(m === 4){
            canCastle[1][0] = false
          }
        }
        /*moving the rook when castling*/
        if(board[i][j][1] === 'K' && Math.abs(j - m) === 2){
          if(j === 2){
            board[i][3] = board[i][0]
            board[i][0] = ' '
          } else {
            board[i][5] = board[i][7]
            board[i][7] = ' '
          }
        }

      this.setState({
        board: board,
        clicked: [false, 8, 8, 8, 8],
        turn: turn,
        canCastle: canCastle
      })
    } else {
      this.setState({
        clicked: [false, 8, 8, 8, 8]
      })
      return
    }
    var message = ''
    if(check(board, this.state.turn)){
      if(checkmate(board, this.state.turn)){
        message = 'Checkmate'
      } else {
        message = 'Check'
      }
    } else if(stalemate(board, this.state.turn)){
      message = 'Stalemate'
    }
    this.setState({
      message: message
    })
  }

  clicked = (i, j) => () => {
    var correctTurn = false
    if(this.state.board[i][j][0] === this.state.turn[0]){
        correctTurn = true
    }

    if(this.state.board[i][j] !== ' ' && !this.state.clicked[0] && correctTurn){
      this.setState((state) => ({
        clicked: [true, i, j, 8, 8]
      }))
    } else if(this.state.clicked[0]){
        var clicked = this.state.clicked
        clicked[3] = i
        clicked[4] = j
        this.setState({
          clicked: clicked
        })
        this.move()
      }
  }

  reset(){
    this.setState({
      board: [['WR','WN','WB','WQ','WK','WB','WN','WR'],
              ['WP','WP','WP','WP','WP','WP','WP','WP'],
              [' ',' ',' ',' ',' ',' ',' ',' '],
              [' ',' ',' ',' ',' ',' ',' ',' '],
              [' ',' ',' ',' ',' ',' ',' ',' '],
              [' ',' ',' ',' ',' ',' ',' ',' '],
              ['BP','BP','BP','BP','BP','BP','BP','BP'],
              ['BR','BN','BB','BQ','BK','BB','BN','BR']],
      clicked: [false, 8, 8, 8, 8],
      turn: 'White',
      message: '',
      canCastle: [[true, [true, true]], [true, [true, true]]],
      changePawn: false
    })
  }

  changePawn = (e) => () => {
    var board = this.state.board
    for(let i = 0; i <= 7; i += 7){
      for(let j = 0; j <= 7; j++){
        if(board[i][j][1] === 'P'){
          board[i][j] = board[i][j][0] + e
        }
      }
    }
    this.setState({
      board: board
    })

    var turn = 'White'
    if(this.state.turn === 'White'){
      turn = 'Black'
    }

    var message = ''
    if(check(board, turn)){
      if(checkmate(board, turn)){
        message = 'Checkmate'
      } else {
        message = 'Check'
      }
    } else if(stalemate(board, turn)){
      message = 'Stalemate'
    }
    this.setState({
      message: message
    })
  }

  render(){
    const board = this.state.board
    var pawnChange = 'hide'

    for(let i = 0; i <= 7; i += 7){
      for(let j = 0; j <= 7; j++){
        if(board[i][j][1] === 'P'){
          pawnChange = 'show'
        }
      }
    }

    var turn = '\u2659'
    if(this.state.turn === 'Black'){
      turn = '\u265F'
    }

    return(
      <div id="main">
        {
          board.map((i, index) => {
            return(
            <div class='newRow'>
            {
              i.map((j, jndex) => {
                var squareColor = 'blackSquare square'
                if((index + jndex) % 2 === 1){
                  squareColor = 'whiteSquare square'
                }
                if((index === this.state.clicked[1] && jndex === this.state.clicked[2])){
                  squareColor = 'clickedSquare square'
                }

                /*assigns the piece icon to each square*/
                var piece
                var pieceClass = 'piece'

                switch (board[index][jndex]){
                  case 'WK':
                    piece = '\u2654'
                  break;

                  case 'WQ':
                    piece = '\u2655'
                  break

                  case 'WR':
                    piece = '\u2656'
                  break

                  case 'WB':
                    piece = '\u2657'
                  break

                  case 'WN':
                    piece = '\u2658'
                  break

                  case 'WP':
                    piece = '\u2659'
                  break


                  case 'BK':
                    piece = '\u265A'
                  break;

                  case 'BQ':
                    piece = '\u265B'
                  break

                  case 'BR':
                    piece = '\u265C'
                  break

                  case 'BB':
                    piece = '\u265D'
                  break

                  case 'BN':
                    piece = '\u265E'
                  break

                  case 'BP':
                    piece = '\u265F'
                  break

                  default:
                    piece = 'l'
                    pieceClass = 'piece emptySquare'
                  break;
                }
                if(this.state.message !== 'Checkmate' && this.state.message !== 'Stalemate'){
                  return(
                    <div class={squareColor} onClick={this.clicked(index, jndex)}>
                      <div class={pieceClass}>{piece}</div>
                    </div>
                  )
                } else {
                  return(
                    <div class={squareColor}>
                      <div class={pieceClass}>{piece}</div>
                    </div>
                  )
                }
              })
            }
            </div>
          )
          })
        }
        <button id='reset' onClick={this.reset}>New Game</button>
        <p id='turn'>{turn}</p>
        <p id='message'>{this.state.message}</p>
        <div id='pawnChange' class={pawnChange}>
          <p>Change Pawn to:</p>
          <button id='queen' class='pawnChangeButton' onClick={this.changePawn('Q')}>Queen</button>
          <button id='bishop' class='pawnChangeButton' onClick={this.changePawn('B')}>Bishop</button>
          <button id='knight' class='pawnChangeButton' onClick={this.changePawn('N')}>Knight</button>
          <button id='rook' class='pawnChangeButton' onClick={this.changePawn('R')}>Rook</button>
        </div>
      </div>
    )
  }
}

export default Main;
