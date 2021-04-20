import { Scale } from './scale'


describe("Шкала", function() {
   
   it("Значения scale - по умолчанию", function() {
      let scaleDefault = new Scale
      //assert.equal(Object.keys(handlerDefault.handlerStyleData).length, 7)
   });

   it("Значения scale - пользовательские", function() {
      let scaleUser = new Scale()
      //assert.equal(handlerUser.handlerStyleData.handlerBorderRadius, handlerUser.handler.style.borderRadius)
   });

});


