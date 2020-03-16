import React from 'react';
import { Link } from 'react-router-dom'; 


const ExpenseListItem = ({ amount, description, createdAt, id }) => (
	<div className='expense'>
		<Link to={`/edit/${id}`} >
			<h3>
				{description}
			</h3>
		</Link>

		<p>
			Amount: {amount} - Date: {createdAt}
		</p>
	
	</div>
);



export default ExpenseListItem;