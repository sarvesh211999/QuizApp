import React, { Component } from 'react';


class Quiz extends Component {
		componentDidMount(){
			console.log(typeof this.props.match.params.id,this.props.match.params.id)
		}
		
	render() {
		return (
			<div>
			asdads
			</div>
		)
	}
}
export default Quiz