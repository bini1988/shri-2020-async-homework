
Promise._any = function (promises = []) {
  let _resolve = null;
  let _reject = null;
  let _errors = [];
  let _rejectCount = promises.length;

  let promise = new Promise(
    (resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    }
  );

  promises.forEach((promise, index) => {
    Promise.resolve(promise)
      .then(params => {
        _resolve && _resolve(params);
        _resolve = null;
        _reject = null;
      })
      .catch(error => {
        _errors[index] = error;
        _rejectCount--;

        if (_reject && !_rejectCount) {
          _reject(_errors);
        }
      });
  });

  return promise;
}

Promise._allSettled = function () {}

Promise.prototype._finally = function () {}
