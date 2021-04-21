import { Scale } from './scale'


describe("Шкала", function() {
   let scaleDefault = new Scale
   let scaleUser = new Scale({scaleProgress: 'red', scaleWidth: '150px'})
   
   it("Значения scale - по умолчанию", function() {
      assert.equal(Object.keys(scaleDefault.scaleStyleData).length, 6)
   });

   it("Значения scale - пользовательские", function() {
      assert.equal(scaleUser.scaleStyleData.scaleWidth, scaleUser.scale.style.width)
      assert.equal(Object.keys(scaleDefault.scaleStyleData).length, Object.keys(scaleUser.scaleStyleData).length)
   });

});


