import data from "./data"

export function solveMaze(x){

  var a = x

  function make_step(k) {
      for (let i = 0; i < m.length; i++) {
          for (let j = 0; j < m[i].length; j++) {
              if (m[i][j] === k){
                  if (i > 0 && m[i-1][j] === 0 && a[i-1][j] === 0)
                      m[i-1][j] = k + 1
                  if (j > 0 && m[i][j-1] === 0 && a[i][j-1] === 0)
                      m[i][j-1] = k + 1
                  if (i < m.length - 1 && m[i+1][j] === 0 && a[i+1][j] === 0)
                      m[i+1][j] = k + 1
                  if (j < m[i].length - 1 && m[i][j+1] === 0 && a[i][j+1] === 0)
                      m[i][j+1] = k + 1
              }
          }
      }
  }

  var start = data["player"]["playerCor"]
  var end = data["minotaur"]["minotaurCor"]

  var m = []

  for (let i = 0; i < a.length; i++) {
      m.push([])
      for (let j = 0; j < a[i].length; j++) {
          m[m.length - 1].push(0)
      }
  }

  var i = start[0]
  var j = start[1]

  m[i][j] = 1

  var k = 0
  while (m[end[0]][end[1]] === 0){
      k += 1
      make_step(k)
  }

  i = end[0]
  j = end[1]

  k = m[i][j]

  var the_path = [[i, j]]


  while (k > 1) {
      if (i > 0 && m[i-1][j] === k - 1){
          i = i - 1
          /* j = j */
          the_path.push(data["game"]["maze"][i][j]["props"]["fieldId"])
          k -= 1
      }
      else if (j > 0 && m[i][j-1] === k - 1) {
          /* i = i */
          j = j - 1
          the_path.push(data["game"]["maze"][i][j]["props"]["fieldId"])
          k -= 1
      }
      else if (i < m.length - 1 && m[i+1][j] === k - 1){
          i = i + 1
          /* j = j */
          the_path.push(data["game"]["maze"][i][j]["props"]["fieldId"])
          k -= 1
      }
      else if (j < m[i].length - 1 && m[i][j+1] === k - 1){
          /* i = i */
          j = j + 1
          the_path.push(data["game"]["maze"][i][j]["props"]["fieldId"])
          k -= 1
      }
  }

  return the_path
}