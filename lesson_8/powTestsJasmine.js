describe('Возведение в степень', () => {
   it('Проверка 2^3 === 8', () => {
       expect(pow(2, 3)).toBe(8);
   });
    it('Проверка 2^5 === 32', () => {
        expect(pow(2, 5)).toBe(32);
    });
    it('Проверка 3^3 === 27', () => {
        expect(pow(3, 3)).toBe(27);
    })
});
describe('Проверка на нестандартные ситуации', () => {
   it('Проверка на отрицательные значения', () => {
       expect(pow(-3, 3)).toBeNull();
       expect(pow(3, -3)).toBeNull();
       expect(pow(-3, -3)).toBeNull();
   });
    it('Проверка на дробные значения', () => {
        expect(pow(3.1, 3)).toBeNull();
        expect(pow(3, 3.1)).toBeNull();
        expect(pow(3.1, 3.1)).toBeNull();
    });
});