
(function (window) {

  const { subtract } = window.Homework;

  /**
   * Посчитать площадь треугольника
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @param {number} x3
   * @param {number} y3
   * @param {Function} cb
   */
  function calcAareaOfTriangle(x1, y1, x2, y2, x3, y3, cb) {
    setTimeout(cb, 600);
  }

  window.calcAareaOfTriangle = calcAareaOfTriangle;

})(window);
