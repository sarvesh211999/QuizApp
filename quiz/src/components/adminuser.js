import React, { Component } from 'react';

class AdminUser extends Component {

	constructor() {
		super();
		this.state = {
			data: [],
		}
		this.delete = this.delete.bind(this)
	}

	componentDidMount() {
		const request = new Request('http://localhost:8080/allUser');
    fetch(request)
      .then(response => response.json())
        .then(data => {
        	console.log(data)
        	this.setState({data: data})
       });
	}

	delete(event) {
		var id = event.target.value;
		fetch('http://localhost:8080/delete/' + id,{
			method: 'GET',
		})
		var elem = document.querySelector('#delete'+id);
		elem = elem.parentElement
		elem.parentNode.removeChild(elem);
	}

	render() {
		var self = this;
		return (
			<table className="table table-bordered">
				<thead>
		      <tr>
		        <th>Name</th>
		        <th></th>
		      </tr>
		    </thead>
				{
					this.state.data.map(function(item,key){
						return(
							<tr>
								<td id={`delete${item.id}`}>{item.firstname} {item.lastname} &nbsp;&nbsp;&nbsp;</td>
								<td><button value={item.id} className="btn btn-primary" onClick={self.delete}> Delete User</button></td>
							</tr>

						)
					})
				}
			</table>
		);
	}


}

export default AdminUser;