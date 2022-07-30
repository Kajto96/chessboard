class Chessboard {
  constructor () {
    this.circles = [
      new Circle(true), new Circle(true), new Circle(true), new Circle(true),
      new Circle(true), new Circle(true), new Circle(true), new Circle(true),
      new Circle(true), new Circle(true), new Circle(true), new Circle(true),
      new Circle(false), new Circle(false), new Circle(false), new Circle(false),
      new Circle(false), new Circle(false), new Circle(false), new Circle(false),
      new Circle(false), new Circle(false), new Circle(false), new Circle(false)
    ]

    this.fields = [
      [new Field(1, 0, this.circles[0]), new Field(3, 0, this.circles[1]), new Field(5, 0, this.circles[2]), new Field(7, 0, this.circles[3])],
      [new Field(0, 1, this.circles[4]), new Field(2, 1, this.circles[5]), new Field(4, 1, this.circles[6]), new Field(6, 1, this.circles[7])],
      [new Field(1, 2, this.circles[8]), new Field(3, 2, this.circles[9]), new Field(5, 2, this.circles[10]), new Field(7, 2, this.circles[11])],
      [new Field(0, 3), new Field(2, 3), new Field(4, 3), new Field(6, 3)],
      [new Field(1, 4), new Field(3, 4), new Field(5, 4), new Field(7, 4)],
      [new Field(0, 5, this.circles[12]), new Field(2, 5, this.circles[13]), new Field(4, 5, this.circles[14]), new Field(6, 5, this.circles[15])],
      [new Field(1, 6, this.circles[16]), new Field(3, 6, this.circles[17]), new Field(5, 6, this.circles[18]), new Field(7, 6, this.circles[19])],
      [new Field(0, 7, this.circles[20]), new Field(2, 7, this.circles[21]), new Field(4, 7, this.circles[22]), new Field(6, 7, this.circles[23])]
    ]
    this.currentPlayer = 1
    this.selected = null
  }

  onClick (ev) {
    const el = ev.target
    const field = this.findField(el)
    if (this.emptyField(field) && this.selected !== null) {
      if (this.currentPlayer === 1 && this.whiteCircle() && this.moveDown(this.selected, field)) {
        this.moveCircle(this.selected, field)
        this.currentPlayer = 2
      } else if ((this.currentPlayer === 2 && this.blackCircle() && this.moveUp(this.selected, field)) || (this.currentPlayer === 2 && this.blackCircle() && this.canBeatUP(this.selected, field))) {
        this.moveCircle(this.selected, field)
        this.currentPlayer = 1
      }
    } else if (this.selected === field) {
      field.setHighlight(false)
      this.selected = null
    } else if (field.getCircle()) {
      if (this.selected === null) {
        if (this.whiteTurnHighlight(field)) {
          this.sHighlight(this.selected, field)
        } else if (this.blackTurnHighlight(field)) {
          this.sHighlight(this.selected, field)
        }
      } else {
        if (this.whiteTurnHighlight(field)) {
          this.moveHighlight(this.selected, field)
        } else if (this.blackTurnHighlight(field)) {
          this.moveHighlight(this.selected, field)
        }
      }
    }
  }

  blackCircle () {
    return !this.selected.getCircle().isWhite()
  }

  whiteCircle () {
    return this.selected.getCircle().isWhite()
  }

  blackTurnHighlight (field) {
    return !field.getCircle().isWhite() && this.currentPlayer === 2
  }

  whiteTurnHighlight (field) {
    return field.getCircle().isWhite() && this.currentPlayer === 1
  }

  sHighlight (field1, field2) {
    field2.setHighlight(true)
    this.selected = field2
  }

  moveHighlight (field1, field2) {
    field2.setHighlight(true)
    this.selected.setHighlight(false)
    this.selected = field2
  }

  emptyField (field) {
    return field.getCircle() === null
  }

  moveCircle (field1, field2) {
    field2.setCircle(field1.getCircle())
    field1.setCircle(null)
    this.selected.setHighlight(false)
    this.selected = null
  }

  moveDown (field1, field2) {
    return field1.getY() < field2.getY() && field1.getY() - field2.getY() === -1 && Math.abs(field1.getX() - field2.getX()) === 1
  }

  moveUp (field1, field2) {
    return field1.getY() > field2.getY() && field1.getY() - field2.getY() === 1 && Math.abs(field1.getX() - field2.getX()) === 1
  }

  canBeatUP (field1, field2) {
    if ((field1.getX() - 1 && field1.getY() - 1).getCircle() || (field1.getX() + 1 && field1.getY() - 1).getCircle()) {
      return this.fields.getCircle()
    }
    if (this.fields.getCircle()) {
      return field1.getY() > field2.getY() && field1.getY() - field2.getY() === 2 && Math.abs(field1.getX() - field2.getX()) === 2
    }
  }

  findField (el) {
    let field = null

    for (let y = 0; y < this.fields.length; y++) {
      for (let x = 0; x < this.fields[y].length; x++) {
        field = this.getField(x, y)
        if (field.getElement() === el) {
          return field
        }
      }
    }

    return null
  }

  getField (x, y) {
    return this.fields[y][x]
  }
}

class Field {
  constructor (x, y, circle) {
    if (circle) {
      this.circle = circle
    } else {
      this.circle = null
    }

    this.x = x
    this.y = y
  }

  getX () {
    return this.x
  }

  getY () {
    return this.y
  }

  setElement (e) {
    this.element = e
  }

  getElement () {
    return this.element
  }

  setCircle (circle) {
    if (circle) {
      this.circle = circle
      if (circle.isWhite()) {
        this.element.classList.add('circlew')
      } else {
        this.element.classList.add('circle')
      }
    } else {
      this.element.classList.remove('circle', 'circlew')
      this.circle = null
    }
  }

  getCircle () {
    return this.circle
  }

  setHighlight (highlight) {
    if (highlight) {
      this.element.style.backgroundColor = '#808080'
    } else {
      this.element.style.backgroundColor = 'black'
    }
  }
}
class Circle {
  constructor (white) {
    this.white = white
  }

  isWhite () {
    return this.white
  }
}

const chessboard = new Chessboard()

let x = 0
let y = 0
for (const e of document.querySelectorAll('div.chessboard > div > div')) {
  if (e.classList.contains('black')) {
    const field = chessboard.getField(x, y)
    field.setElement(e)
    e.onclick = chessboard.onClick.bind(chessboard)
    x++
    if (x >= 4) {
      x = 0
      y++
    }
  }
}
