class Chessboard {
  constructor () {
    this.circles = [
      new Circle(), new Circle(), new Circle(), new Circle(),
      new Circle(), new Circle(), new Circle(), new Circle(),
      new Circle(), new Circle(), new Circle(), new Circle(),
      new Circle(), new Circle(), new Circle(), new Circle(),
      new Circle(), new Circle(), new Circle(), new Circle(),
      new Circle(), new Circle(), new Circle(), new Circle()
    ]

    this.fields = [
      [new Field(this.circles[0]), new Field(this.circles[1]), new Field(this.circles[2]), new Field(this.circles[3])],
      [new Field(this.circles[4]), new Field(this.circles[5]), new Field(this.circles[6]), new Field(this.circles[7])],
      [new Field(this.circles[8]), new Field(this.circles[9]), new Field(this.circles[10]), new Field(this.circles[11])],
      [new Field(), new Field(), new Field(), new Field()],
      [new Field(), new Field(), new Field(), new Field()],
      [new Field(this.circles[12]), new Field(this.circles[13]), new Field(this.circles[14]), new Field(this.circles[15])],
      [new Field(this.circles[16]), new Field(this.circles[17]), new Field(this.circles[18]), new Field(this.circles[19])],
      [new Field(this.circles[20]), new Field(this.circles[21]), new Field(this.circles[22]), new Field(this.circles[23])],
    ]
  }

  getField (x, y) {
    return this.fields[y][x]
  }
}

class Field {
  constructor (circle) {
    if (circle) {
      this.circle = circle
    }
  }

  setElement (e) {
    this.element = e
  }

  setCircle (circle) {
    if (circle) {
      this.circle = circle
      this.element.classList.add('circle')
    }
  }
  getCircle {
  this.circle
}

class Circle {
  constructor (x, y) {
    this.x = x
    this.y = y

    console.log(x + ', ' + y)
  }

  canMove () {
    return false
  }

  onClick (ev) {
    const e = ev.target

    if (!e.classList.contains('circle') && prevEl !== null && this.canMove()) {
      e.classList.add('circle')
      prevEl.classList.remove('circle')
    }

    if (prevEl === e) {
      if (e.style.backgroundColor === prevColor) {
        e.style.backgroundColor = '808080'
      } else {
        e.style.backgroundColor = prevColor
      }

      prevEl = null
    } else {
      if (prevEl !== null) {
        prevEl.style.backgroundColor = prevColor
      }

      if (e.classList.contains('circle')) {
        prevEl = e
        prevColor = e.style.backgroundColor
        e.style.backgroundColor = '#808080'
      }
    }
  }
}

const chessboard = new Chessboard()

const circles = []

let prevEl = null
let prevColor = null
let x = 0
let y = 0
for (const e of document.querySelectorAll('div.chessboard > div > div')) {
  if (e.classList.contains('black')) {
    const field = chessboard.getField(x, y)
    field.setElement(e)
    e.onclick = circles.onClick
  x++
  if (x >= 4) {
    x = 0
    y++
  }
}
