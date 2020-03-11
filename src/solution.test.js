describe('Домашнее задание ШРИ по теме “Асинхронность”', function() {
  describe('Вариант 4. Посчитать площадь треугольника.', function() {
    it('возвращает площать треугольника 1', function(done) {
      const x1 = 0, y1 = 0, x2 = 0, y2 = 0, x3 = 0, y3 = 0;

      calcAareaOfTriangle(x1, y1, x2, y2, x3, y3, (result) => {
        chai.assert.equal(result, 0);
        done();
      });
    });
    it('возвращает площать треугольника 2', function(done) {
      const x1 = 1, y1 = 1, x2 = 2, y2 = 5, x3 = 5, y3 = 3;

      calcAareaOfTriangle(x1, y1, x2, y2, x3, y3, (result) => {
        chai.assert.equal(result, 7);
        done();
      });
    });
    it('возвращает площать треугольника 3', function(done) {
      const x1 = 0, y1 = 0, x2 = 10, y2 = 3, x3 = 4, y3 = 8;

      calcAareaOfTriangle(x1, y1, x2, y2, x3, y3, (result) => {
        chai.assert.equal(result, 34);
        done();
      });
    });
  });
});
