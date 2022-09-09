import { expect } from 'chai';

describe('UMD Wrapper', () => {
  it('should works as expected', () => {
    const jsf = require('../../src/main.iife').default;

    expect(jsf).not.to.be.undefined;
    // expect(jsf.VERSION).not.to.be.undefined;
    expect(jsf.generate).not.to.be.undefined;
    expect(jsf.generate({ const: 42 })).to.eql(42);
  });
});
