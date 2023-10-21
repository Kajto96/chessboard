import React from "react";
class Black extends React.Component { 
    render() {
  
     let className = "black " + (this.props.circle || "") +  (this.props.selected ? " grey" : "");
     return (
         <div className={className} onClick={this.props.onClick}>
        </div>
      );
    }
  }
  export default Black;