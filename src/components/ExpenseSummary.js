import React from 'react';
import { connect } from 'react-redux';
import selectExpensesTotal from '../selectors/expenses-total';
import ExpenseListItem from './ExpenseListItem';
import numeral from 'numeral';

export const ExpenseSummary = (props) => (
	<div>
			{
			props.expenses.length === 0 ? (
					<p>Total Pending</p>
				) : props.expenses.length === 1 ? (
					<p>Viewing {props.expenses.length} expense, which totals {numeral( props.expenseTotal / 100 ).format('$0,0.00')}</p>
				) : (
						
					<p>Viewing {props.expenses.length} expenses, which total {numeral( props.expenseTotal / 100 ).format('$0,0.00')}</p>
				)	
				
		}
	</div>	
);

const mapStateToProps = (state) => {
return {
		expenses: state.expenses,
		expenseTotal: selectExpensesTotal(state.expenses)
	}	
};


export default connect(mapStateToProps)(ExpenseSummary);
