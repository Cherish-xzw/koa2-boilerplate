function asyncCalculatorCallback(a, b, cb) {
  setTimeout(() => {
    if (b === 0) {
      return cb(new Error(" b can't equal to zero."));
    }
    cb(undefined, a / b);
  }, 100);
}

function asyncCalculatorPromise(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (b === 0) {
        return reject(new Error("b can't equal to zero."));
      }
      resolve(a / b);
    }, 100);
  });
}

module.exports = {
  asyncCalculatorCallback,
  asyncCalculatorPromise
};
