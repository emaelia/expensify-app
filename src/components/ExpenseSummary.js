import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpensesTotal from '../selectors/expenses-total';
import getVisibleExpenses, {getAllExpenses} from '../selectors/expenses';
import ExpenseListItem from './ExpenseListItem';
import numeral from 'numeral';

export const ExpenseSummary = (props) => {
	console.log(props.allExpenses);
	const expensesFormattedTotal = numeral( props.expenseTotal / 100 ).format('$0,0.00');
	const expenseWord = props.allExpenses === 1 ? "expense": "expenses";
	const totalWord = props.expenses === 1 ? "totals": "total";
	return (
		<div className="page-header" >
			<div className="content-container">
				{
					props.allExpenses === 0 ?  (
							<p className="page-header__title">There are no expenses. Click on add expense to begin.</p>
						) :  (
						<p className="page-header__title">Viewing <span>{props.expenses}</span> of <span>{props.allExpenses}</span> {expenseWord}, which {totalWord} <span>{expensesFormattedTotal}</span></p>
						) 
						
				}
				<div className="page-header__actions">
					<Link className="button" to="/create">Add Expense</Link>
				</div>
			</div>
		</div>	
)};

const mapStateToProps = (state) => {

	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

return {
		expenses: visibleExpenses.length,
		expenseTotal: selectExpensesTotal(visibleExpenses),
		allExpenses: getAllExpenses(state.expenses.length)
	}	
};


export default connect(mapStateToProps)(ExpenseSummary);
