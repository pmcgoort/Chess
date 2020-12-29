import {canMove} from './canMove';

export const stalemate = function(board, turn){

  var tempTurn = 'White'
  if(turn === 'White'){
    tempTurn = 'Black'
  }

  var pieceCount = 0
  /*checks to see if kings are only pieces left*/
  for(let i = 0; i <= 7; i++){
    for(let j = 0; j <= 7; j++){
      if(board[i][j] !== ' '){
        pieceCount++
      }
    }
  }

  if(pieceCount === 2){
    return true
  }

  /*will search through and see if any piece can make a move that gets out of check*/
  for(let i = 0; i <= 7; i++){
    for(let j = 0; j <= 7; j++){
      if(board[i][j] !== ' ' && board[i][j][0] !== turn[0]){
        for(let k = 0; k <= 7; k++){
          for(let m = 0; m <= 7; m++){
            if(canMove(board, i, j, k, m, tempTurn, false, [[, [,]], [, [,]]])){
              return false
            }
          }
        }
      }
    }
  }



  return true
}
