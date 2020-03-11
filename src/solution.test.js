describe('Домашнее задание ШРИ по теме “Асинхронность”', function() {
  describe('Вариант 4. Посчитать площадь треугольника (callback)', function() {
    it('возвращает площать треугольника 1', function(done) {
      const x1 = 0, y1 = 0, x2 = 0, y2 = 0, x3 = 0, y3 = 0;

      calcAreaOfTriangle_cb(x1, y1, x2, y2, x3, y3, area => {
        try {
          chai.assert.equal(area, 0);
          done();
        } catch (error) {
          done(error);
        }
      });
    });
    it('возвращает площать треугольника 2', function(done) {
      const x1 = 1, y1 = 1, x2 = 2, y2 = 5, x3 = 5, y3 = 3;

      calcAreaOfTriangle_cb(x1, y1, x2, y2, x3, y3, area => {
        try {
          chai.assert.equal(area, 7);
          done();
        } catch (error) {
          done(error);
        }
      });
    });
    it('возвращает площать треугольника 3', function(done) {
      const x1 = 0, y1 = 0, x2 = 10, y2 = 3, x3 = 4, y3 = 8;

      calcAreaOfTriangle_cb(x1, y1, x2, y2, x3, y3, area => {
        try {
          chai.assert.equal(area, 34);
          done();
        } catch (error) {
          done(error);
        }
      });
    });
  });
});
