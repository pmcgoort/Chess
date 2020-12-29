import {check} from './check';

export const canMove = function(board, k, m, i, j, turn, endOfTurn, canCastle) {

  if (board[i][j][0] === board[k][m][0]) {
    return false
  }

  var canMove = false
  switch (board[k][m][1]) {
    /*Pawn*/
    case 'P':
      if (m === j && board[i][j] === ' ') {
        if (board[k][m][0] === 'B') {
          if (i === k - 1 || (i === k - 2 && k === 6)) {
            canMove = true
          }
        } else {
          if (i === k + 1 || (i === k + 2 && k === 1)) {
            canMove = true
          }
        }
      }
      if (m === j + 1 || m === j - 1) {
        if (board[k][m][0] === 'B' && board[i][j][0] === 'W' && i === k - 1) {
          canMove = true
        } else if (board[k][m][0] === 'W' && board[i][j][0] === 'B' && i === k + 1) {
          canMove = true
        }
      }

      break

      /*Rook*/
    case 'R':
      var change = 1
      if (k === i) {
        if (m === j) {
          break
        }
        if (m > j) {
          change = -1
        }
        canMove = true
        for (let n = m + change; n !== j; n += change) {
          if (board[i][n] === ' ') {
            canMove = true
          } else {
            canMove = false
            break
          }
        }
      } else if (m === j) {
        if (k > i) {
          change = -1
        }
        canMove = true
        for (let n = k + change; n !== i; n += change) {
          if (board[n][j] === ' ') {
            canMove = true
          } else {
            canMove = false
            break
          }
        }
      }
      break

      /*Knight*/
    case 'N':
      var rowDiff = Math.abs(i - k)
      var colDiff = Math.abs(j - m)

      if ((rowDiff === 1 && colDiff === 2) || (rowDiff === 2 && colDiff === 1)) {
        canMove = true
      }
      break

      /*Bishop*/
    case 'B':
      if (Math.abs(i - k) === Math.abs(j - m) && Math.abs(i - k) !== 0) {
        canMove = true
        var rowChange = 1
        var colChange = 1
        if (i < k) {
          rowChange = -1
        }
        if (j < m) {
          colChange = -1
        }

        var rowSpot = k + rowChange
        var colSpot = m + colChange
        while (rowSpot !== i) {
          if (board[rowSpot][colSpot] !== ' ') {
            canMove = false
          }
          rowSpot += rowChange
          colSpot += colChange
        }
      }
      break

      /*Queen*/
    case 'Q':
      if (Math.abs(i - k) === Math.abs(j - m) && Math.abs(i - k) !== 0) {
        canMove = true
        var rowChange = 1
        var colChange = 1
        if (i < k) {
          rowChange = -1
        }
        if (j < m) {
          colChange = -1
        }

        var rowSpot = k + rowChange
        var colSpot = m + colChange
        while (rowSpot !== i) {
          if (board[rowSpot][colSpot] !== ' ') {
            canMove = false
          }
          rowSpot += rowChange
          colSpot += colChange
        }
      }
      if (!canMove) {
        var change = 1
        if (k === i) {
          if (m === j) {
            break
          }
          if (m > j) {
            change = -1
          }
          canMove = true
          for (let n = m + change; n !== j; n += change) {
            if (board[i][n] === ' ') {
              canMove = true
            } else {
              canMove = false
              break
            }
          }
        } else if (m === j) {
          if (k > i) {
            change = -1
          }
          canMove = true
          for (let n = k + change; n !== i; n += change) {
            if (board[n][j] === ' ') {
              canMove = true
            } else {
              canMove = false
              break
            }
          }
        }
      }
      break

      /*King*/
    case 'K':
      if (Math.abs(i - k) <= 1 && Math.abs(j - m) <= 1) {
        canMove = true
      }

      /*castling*/
      var place = 1
      if(board[k][m][0] === 'W'){
        place = 0
      }
      if(canCastle[place][0]){
        if(j === 2 && canCastle[place][1][0] && board[place * 7][1] === ' ' && board[place * 7][2] === ' ' && board[place * 7][3] === ' '){
          canMove = true
        }
        if(j === 6 && canCastle[place][1][1] && board[place * 7][5] === ' ' && board[place * 7][6] === ' '){
          canMove = true
        }
      }

      break;

    default:
      break
  }


  /*checks if this move would put their own king into check*/
  if(!endOfTurn){
    var tempBoard = []
    for(let i = 0; i <= 7; i++){
      tempBoard.push([...board[i]])
    }
    tempBoard[i][j] = tempBoard[k][m]
    tempBoard[k][m] = ' '

    var tempTurn
    if(turn === 'White'){
      tempTurn = 'Black'
    } else {
      tempTurn = 'White'
    }

    if(check(tempBoard, tempTurn)){
      canMove = false
    }
  }




  return canMove
}
