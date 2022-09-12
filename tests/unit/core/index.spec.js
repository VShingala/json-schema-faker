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

  it('Take example with validation and validation options', () => {
    const schema = {
      type: 'string',
      example: '/test/{{testId}}',
    };
    jsf.option('useExamplesValue', true);
    jsf.option('validationOptions', { ignoreUnresolvedVariables: true });
    expect(jsf.generate(schema, undefined, () => { return []; })).to.eql('/test/{{testId}}');
  });
  it('Take examples with validation and validation options', () => {
    const schema = {
      type: 'string',
      examples: ['/test/{{testId}}', '/other/{{otherId}}'],
    };
    jsf.option('useExamplesValue', true);
    jsf.option('validationOptions', { ignoreUnresolvedVariables: true });
    expect(['/test/{{testId}}', '/other/{{otherId}}'])
      .to.include(jsf.generate(schema, undefined, () => { return []; }));
  });
  it('Should generate a correct value considering min and max Items when type is array', () => {
    const schema = {
      type: 'array',
      items: {
        type: 'number',
      },
      example: [123],
      minItems: 2,
      maxItems: 2,
    };
    jsf.option('useExamplesValue', false);
    const result = jsf.generate(schema, undefined, () => { return []; });
    expect(result.length).to.be.equal(2);
  });
  it('Should ignore the provided example when its type is array and length is wrong independently of '
    + 'useExamplesValue option set as true', () => {
    const schema = {
      type: 'array',
      items: {
        type: 'number',
      },
      example: [123],
      minItems: 2,
      maxItems: 2,
    };
    const validationMock = schemaToValidate => {
      if (schemaToValidate.minItems) {
        return [{ error: 'some' }];
      }
      return [];
    };
    jsf.option('useExamplesValue', true);
    const result = jsf.generate(schema, undefined, validationMock);
    expect(result.length).to.be.equal(2);
  });
  it('Should ignore the provided examples when its type is array and length is wrong independently of '
    + 'useExamplesValue option set as true', () => {
    const schema = {
      type: 'array',
      items: {
        type: 'number',
      },
      examples: [[123], [321]],
      minItems: 2,
      maxItems: 2,
    };
    const validationMock = schemaToValidate => {
      if (schemaToValidate.minItems) {
        return [{ error: 'some' }];
      }
      return [];
    };
    jsf.option('useExamplesValue', true);
    const result = jsf.generate(schema, undefined, validationMock);
    expect(result.length).to.be.equal(2);
  });
  it('Should ignore minItem and maxItems properties from schema (using example) '
    + 'when avoidExampleItemsLength and useExampleValue options are set to true', () => {
    const schema = {
      type: 'array',
      items: {
        type: 'number',
      },
      example: [123],
      minItems: 2,
      maxItems: 2,
    };
    jsf.option('useExamplesValue', true);
    jsf.option('avoidExampleItemsLength', true);
    const result = jsf.generate(schema, undefined, () => { return []; });
    expect(result.length).to.be.equal(1);
    expect(result[0]).to.be.equal(123);
  });
  it('Should ignore minItem and maxItems properties from schema (using examples) '
    + 'when avoidExampleItemsLength and useExampleValue options are set to true', () => {
    const schema = {
      type: 'array',
      items: {
        type: 'number',
      },
      examples: [[123], [321]],
      minItems: 2,
      maxItems: 2,
    };
    jsf.option('useExamplesValue', true);
    jsf.option('avoidExampleItemsLength', true);
    const result = jsf.generate(schema, undefined, () => { return []; });
    expect(result.length).to.be.equal(1);
    expect([123, 321].includes(result[0])).to.be.true;
  });
  it('Should use default value when useDefaultValue is true', () => {
    const schema = {
      type: 'array',
      items: {
        type: 'number',
      },
      default: [0, 1],
    };
    jsf.option('useExamplesValue', false);
    jsf.option('useDefaultValue', true);
    const result = jsf.generate(schema, undefined, () => { return []; });
    expect(result.length).to.be.equal(2);
    expect(result).has.members([0, 1]);
  });

  it('Should not use actual property named "default" as faked value', () => {
    const schema = {
      type: 'object',
      properties: {
        default: {
          type: 'string',
          example: 'This is actual property and not JSON schema defined "default" keyword',
        },
      },
    };
    jsf.option({
      requiredOnly: false,
      optionalsProbability: 1.0, // always add optional fields
      maxLength: 256,
      useDefaultValue: true,
      useExamplesValue: true,
      ignoreMissingRefs: true,
      avoidExampleItemsLength: false, // option to avoid validating type array schema example's minItems and maxItems props.
    });

    const fakedData = jsf.generate(schema);
    expect(fakedData).to.deep.equal({
      default: 'This is actual property and not JSON schema defined "default" keyword',
    });
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
