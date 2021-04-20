import { Model } from './model'
//import '@testing-library/jest-dom/extend-expect'



describe("Model with default options", function() {
   let model = new Model()

   it("проверка макс и мин значений", function() {
     assert.isTrue((model.minCurrentValue < model.maxCurrentValue))
     assert.isTrue((model.min < model.max), 'max is less than min')
   });

     
   it("Количество ключей modelData", function() {
      assert.isTrue((Object.keys(model.modelData).length == 11), 'Wrong model data length')
   });

   it("Сравнение данных модели со значениями defaultModel", function() {
      let arr = Object.values(model)
      arr.shift()
      assert.isTrue((arr.toString() == Object.values(model.modelData).toString()))
   });

});




describe("Геттеры - Сеттеры", function() {
   let modelAsset = new Model()

  it("get/set текущего знвчения", function() {
   modelAsset.currentValue = 6
     assert.equal(Number(modelAsset.currentValue), Number(modelAsset.current))
  });

  it("get/set текущего знвчения", function() {
     alert(modelAsset.qwe()) 
  });
  it("get/set текущего знвчения", function() {
   alert(modelAsset.qwe1()) 
});
it("get/set текущего знвчения", function() {
   alert(modelAsset.qwe2()) 
});
it("get/set текущего знвчения", function() {
   alert(modelAsset.qwe3()) 
});

//   it("get/set текущего Min знвчения", function() {
//    modelAsset.minCurrentValue = 1
//      assert.equal(Number(modelAsset.minCurrentValue), Number(modelAsset.minCurrentDoubleHeandler))
//   });

//   it("get/set текущего Max знвчения", function() {
//    modelAsset.maxCurrentValue = 9
//      assert.equal(Number(modelAsset.maxCurrentValue), Number(modelAsset.maxCurrentDoubleHeandler))
//   });

});


// describe("Ввод значений пользователя", function() {
//    let modelCastom = new Model({min: 1, max: 9, positionLabels: false})

//    it("Сравнение данных модели с переданными значениями", function() {
//       let arrayCastomModel = Object.values(modelCastom)
//       arrayCastomModel.shift()
//       assert.equal(arrayCastomModel.toString(), Object.values(modelCastom.modelData).toString())
//    });

// });