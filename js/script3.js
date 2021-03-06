const container = document.querySelector('.container')
const playerList = document.querySelector('.playerList')
const playerBtnList = document.querySelector('.playerBtnList')
const btnFinish = document.querySelector('.btn-finish')
const btnBack = document.querySelector('.btn-back')
const btnRestart = document.querySelector('.btn-restart')


// 先建立球員陣列
var player = ['Andre_Iguodala', 'Andrew_Wiggins', 'Chris_Chiozza',
  'Damion_Lee', 'Draymond_Green', 'Gary_Payton_II', 'Jonathan_Kuminga',
  'Jordan_Poole', 'Juan_Toscano-Anderson', 'Kevon_Looney', 'Klay_Thompson',
  'Moses_Moody', 'Nemanja_Bjelica', 'Otto_Porter_Jr', 'Quinndary_Weatherspoon',
  'Stephen_Curry',]


// 創造球員Dom函式
function PlayerCircle (name, pointWidth, pointHeight) {
  this.name = name
  this.pointWidth = pointWidth,
    this.pointHeight = pointHeight
}

PlayerCircle.prototype.imgCreate = function () {

  // 建立player節點
  const player = document.createElement('div')
  player.className = `player ${this.name}`
  player.dataset.player = this.name

  // 建立player圖片
  const img = document.createElement('img')
  img.src = `images/${this.name}.png`
  img.className = `img-fluid img-${this.name}`
  img.dataset.player = this.name

  // 建立point
  const point = document.createElement('span')
  point.className = `point point_IMG ${this.name}`
  point.dataset.player = this.name
  point.style.width = this.pointWidth + 'px'
  point.style.height = this.pointHeight + 'px'

  player.appendChild(img)
  player.appendChild(point)
  playerList.appendChild(player)
}



// 建立隨機數
// https://ithelp.ithome.com.tw/articles/10197904
// Math.random() --- 隨機產生出0~1之間的小數
// Math.floor() ---- 無條件捨去
function getRandomInt (max) {
  return Math.floor(Math.random() * max);
}

let playerTemp = []

// 先隨機取出八位球星
player.forEach((item, index) => {
  // const player = new PlayCircle(item)
  // player.imgCreate()
  // console.log(player.length) //16

  // 球員人數總共16人 所以 player.length = 16
  // 放進 getRandomInt() 會得出 0-15 的隨機數
  // 剛好吻合 陣列索引值
  // console.log(getRandomInt(player.length)); // 0-15

  // 隨機取出8位球員
  // 一旦超過就跳出
  if (playerTemp.length == 8) {
    return
  }

  const num = getRandomInt(player.length)

  // 當 新陣列內已有 該球員的時候 跳掉
  if (playerTemp.includes(player[num])) {
    return
  }

  playerTemp.push(player[num])

})


let pointWidth = '20'
let pointHeight = '20'
// 製作八位球星的Dom
playerTemp.forEach((item, index) => {
  const player = new PlayerCircle(item, pointWidth, pointHeight)
  player.imgCreate()
})

// =====================================

let playerBtnTemp = []

function btnRandom () {

  const arr = setInterval(() => {
    // 當 playerBtnTemp == 8 代表已重新排列完
    // 排列完就停止 clearInterval ， 並且開始製作BTN
    if (playerBtnTemp.length == 8) {
      clearInterval(arr)
      // 製作八位球星的BTN
      playerBtnTemp.forEach((item, index) => {
        const playerBtn = new PlayButton(item, pointWidth, pointHeight)
        playerBtn.btnCreate()
      })
    }

    const num = getRandomInt(playerTemp.length)
    // 過濾重複的人
    if (playerBtnTemp.includes(playerTemp[num])) {
      return
    }
    playerBtnTemp.push(playerTemp[num])

  }, 0)

}

btnRandom()

// 創造球員Btn函式
function PlayButton (name, pointWidth, pointHeight) {
  this.name = name
  this.pointWidth = pointWidth,
    this.pointHeight = pointHeight
}

PlayButton.prototype.btnCreate = function () {

  // 建立btnDiv節點
  const playerBtnDiv = document.createElement('div')
  playerBtnDiv.className = `btn ${this.name}`
  playerBtnDiv.dataset.player = this.name

  // 建立button節點
  const playerBtn = document.createElement('button')
  playerBtn.className = `btn-${this.name} ${this.name}`
  playerBtn.dataset.player = this.name
  playerBtn.innerText = this.name.replace('_', ' ')

  // 建立point
  const point = document.createElement('span')
  point.className = `point point_BUTTON ${this.name}`
  point.dataset.player = this.name
  point.style.width = this.pointWidth + 'px'
  point.style.height = this.pointHeight + 'px'

  // playerBtnDiv.appendChild(point)
  playerBtnDiv.appendChild(point)
  playerBtnDiv.appendChild(playerBtn)
  playerBtnList.appendChild(playerBtnDiv)
}

// =====================================


let arr = []
let click = 0;

document.addEventListener('click', e => {


  if (e.target.classList.contains('disabled')) {

    // 已連過的不能再連
    return console.log('你已經連過線了')

  } else if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'BUTTON') {

    // 不是圖片跟按鈕 也不能連
    return console.log(e.target.nodeName, '請點圖片或者是按鈕')

  }


  click++

  // 點到A球員 >　抓取A球員Point的位置
  const playerPoint = document.querySelector(`.point.point_${e.target.nodeName}.${e.target.dataset.player}`)
  console.log(playerPoint)
  console.log(e)

  let obj = {
    cx: playerPoint.offsetLeft + pointWidth / 2,
    cy: playerPoint.offsetTop + pointWidth / 2,
    nodeName: e.target.nodeName,
    name: e.target.dataset.player
  }
  arr.push(obj)
  console.log(obj.cx, obj.cy)
  console.log(obj)


  console.log(arr)
  if (click == 2) {
    /*
      以下情況不能產生連線
      圖片A + 圖片B
      圖片A + 圖片A
      按鈕A + 按鈕B
      按鈕A + 按鈕A
    */
    // 優化改成 兩個項目要不一樣才可以進行
    if (arr[0].nodeName !== arr[1].nodeName) {
      console.log(arr)
      console.log(click)

      const line = new Svg(
        arr[0].cx,
        arr[0].cy,
        arr[1].cx,
        arr[1].cy,
        arr[0],
        arr[1]
      )
      line.createLine()

      // 將已點到的做標記
      if (arr[0].nodeName === 'IMG') {

        document.querySelector(`.img-fluid.img-${arr[0].name}`).classList.add('disabled')
        document.querySelector(`.btn-${arr[1].name}`).classList.add('disabled')

      } else {

        document.querySelector(`.btn-${arr[0].name}`).classList.add('disabled')
        document.querySelector(`.img-fluid.img-${arr[1].name}`).classList.add('disabled')

      }

      click = 0;
      arr = []

    } else {

      console.log(`連續按到兩個了${arr[1].nodeName}`)
      console.log(`連續按到兩個了${arr[0].nodeName}`)

      // 將第二個按到的刪除
      // click也要改回成 1
      // 一個返回上一步的概念
      arr.pop()
      click = 1
      // console.log(arr)
      // console.log(click)
      return

    }
  }


})


// -----------------------------

const svgNs = 'http://www.w3.org/2000/svg';

function Svg (cx1, cy1, cx2, cy2, playerA, playerB) {
  this.x1 = cx1,
    this.y1 = cy1,
    this.x2 = cx2,
    this.y2 = cy2,
    this.playerA = playerA,
    this.playerB = playerB
}

Svg.prototype.createLine = function () {
  // let newSvg = document.createElement('svg'); // NG
  let svg = document.createElementNS(svgNs, 'svg');
  svg.setAttributeNS(null, 'class', 'stroke');
  // 為了做上一部的功能而設置的dataset
  svg.setAttributeNS(null, `data-${this.playerA.nodeName}`, `${this.playerA.name}`);
  svg.setAttributeNS(null, `data-${this.playerB.nodeName}`, `${this.playerB.name}`);
  // 線條 x:left , y:top
  const shape = document.createElementNS(svgNs, 'line');
  shape.setAttributeNS(null, 'x1', this.x1);
  shape.setAttributeNS(null, 'y1', this.y1);
  shape.setAttributeNS(null, 'x2', this.x2);
  shape.setAttributeNS(null, 'y2', this.y2);
  shape.setAttributeNS(null, 'stroke-width', '10');
  shape.setAttributeNS(null, 'stroke-linecap', 'round');

  svg.appendChild(shape)
  container.appendChild(svg)
  // document.body.appendChild(svg)

  // 判斷有沒有連線成功
  if (this.playerA.name === this.playerB.name) {
    console.log('連對了!')
    svg.setAttributeNS(null, 'class', 'stroke Success');

  } else {
    console.log('連錯了QQ')
    svg.setAttributeNS(null, 'class', 'stroke NG');
  }

}


// =====================================
// 完成送出

btnFinish.addEventListener('click', e => {
  console.log('123')
  // 抓取目前有幾條線
  const currentLine = document.querySelectorAll('.stroke');
  console.log(currentLine)
  console.log(currentLine.length)

  if(currentLine.length !== 8){
    return console.log('你還沒連完!')
  }

  currentLine.forEach((item,index)=>{
    if(item.classList.contains('NG')){
      item.classList.add('red')
    }else{
      item.classList.add('green')
    }
  })

},false)


// =====================================
// 返回

btnBack.addEventListener('click', e => {
  // 抓取目前有幾條線
  const currentLine = document.querySelectorAll('.stroke');

  if(!currentLine.length){
    return console.log('無法返回了啦!')
  }

  // 先前有特別在line上設置分別連線的圖片跟按鈕是誰
  const img = currentLine[currentLine.length-1].dataset.IMG
  const btn = currentLine[currentLine.length-1].dataset.BUTTON

  currentLine[currentLine.length-1].remove()
  document.querySelector(`.img-fluid.img-${img}`).classList.remove('disabled')
  document.querySelector(`.btn-${btn}`).classList.remove('disabled')

},false)


// =====================================
// 重新開始


