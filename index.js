function makeObjectDeepCopy(obj) {
  if (typeof obj !== 'object') {
    return obj;
  }

  const clone = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach((key) => {
    clone[key] = makeObjectDeepCopy(obj[key]);
  });

  return clone;
}

function selectFromInterval(arr, start, end) {
  const isNumberArray = Array.isArray(arr) && arr.some((elem) => typeof elem === 'number');

  if (!isNumberArray) {
    throw new Error('First argument is not a number array');
  }

  if (typeof start !== 'number' || typeof end !== 'number') {
    throw new Error('"start" and "end" arguments should be typeof number');
  }

  const first = Math.min(start, end) - 1;
  const second = Math.max(start, end);

  return arr.slice(first, second);
}

const myIterable = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    const isValid = typeof this.from === 'number' && typeof this.to === 'number';

    if (!isValid) {
      throw new Error('"from" or "to" is invalid');
    }

    if (this.to < this.from) {
      throw new Error('"from" can\'t be greater than "to"');
    }

    const END = this.to;
    let value = this.from;
    let done = false;

    return {
      next() {
        if (value > END) {
          done = true;
        }

        const result = { value, done };
        value += 1;

        return result;
      },
    };
  },
};
