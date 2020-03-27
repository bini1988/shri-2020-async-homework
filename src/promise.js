
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

Promise._allSettled = function (promises = []) {
  let _resolve = null;
  let _results = [];
  let _pendingCount = promises.length;

  let tryResolveResults = () => {
    if (_resolve && !_pendingCount) {
      _resolve(_results);
      _resolve = null;
    }
  };

  let promise = new Promise(
    resolve => { _resolve = resolve; }
  );

  promises.forEach((promise, index) => {
    Promise.resolve(promise)
      .then(value => {
        _results[index] = { status: "fulfilled", value };
        _pendingCount--;

        tryResolveResults();
      })
      .catch(reason => {
        _results[index] = { status: "rejected", reason };
        _pendingCount--;

        tryResolveResults();
      });
  });

  return promise;
}

Promise.prototype._finally = function (onFinally) {
  return this.then(
    (value) => Promise.resolve(onFinally()).then(() => value),
    (error) => Promise.resolve(onFinally()).then(() => { throw error }),
  );
}
