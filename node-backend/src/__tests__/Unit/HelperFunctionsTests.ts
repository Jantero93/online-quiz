import { isObjectOrArray, isObjectEmpty } from './../../Common/HelperFunctions';

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

  it('isObjectOrArray should return true', () => {
    const objParam = { test: 2, name: 'TestName' };
    const arrayParam = ['test', 'test2', 'test3'];

    const isObjectTrue = isObjectOrArray(objParam);
    const isArrayTrue = isObjectOrArray(arrayParam);

    expect(isObjectTrue).toBeTruthy();
    expect(isArrayTrue).toBeTruthy();
  });

  it('isObjectOrArray should return false', () => {
    const stringParam = 'test';
    const numberParam = 2;

    const isStringTrue = isObjectOrArray(stringParam);
    const isNumberTrue = isObjectOrArray(numberParam);

    expect(isStringTrue).toBeFalsy();
    expect(isNumberTrue).toBeFalsy();
  });
});
