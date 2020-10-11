import React from 'react'

class Triangle extends React.Component {
    constructor(props) {
      super(props);
      this.id = props.id;
      this.row = parseInt(props.row)
      this.col = parseInt(props.col)
      this.side = 125
      this.state = {
        values: ["1", "2", "3"],
      };
    }
  
    render() {
      const h = Math.sqrt(3)*this.side/2
      const orientation = ((this.col + this.row) % 2 === 0) ? "down" : "up"
      console.log(this.col + this.row)
      const rotate = orientation === "up" ? 180 : 0
      const translate_x = (this.col-1) * this.side / 2
      const translate_y = (this.row-1) * h
      
      return (
        <polygon 
            transform={"translate("+translate_x+","+translate_y+") rotate("+rotate+" "+this.side/2+","+h/2+")"}
            points={"0,0 "+this.side+",0 "+this.side/2+","+h}
            style={{
                fill:"lime",
                stroke:"purple",
                strokeWidth:1
            }} 
      />
      );
    }
}

class TarsiaGrid  extends React.Component {
    constructor(props) {
      super(props);
      this.id = props.id;
      this.config = [
          {row: 1, col: 2, values: ["5q", "1q", null]},
          {row: 1, col: 3, values: [null, "1a", "2q"]}
      ]
      this.state ={}
    }

    render() {
        return (<>
            <Triangle row="1" col="2" />
            <Triangle row="1" col="3" />
            </>
        )
    }
}

export default [Triangle, TarsiaGrid]