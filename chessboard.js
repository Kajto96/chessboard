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
      [new Field(this.circles[20]), new Field(this.circles[21]), new Field(this.circles[22]), new Field(this.circles[23])]
    ]
  }

  onClick (ev) {
    const el = ev.target
    const field = this.findField(el)

    if (field.getCircle() === null && this.selected) {
      field.setCircle(this.selected.getCircle())
      this.selected.setCircle(null)
    }
    if (this.selected === field) {
      field.setHighlight(false)
      this.selected = null
    } else if (field.getCircle()) {
      field.setHighlight(true)
      if (this.selected) {
        this.selected.setHighlight(false)
      }
      this.selected = field
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
  constructor (circle) {
    if (circle) {
      this.circle = circle
    } else {
      this.circle = null
    }
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
      this.element.classList.add('circle')
    } else {
      this.element.classList.remove('circle')
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
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  canMove () {
    return false
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
