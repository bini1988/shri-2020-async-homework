
(function (window) {
  function promisify(fn) {
    return (...args) => new Promise(
      resolve => fn(...args, resolve)
    );
  }

  /**
   * Посчитать площадь треугольника
   * @description С использованием callbacks
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @param {number} x3
   * @param {number} y3
   * @param {Function} cb
   */
  function calcAreaOfTriangle_cb(x1, y1, x2, y2, x3, y3, cb) {
    const { subtract, multiply, less } = window.Homework;

    subtract(x1, x3, a => {
      subtract(y1, y3, b => {
        subtract(x2, x3, c => {
          subtract(y2, y3, d => {
            multiply(a, d, e => {
              multiply(b, c, f => {
                subtract(e, f, g => {
                  less(g, 0, isNegative => {
                    multiply(g, isNegative ? -0.5 : 0.5, cb);
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  /**
   * Посчитать площадь треугольника
   * @description С использованием Promise
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @param {number} x3
   * @param {number} y3
   */
  function calcAreaOfTriangle_promise(x1, y1, x2, y2, x3, y3) {
    const subtract = promisify(window.Homework.subtract);
    const multiply = promisify(window.Homework.multiply);
    const less = promisify(window.Homework.less);

    return Promise.all([
      subtract(x1, x3),
      subtract(y1, y3),
      subtract(x2, x3),
      subtract(y2, y3),
    ]).then(([a, b, c, d]) =>
      Promise.all([
        multiply(a, d),
        multiply(b, c),
      ]))
    .then(([e, f]) => subtract(e, f))
    .then(g => Promise.all([less(g, 0), g]))
    .then(([isNegative, g]) => multiply(g, isNegative ? -0.5 : 0.5));
  }

    /**
   * Посчитать площадь треугольника
   * @description С использованием Async
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @param {number} x3
   * @param {number} y3
   */
  async function calcAreaOfTriangle_async(x1, y1, x2, y2, x3, y3) {
    const subtract = promisify(window.Homework.subtract);
    const multiply = promisify(window.Homework.multiply);
    const less = promisify(window.Homework.less);

    const [a, b, c, d] =
      await Promise.all([
        subtract(x1, x3),
        subtract(y1, y3),
        subtract(x2, x3),
        subtract(y2, y3),
      ]);

    const [e, f] =
      await Promise.all([
        multiply(a, d),
        multiply(b, c),
      ]);

    const g = await subtract(e, f);
    const isNegative = await less(g, 0);
    const area = await multiply(g, isNegative ? -0.5 : 0.5);

    return area;
  }

  window.calcAreaOfTriangle_cb = calcAreaOfTriangle_cb;
  window.calcAreaOfTriangle_promise = calcAreaOfTriangle_promise;
  window.calcAreaOfTriangle_async = calcAreaOfTriangle_async;

})(window);
