import React, { Component } from 'react'

class College extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
          <h6>{this.props.college}, {this.props.loc}</h6>
        )
    }
}

export default College;