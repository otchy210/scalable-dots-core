import { hello } from '.';

describe('hello', () => {
  it('works', () => {
    const log = jest.spyOn(console, 'log');
    hello('Otchy');
    expect(log).toBeCalledWith('Hello Otchy!');
  });
});
