import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    { id: 1, username: 'john', password: 'changeme' },
    { id: 2, username: 'maria', password: 'guess' },
  ];

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }

  async validateUser(username: string, password: string) {
    const user = await this.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result; // Return the user without the password
    }
    return null;
  }
}
