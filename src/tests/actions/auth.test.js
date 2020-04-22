import { login, logout} from '../../actions/auth';
import users from '../fixtures/auth';

test('Should generate login action object', () => {
    const uid = users[1]
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});

test('Should generate logout action object', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});