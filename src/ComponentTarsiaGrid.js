import React from 'react'

class Triangle extends React.Component {
    constructor(props) {
      super(props);
      this.id = props.id;
      this.row = parseInt(props.row)
      this.col = parseInt(props.col)
      this.side = 150
      this.state = {
        values: props.values,
      };
    }
  
    render() {
      const h = Math.sqrt(3)*this.side/2
      const orientation = ((this.col + this.row) % 2 === 0) ? "down" : "up"
      const rotate = orientation === "up" ? 180 : 0
      const translate_x = (this.col-1) * this.side / 2
      const translate_y = (this.row-1) * h
      const transform = "translate("+translate_x+","+translate_y+") rotate("+rotate+" "+this.side/2+","+h/2+")"
      const textStyle = {
          fill: "red"
      }
      const textPadding = [10, 5]
      return (
        <g transform={transform}>
            <polygon 
                points={"0,0 "+this.side+",0 "+this.side/2+","+h}
                style={{
                    fill:"white",
                    stroke:"black",
                    strokeWidth:2
                }} 
            />
            <g textLength={this.side-2*textPadding[0]} style={textStyle}>
                <text x={this.side+textPadding[0]} y={-textPadding[1]} transform={"rotate(180 "+this.side+",0)"}>
                    {this.state.values[0]}
                </text>
                <text x={textPadding[0]} y={-textPadding[1]} transform={"rotate(60 0,0)"}>
                    {this.state.values[1]}
                </text>
                <text x={this.side/2+textPadding[0]} y={h-textPadding[1]} transform={"rotate(300 "+this.side/2+","+h+")"}>
                    {this.state.values[2]}
                </text>
            </g>
        </g>
      );
    }
}

class TarsiaGrid  extends React.Component {
    constructor(props) {
      super(props);
      this.id = props.id;
      this.config = props.config
      this.state ={
          values: props.values
      }
    }

    render() {
        const grid = []
        console.log(this.state.values)
        for (let triangle of this.config) {
            grid.push(<Triangle row={triangle.row} col={triangle.col} values={triangle.values}/>)
        }
        return (<>
            {grid}
            </>
        )
    }
}



export default TarsiaGrid

