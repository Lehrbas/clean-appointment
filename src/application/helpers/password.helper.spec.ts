import { PasswordHelper } from './password.helper';

describe('PasswordHelper', () => {
  describe('hashPassword', () => {
    it('should hash a password correctly', async () => {
      const password = 'secret';
      const hashedPassword = await PasswordHelper.hashPassword(password);

      expect(hashedPassword).toBeDefined();
      expect(typeof hashedPassword).toBe('string');
      expect(hashedPassword).not.toEqual(password);
    });
  });
});
