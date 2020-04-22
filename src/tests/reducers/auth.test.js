import authReducer from '../../reducers/auth';
import users from '../fixtures/auth';

test('Should set uid for login', () => {
    
        const uid = users[0];
        const action = {
            type: 'LOGIN',
            uid: uid
        };
        const state = authReducer({}, action);
        expect(state.uid).toBe(action.uid)

});

test('Should clear uid for logout', () => {
    const uid = users[0]
      const action = {
        type: 'LOGOUT'
    };
    const state = authReducer({ uid }, action);
    expect(state).toEqual({})

});