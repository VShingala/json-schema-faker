import { expect } from 'chai';

describe('CommonJS', () => {
  it('should works as expected', () => {
    const jsf = require('../../src/main.cjs').default;

    expect(jsf).not.to.be.undefined;
    // expect(jsf.VERSION).not.to.be.undefined;
    expect(jsf.generate).not.to.be.undefined;
    expect(jsf.generate({ const: 42 })).to.eql(42);
  });
});
