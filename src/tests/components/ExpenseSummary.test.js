import { ExpenseSummary } from '../../components/ExpenseSummary';
import React from 'react';
import { shallow } from 'enzyme';


test('Should render ExpenseSummary correctly with one expense', () => {
	const wrapper = shallow(<ExpenseSummary />)
});

test('Should render ExpenseSummary correctly with more than one expense', () => {

});