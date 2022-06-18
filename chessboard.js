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
      [new Field(1,0,this.circles[0]), new Field(3,0,this.circles[1]), new Field(5,0,this.circles[2]), new Field(7,0,this.circles[3])],
      [new Field(0,1,this.circles[4]), new Field(2,1,this.circles[5]), new Field(4,1,this.circles[6]), new Field(6,1,this.circles[7])],
      [new Field(1,2,this.circles[8]), new Field(3,2,this.circles[9]), new Field(5,2,this.circles[10]), new Field(7,2,this.circles[11])],
      [new Field(0,3), new Field(2,3), new Field(4,3), new Field(6,3)],
      [new Field(1,4), new Field(3,4), new Field(5,4), new Field(7,4)],
      [new Field(0,5,this.circles[12]), new Field(2,5,this.circles[13]), new Field(4,5,this.circles[14]), new Field(6,5,this.circles[15])],
      [new Field(1,6,this.circles[16]), new Field(3,6,this.circles[17]), new Field(5,6,this.circles[18]), new Field(7,6,this.circles[19])],
      [new Field(0,7,this.circles[20]), new Field(2,7,this.circles[21]), new Field(4,7,this.circles[22]), new Field(6,7,this.circles[23])]
    ]
  }

  onClick (ev) {
    const el = ev.target
    const field = this.findField(el)

    if (field.getCircle() === null && this.selected) {
      const dist = this.getDistance(this.selected, field)
      const movement = this.movement(this.selected, field)
      if (dist[0] === 1 && dist[1] === 1 && movement[1] > 0) {
        field.setCircle(this.selected.getCircle())
        this.selected.setCircle(null)
      }
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

  getDistance (field1, field2) {
    return [
      Math.abs(field1.getX() - field2.getX()),
      Math.abs(field1.getY() - field2.getY())
    ]
  }

  movement (field1, field2) {
    return [
      field1.getX() - field2.getX(),
      field1.getY() - field2.getY()
    ]
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
      this.element.classList.add('circlew')
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
