import { expect, assert } from 'chai';
import jsf from '../../../src/lib';

describe('jsf generate', () => {
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
    expect(jsf.generate(schema, undefined, () => { return [{ error: 'some' }]; })).to.be.an('number');
  });
  it('Take one example from examples without validation', () => {
    const schema = {
      type: 'integer',
      format: 'int32',
      examples: [123, 456],
    };
    jsf.option('useExamplesValue', true);
    expect([123, 456]).to.include(jsf.generate(schema));
  });
  it('Take one example from examples with validation', () => {
    const schema = {
      type: 'integer',
      format: 'int32',
      examples: [123, 456],
    };
    jsf.option('useExamplesValue', true);
    expect([123, 456]).to.include(jsf.generate(schema, undefined, () => { return []; }));
  });
  it('Generate fake data when example from examples is not valid', () => {
    const schema = {
      type: 'integer',
      format: 'int32',
      examples: ['123', '456'],
    };
    jsf.option('useExamplesValue', true);
    expect(jsf.generate(schema, undefined, () => { return [{ error: 'some' }]; })).to.be.an('number');
  });

  it('Generate with property called pattern', () => {
    const schema = {
      required: [
        'id',
      ],
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        pattern: {
          type: 'string',
        },
      },
    };
    assert.property(jsf.generate(schema), 'pattern');
  });
});

