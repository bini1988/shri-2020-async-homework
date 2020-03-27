
describe('Бонусное задание', function() {
  describe('Promise.any', function() {
    it('Promise.any should resolve promiseB', function() {
      let resolveA = null;
      let resolveB = null;
      let rejectC = null;

      const promiseA = new Promise(resolve => { resolveA = resolve; });
      const promiseB = new Promise(resolve => { resolveB = resolve; });
      const promiseC = new Promise((_, reject) => { rejectC = reject; });

      const promise = Promise._any([promiseA, promiseB, promiseC]);

      rejectC("rejectC");
      resolveB("resolveB");

      return promise.then(value => {
        chai.assert.equal(value, "resolveB");
        resolveA("resolveA");
      });
    });
    it('Promise.any should reject', function() {
      let rejectA = null;
      let rejectB = null;
      let rejectC = null;

      const promiseA = new Promise((_, reject) => { rejectA = reject; });
      const promiseB = new Promise((_, reject) => { rejectB = reject; });
      const promiseC = new Promise((_, reject) => { rejectC = reject; });

      const promise = Promise._any([promiseA, promiseB, promiseC]);

      rejectA("rejectA");
      rejectB("rejectB");
      rejectC("rejectC");

      return promise.then(() => {
        throw new Error("Shold not resolve");
      }).catch(errors => {
        chai.expect(errors).to.eql(["rejectA", "rejectB", "rejectC"]);
      });
    });
  });
  describe('Promise.allSettled', function() {
    it('Promise.allSettled should resolve', function() {
      let resolveA = null;
      let resolveB = null;
      let rejectC = null;

      const promiseA = new Promise(resolve => { resolveA = resolve; });
      const promiseB = new Promise(resolve => { resolveB = resolve; });
      const promiseC = new Promise((_, reject) => { rejectC = reject; });

      const promise = Promise._allSettled([promiseA, promiseB, promiseC]);

      resolveA("resolveA");
      resolveB("resolveB");
      rejectC("rejectC");

      return promise.then(value => {
        chai.expect(value).to.eql([
          { status: "fulfilled", value: "resolveA" },
          { status: "fulfilled", value: "resolveB" },
          { status: "rejected", reason: "rejectC" },
        ]);
      });
    });
  });
  describe('Promise.prototype.finally', function() {
    it('Promise.prototype.finally should call cb after resolve', function() {
      let _resolve = null;
      let _reject = null;
      let _isFinallyCalled = false;

      const promise =
        new Promise((resolve, reject) => {
          _resolve = resolve;
          _reject = reject;
        });

      _resolve("resolve");

      return promise
        .then(value => {
          chai.assert.equal(value, "resolve");
          return value;
        })
        ._finally(() => { _isFinallyCalled = true; })
        .then(value => {
          chai.assert.equal(_isFinallyCalled, true);
          chai.assert.equal(value, "resolve");
          return value;
        });
    });
    it('Promise.prototype.finally should call cb after reject', function() {
      let _resolve = null;
      let _reject = null;
      let _isFinallyCalled = false;

      const promise =
        new Promise((resolve, reject) => {
          _resolve = resolve;
          _reject = reject;
        });

      _reject("reject");

      return promise
        .catch(error => {
          chai.assert.equal(error, "reject");
          return error;
        })
        ._finally(() => { _isFinallyCalled = true; })
        .then(error => {
          chai.assert.equal(_isFinallyCalled, true);
          chai.assert.equal(error, "reject");
          return error;
        });
    });
    it('Promise.prototype.finally should call catch after reject', function() {
      let _resolve = null;
      let _reject = null;
      let _isFinallyCalled = false;

      const promise =
        new Promise((resolve, reject) => {
          _resolve = resolve;
          _reject = reject;
        });

      _reject("reject");

      return promise
        ._finally(() => { _isFinallyCalled = true; })
        .catch(error => {
          chai.assert.equal(_isFinallyCalled, true);
          chai.assert.equal(error, "reject");
          return error;
        });
    });
  });
});
