import { expect } from 'chai';
import jsf from '../../../src/lib';

describe('jsf', () => {
  it('Take example without validation', () => {
    const schema = {
      type: 'integer',
      format: 'int32',
      example: 123,
    };
    jsf.option('useExamplesValue', true);
    expect(jsf.generate(schema)).to.eql(123);
  });
  it('Take example with validation', () => {
    const schema = {
      type: 'integer',
      format: 'int32',
      example: 123,
    };
    jsf.option('useExamplesValue', true);
    expect(jsf.generate(schema, undefined, () => { return []; })).to.eql(123);
  });

  it('Generate fake data when example is not valid', () => {
    const schema = {
      type: 'integer',
      format: 'int32',
      example: '123',
    };
    jsf.option('useExamplesValue', true);
    expect(jsf.generate(schema, undefined, () => { console.log('here'); return [{ error: 'some' }]; })).to.be.an('number');
  });
});

