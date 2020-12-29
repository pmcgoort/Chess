import {canMove} from './canMove';

export const check = function(board, turn){
  var isCheck = false
  var kingPos = []

  /*finds position of king*/
  for(let i = 0; i <= 7; i++){
    for(let j = 0; j <= 7; j++){
      if(board[i][j][0] !== turn[0] && board[i][j][1] === 'K'){
        kingPos.push(i)
        kingPos.push(j)
      }
    }
  }

  /*cycles through each piece to see if it can move to king's position*/
  for(let k = 0; k <= 7; k++){
    for(let m = 0; m <= 7; m++){
      if(canMove(board, k, m, kingPos[0], kingPos[1],turn, true, [[, [,]], [, [,]]])){
        isCheck = true
      }
    }
  }

  return isCheck
}
