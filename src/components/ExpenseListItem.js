import React from 'react';
import { Link } from 'react-router-dom'; 
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({ amount, description, createdAt, id }) => (
	<div className='expense'>
		<Link to={`/edit/${id}`} >
			<h3>
				{description}
			</h3>
		</Link>

		<p>
			Amount: {numeral( amount / 100 ).format('$0,0.00')} 
			- 
			Date: {moment(createdAt).format('Do MMM YYYY')}
		</p>
	
	</div>
);



export default ExpenseListItem;