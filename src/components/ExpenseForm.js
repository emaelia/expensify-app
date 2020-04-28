import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';



//const now = moment();

//console.log(now.format('Do MMM YYYY'));

export default class ExpenseForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			description: props.expense ? props.expense.description  : '',
			note: props.expense ? props.expense.note : '',
			amount: props.expense ? (props.expense.amount / 100).toString() : '',
			createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
			calendarFocused: false,
			error: ''
		};
	}


	onDescriptionChange = (e) => {
		const description = e.target.value;
		this.setState(() => ({ description }));
	};

	onNoteChange = (e) => {
		const note = e.target.value;
		this.setState(() => ({ note }));
	};

	onAmountChange = (e) => {
		const amount = e.target.value;
		const regex = /^\d{1,}(\.\d{0,2})?$/;

		if(!amount || amount.match(regex)) {
			this.setState(() => ({ amount }))
		}
	};

	onDateChange = (createdAt) => {
		if(createdAt) {
			this.setState(() => ({ createdAt }));
		}
	};

	onFocusChange = ({ focused }) => {
		this.setState(() => ({ calendarFocused: focused }));
	};

	onSubmit = (e) => {
		e.preventDefault();

		if(!this.state.description || !this.state.amount) {

				this.setState(() => ({ error: 'Please provide the description and amount to proceed' }));

		} else {

			this.setState(() => ({ error: '' }));
			this.props.onSubmit ({
					description: this.state.description,
					amount: parseFloat(this.state.amount, 10) * 100,
					createdAt: this.state.createdAt.valueOf(),
					note: this.state.note
			});
		}
	};

	render() {
		return (
					
			<form onSubmit={this.onSubmit} className="form">
				{this.state.error && <p className="form__error">{this.state.error}</p> }
					<input 
						className="text-input"
						type='text' 
						placeholder='Description' 
						autoFocus
						value={this.state.description}
						onChange={this.onDescriptionChange}
					/>
					<input 
						className="text-input"
						type='number' 
						placeholder='Amount' 
						value={this.state.amount}
						onChange={this.onAmountChange}
					/>
					<SingleDatePicker
					 	date={this.state.createdAt} 
					 	onDateChange={this.onDateChange} 
					 	focused={this.state.calendarFocused} 
					 	onFocusChange={this.onFocusChange} 
						numberOfMonths={1}
						isOutsideRange={(day) => false}
					/>

					<textarea 
						className="textarea"
						placeholder='Add a note' 
						value={this.state.note}
						onChange={this.onNoteChange}
					></textarea>
					<div>
						<button className="button">Submit Expense</button>
					</div>
				
			</form>
			
		)
	}
};

