import { Handler } from './handler'


describe("Бегунок", function() {
   
   it("Значения handler - по умолчанию", function() {
      let handlerDefault = new Handler
      assert.equal(Object.keys(handlerDefault.handlerStyleData).length, 7)
   });

   it("Значения handler - пользовательские", function() {
      let handlerUser = new Handler({handlerWidth: '12px', handlerBorderRadius: '5px'})
      assert.equal(handlerUser.handlerStyleData.handlerBorderRadius, handlerUser.handler.style.borderRadius)
   });

});


