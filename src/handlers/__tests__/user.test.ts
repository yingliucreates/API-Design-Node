import * as user from '../user';

describe('user handlder', () => {
	//should connect tests to a different db
	it('should create a new user', async () => {
		//mocking req and res
		const req = { body: { username: 'abc', password: '123' } };
		const res = {
			json({ token }) {
				expect(token).toBeTruthy();
			}
		};
		const newUser = await user.createNewUser(req, res, () => {});
	});
});
