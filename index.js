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
      
      
      handleOnClick(field,x,y) {
      if(field === null && 
      this.state.selected.circle ==="circlew" && 
      this.state.currentPlayer === 1 && 
      (((y === (this.state.selected.y+1))&&
      ((x === (this.state.selected.x+1)) || (x === (this.state.selected.x-1))) 
      ||
      ((y === (this.state.selected.y+2))&&
      (x === (this.state.selected.x+2)) || (x === (this.state.selected.x-2))))))
      {
      this.state.selected.setX(x)
      this.state.selected.setY(y)
      console.log(x,y)
      this.setState({
          currentPlayer: 2,
          selected: null,
          fields: this.state.fields,
        });
      } 
      else if(field === null && 
      this.state.selected.circle ==="circle" && 
      this.state.currentPlayer === 2 &&
      (((y == (this.state.selected.y+1))&&
      ((x == (this.state.selected.x+1)) || (x == (this.state.selected.x-1)))
      ||
      ((this.state.selected.y == (this.state.selected.y-2))&&
      (x == (this.state.selected.x+2)) || (x == (this.state.selected.x-2))))))
      {
      this.state.selected.setX(x)
      this.state.selected.setY(y)
      this.setState({
          currentPlayer: 1,
          selected: null,
          fields: this.state.fields,
        });
      }
      else if(field === this.state.selected && this.state.currentPlayer === 2) {
        this.setState({
            currentPlayer: 2,
          selected: null,
          fields: this.state.fields,
        });} 
        else if(field === this.state.selected && this.state.currentPlayer === 1) {
        this.setState({
            currentPlayer: 1,
          selected: null,
          fields: this.state.fields,
        });} 
        else{
          console.log(x,y)
        this.setState({
        currentPlayer: this.state.currentPlayer,
        selected: field,
        fields: this.state.fields,
        });}
        
    }
  
    renderSquare_row() {
      return<Square_row />;
    }
  
  
    renderBlack(field,x,y) {
      let s = this.state;
      if (field === null) {
      return<Black onClick={() => this.handleOnClick(null,x,y)}/>
      }else if (field.getCircle() === "circle") {
        return <Black circle={"circle"} selected={this.state.selected == field} onClick={() => this.handleOnClick(field,x,y)}/>;
      } else if (field.getCircle() === "circlew") {
        return<Black circle={"circlew"}  selected={this.state.selected == field} onClick={() => this.handleOnClick(field,x,y)}/>;
    } else
    return<Black/>
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
    chrow.push(this.renderBlack(null,x,y));
    } else{
    chrow.push(this.renderBlack(e, x, y));
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