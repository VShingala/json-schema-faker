import random from '../core/random';
import env from '../core/constants';
import utils from '../core/utils';

function numberType(value) {
  let min = (typeof value.minimum === 'undefined' || value.minimum === -Number.MAX_VALUE) ? env.MIN_INTEGER : value.minimum;
  let max = (typeof value.maximum === 'undefined' || value.maximum === Number.MAX_VALUE) ? env.MAX_INTEGER : value.maximum;

  const multipleOf = value.multipleOf;
  const decimals = multipleOf && String(multipleOf).match(/e-(\d)|\.(\d+)$/);

  if (decimals) {
    const number = ((Math.random() * random.number(0, 10)) + 1) * multipleOf;
    const truncate = decimals[1] || decimals[2].length;
    const result = parseFloat(number.toFixed(truncate));
    const base = random.number(min, max - 1);

    if (!String(result).includes('.')) {
      return (base + result).toExponential();
    }
    return base + result;
  }

  if (multipleOf) {
    max = Math.floor(max / multipleOf) * multipleOf;
    min = Math.ceil(min / multipleOf) * multipleOf;
  }

  min = utils.handleExclusiveMinimum(value, min);
  max = utils.handleExclusiveMaximum(value, max);

  if (min > max) {
    return NaN;
  }

  if (multipleOf) {
    let base = random.number(Math.floor(min / multipleOf), Math.floor(max / multipleOf)) * multipleOf;

    while (base < min) {
      base += multipleOf;
    }

    return base;
  }

  return random.number(min, max, undefined, undefined, true);
}

export default numberType;
