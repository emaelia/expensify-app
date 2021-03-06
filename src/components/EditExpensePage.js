import React from 'react';
import { connect } from 'react-redux';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import { confirmDialogue, startConfirmDialogue } from '../actions/dialogues';
import ExpenseForm from './ExpenseForm';

export class EditExpensePage extends React.Component {


	onSubmit= (expense) => {
				this.props.startEditExpense(this.props.expense.id, expense);
				this.props.history.push('/');
	};

	onRemove = (expense) => {
				this.props.startRemoveExpense({ id: this.props.expense.id });
				this.props.history.push('/');
	};

	confirmDialogue = () => {
		this.props.startConfirmDialogue("Permenantly remove this expense?",this.onRemove);
		
};

	render() {
		return (
			
			<div>
				<div className="page-header" >
					<div className="content-container">
						<h1 className="page-header__title"><span>Edit {this.props.expense.description} Expense</span></h1>
					</div>
				</div>
				<div className="content-container">
					<ExpenseForm
						expense={this.props.expense}
						onSubmit={this.onSubmit}
					/>
					<button className="button button--secondary" onClick={this.confirmDialogue}>
						Remove {this.props.expense.description}
					</button>
				</div>
				
				
			</div>
	
		);
	}
}





const mapStateToProps = (state, props) => {
	return {
			expense: state.expenses.find((expense)=> expense.id === props.match.params.id )
	};
};

const mapDispatchToProps = (dispatch, props) => ({
		startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
		startRemoveExpense: (data) => dispatch(startRemoveExpense(data)),
		startConfirmDialogue: (dText, action) => dispatch(startConfirmDialogue(dText, action))
});


export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);