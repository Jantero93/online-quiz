import { isObjectEmpty } from './../../Common/HelperFunctions';

describe('Helper function unit tests', () => {
  it('isObjectEmpty should return true', () => {
    const isEmpty = isObjectEmpty({});
    expect(isEmpty).toBeTruthy();
  });

  it('isObjectEmpty should return false', () => {
    const isEmpty = isObjectEmpty({
      random: 'random',
      test: '1',
      number: 1
    });

    expect(isEmpty).toBeFalsy();
  });
});
