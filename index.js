import React from 'react';
import ReactDOM from 'react-dom/client';


class White extends React.Component {
  render() {
    return (
      <div  className="white">
      </div>
    );
  }
}
class Black extends React.Component { 
  render() {

   let className = "black " + (this.props.circle || "") +  (this.props.selected ? " grey" : "");
   return (
       <div className={className} onClick={this.props.onClick}>
      </div>
    );
  }
}
class Square_row extends React.Component {
  render() {
    return (
      <div className="square_row">
      </div>
    );
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
  setX(x) {
  this.x = x
  }

  setY(y) {
  this.y = y
  }
  
  getY () {
    return this.y
  }
  
  getCircle() {
     return this.circle
  }

}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.state = { 
      currentPlayer: 1,
      selected: null,
      fields: [
        new Field(1, 0, "circlew"),new Field(3, 0, "circlew"),new Field(5, 0, "circlew"), new Field(7, 0, "circlew"),
        new Field(0, 1, "circlew"),new Field(2, 1, "circlew"), new Field(4, 1, "circlew"), new Field(6, 1, "circlew"),
        new Field(1, 2, "circlew"),new Field(3, 2, "circlew"),new Field(5, 2, "circlew"),new Field(7, 2, "circlew"),
        new Field(0, 5, "circle"), new Field(2, 5, "circle"),new Field(4, 5, "circle"),new Field(6, 5, "circle"),
        new Field(1, 6, "circle"),new Field(3, 6, "circle"),new Field(5, 6, "circle"),new Field(7, 6, "circle"),
        new Field(0, 7, "circle"),new Field(2, 7, "circle"),new Field(4, 7, "circle"),new Field(6, 7, "circle"),
      ]
    }
  }
     selectPawn(x,y,chessboard) {
          let field = chessboard[y][x];
          this.state.selected = field;
          this.forceUpdate();
     }

     move(x,y,chessboard){
      if(this.state.currentPlayer === 1) {
          this.moveWhite(x,y,chessboard);
      }
      else {
          this.moveBlack(x,y,chessboard);
      }
     }

     moveWhite(x,y, chessboard){
          let diffX = x - this.state.selected.getX();
          if(Math.abs(diffX) > 2) {
              return;
          }
          let diffY = y - this.state.selected.getY();
          if(diffY <= 0 || diffY > 2) {
              return;
          }
          if(diffY === 2 && diffX === -2){
              let field = chessboard[y-1][(x+this.state.selected.getX())/2];
              if(field.circle === "circle") {
                let index = -1;
        for (let i in this.state.fields) {
          if ((this.state.fields[i].getX() - this.state.selected.getX()) === -1
          && this.state.fields[i].getY() === this.state.selected.getY() +1
          && this.state.fields[i].getCircle() === "circle") {
            index = i;
            break;
          }
        }
        if (index > -1){
        this.state.fields.splice(index, 1)
        }
          }
          }else if(diffY === 2 && diffX === 2){
            
                let field = chessboard[y-1][(x+this.state.selected.getX())/2];
                if(field.circle === "circle") {
                  let index = -1;
          for (let i in this.state.fields) {
            if ((this.state.fields[i].getX() - this.state.selected.getX()) === 1
            && this.state.fields[i].getY() === this.state.selected.getY() +1) {
              index = i;
              break;
            }
          }
          if (index > -1){
          this.state.fields.splice(index, 1)
          }
        }
          }
          if(this.state.selected.circle === "circlew") {
              this.state.selected.setX(x)
              this.state.selected.setY(y)
              this.setState({
                  currentPlayer: 2,
                  selected: null
              });
          }
     }

     moveBlack(x,y,chessboard){
      let diffX = x - this.state.selected.getX();
      if(Math.abs(diffX) > 2) {
          return;
      }
      let diffY = this.state.selected.getY() - y;
      if(diffY <= 0 || diffY > 2) {
          return;
      }
      if(diffY === 2 && diffX === -2){
          let field = chessboard[y+1][(x+this.state.selected.getX())/2];
          if(field.circle === "circlew") {
            let index = -1;
        for (let i in this.state.fields) {
          if ((this.state.fields[i].getX() - this.state.selected.getX()) === -1
          && this.state.fields[i].getY() === this.state.selected.getY() -1) {
            index = i;
            break;
          }
        }
        if (index > -1){
          this.state.fields.splice(index, 1)
        }
          }
      }else if(diffY === 2 && diffX === 2){

          let field = chessboard[y+1][(x+this.state.selected.getX())/2];
          if(field.circle === "circlew") {
            let index = -1;
      for (let i in this.state.fields) {
        if ((this.state.fields[i].getX() - this.state.selected.getX()) === 1
        && this.state.fields[i].getY() === this.state.selected.getY() -1) {
            index = i;
            break;
        }
      } 
     if (index > -1){
      this.state.fields.splice(index, 1)
     }
   }
     }
     if(this.state.selected.circle === "circle") {
          this.state.selected.setX(x)
          this.state.selected.setY(y)
          this.setState({
              currentPlayer:1,
              selected: null
          });
      }
    }
  handleOnClick(field,x,y,chessboard) {
      if(field != null) {
          this.selectPawn(x,y,chessboard);
      }
      else {
          this.move(x,y,chessboard);
      }
        
    }
  renderSquare_row() {
    return<Square_row />;
  }


  renderBlack(field,x,y, chessboard) {
    if (field === null) {
    return<Black onClick={() => this.handleOnClick(null,x,y, chessboard)}/>
    }else if (field.getCircle() === "circle") {
      return <Black circle={"circle"} selected={this.state.selected === field} onClick={() => this.handleOnClick(field,x,y,chessboard)}/>;
    } else if (field.getCircle() === "circlew") {
      return<Black circle={"circlew"}  selected={this.state.selected === field} onClick={() => this.handleOnClick(field,x,y,chessboard)}/>;
  } else
  return<Black onClick={() => this.handleOnClick(null,x,y, chessboard)}/>
}

  renderWhite() {
    return<White />;
  }
  
  render() {
  let chessboard = [
  [0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0],
  ];
  this.state.fields.forEach(field =>{
  let x = field.getX();
  let y = field.getY();
  chessboard[y][x]=field;
  });
  
  const rows = [];
  chessboard.forEach((row, y) =>{
  const chrow = [];
  row.forEach((e, x) =>{
  if(e === 0){
  chrow.push(this.renderWhite());
  } else if(e === 1){
  chrow.push(this.renderBlack(null,x,y, chessboard));
  } else{
  chrow.push(this.renderBlack(e, x, y, chessboard));
  }
  });
  rows.push((<div className="square_row">{chrow}</div>));
  });
    return (
        <div className="chessboard">
          {rows}
      </div>
    );
  }
}
  
  
        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(<Board />);