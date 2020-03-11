
(function (window) {
  const { subtract, multiply, less } = window.Homework;

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

  window.calcAreaOfTriangle_cb = calcAreaOfTriangle_cb;

})(window);
