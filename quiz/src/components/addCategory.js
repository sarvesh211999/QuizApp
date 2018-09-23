import React , { Component } from 'react';

class AddCategory extends Component {

	addCategory(event) {
		event.preventDefault();
		const formData = new FormData(document.querySelector('.categoryForm'));
		let jsonObject ={}

		for (const [key, value]  of formData.entries()) {
    	jsonObject[key] = value;
		}

		console.log(JSON.stringify(jsonObject));

		fetch('http://localhost:8080/addCategory', {
     method: 'POST',
     body: JSON.stringify(jsonObject),
   	})
	}

	render() {
		return (
			<div>
				<form className="categoryForm" onSubmit={this.addCategory}>
					<input type="text" name="category" />
					<button>Add Category </button>
				</form>
			</div>

		);
	}
}

export default AddCategory;