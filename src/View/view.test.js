import { View } from './view'
let viewDefault = new View
let viewUser = new View({
    scaleView: {
        // scaleWidth: "300px",
        // scaleHeight: "6px",
        // scaleBorder: "0px solid black",
        scaleBackground: "gray",
        // scaleBorderRadius: '10px',
        scaleProgress: "black"
    },
    handlerView: { 
        // handlerWidth: "12px",
        // handlerHeight: "12px",
        handlerBorder: "1px solid #FFFFFF",
        handlerBackground: "black",
        // handlerBorderRadius: '10px',
        // handlerLeft: "0px",
        // handlerTop: "-4px",
    },
})

describe("View - параметры по умолчанию, объекты с параметрами", function() {
   it("Значения scale и handler во View - по умолчанию", function() {
      assert.equal(Object.keys(viewDefault.scaleHandler.handlerStyleData).length, 7)
      assert.equal(Object.keys(viewDefault.sliderScale.scaleStyleData).length, 6)
   });
});


describe("View - параметры пользователя, объекты с параметрами", function() {
    it("Значения scale и handler во View - пользователь", function() {
       assert.equal(Object.keys(viewDefault.scaleHandler.handlerStyleData).length, Object.keys(viewUser.scaleHandler.handlerStyleData).length)
       assert.equal(Object.keys(viewDefault.sliderScale.scaleStyleData).length, Object.keys(viewUser.sliderScale.scaleStyleData).length)
    });
    it("Сравнение не переданных параметров", function() {
       assert.equal(viewDefault.scaleHandler.handlerStyleData.handlerBorderRadius, viewUser.scaleHandler.handlerStyleData.handlerBorderRadius)
       assert.equal(viewDefault.sliderScale.scaleStyleData.scaleWidth, viewUser.sliderScale.scaleStyleData.scaleWidth)
    });
 });
 


 describe("Метод stepValueAfterDot(num) класса View", function() {

   it("Целое число", function() {
      assert.equal(viewDefault.stepValueAfterDot(6), 0)
   });

   it("Дробное число", function() {
      assert.equal(viewDefault.stepValueAfterDot(6.23), 2)
   });

   it("Дробное число от 0 до 1", function() {
      assert.equal(viewDefault.stepValueAfterDot(0.233), 3)
   });

   it("Отрицательное дробное число", function() {
      assert.equal(viewDefault.stepValueAfterDot(-61.1234567), 7)
   });
   it("Отрицательное целое число", function() {
      assert.equal(viewDefault.stepValueAfterDot(-61), 0)
   });
});



describe("Метод getStepViewSimbols(value) класса View", function() {

   it("Целое число", function() {
      assert.equal(viewDefault.getStepViewSimbols(6.0000), 0)
   });

   it("Дробное число", function() {
      assert.equal(viewDefault.getStepViewSimbols(6.23), 2)
   });

   it("Дробное число от 0 до 1", function() {
      assert.equal(viewDefault.getStepViewSimbols(0.233), 3)
   });

   it("Отрицательное дробное число", function() {
      assert.equal(viewDefault.getStepViewSimbols(-61.1234567), 7)
   });
   it("Отрицательное целое число", function() {
      assert.equal(viewDefault.getStepViewSimbols(-61), 0)
   });
});




describe("Метод stayHandlerInBorder() класса View", function() {

   it("positionHandler меньше 0", function() {
      viewDefault.positionHandler = -10
      viewDefault.stayHandlerInBorder()
      assert.equal(viewDefault.positionHandler, 0)
   });

   it("positionHandler больше максимального значения", function() {
      viewDefault.positionHandler = viewDefault.rangeValue + 10
      viewDefault.stayHandlerInBorder()
      assert.equal(viewDefault.positionHandler, viewDefault.rangeValue)
   });

   it("positionHandler в пределах шкалы", function() {
      viewDefault.positionHandler = viewDefault.rangeValue/2
      viewDefault.stayHandlerInBorder()
      assert.equal(viewDefault.positionHandler, (viewDefault.rangeValue/2))
   });

});






describe("Метод nearValue(position) класса View", function() {
   viewDefault.stepView = 1

   it("position ближе к меньшему значению", function() {
      assert.equal(viewDefault.nearValue(viewDefault.stepView/3), 0)
   });

   it("position ближе к бльшему значению", function() {
      assert.equal(viewDefault.nearValue(viewDefault.stepView/1.5), 1)
   });

});


describe("Метод scaleprogressColor(handlerType) класса View", function() {
   viewUser.isVerticalIdentifier = true

   it("Горизонтально - 1 бегунок", function() {
      viewDefault.thumb.style.left = '90px'

      viewDefault.scaleprogressColor(viewDefault.thumb)
      assert.equal(viewDefault.scaleProgress.style.width, '96px')
      assert.equal(viewDefault.scaleProgress.style.height, '6px')
   });

   it("Горизонтально - 2 бегунка", function() {
      //viewDefault.thumbMin.style.left = '90px'
      viewDefault.thumbMax.style.left = '288px'
      let handlerWidth = parseInt(viewDefault.handlerFullRadius)
      for(let item = 0; item < viewDefault.rangeValue - handlerWidth; item+=10) {

         let u = parseInt(viewDefault.thumbMax.style.left) - item
         viewDefault.thumbMin.style.left = item + 'px'
         viewDefault.scaleprogressColor(viewDefault.thumbMax)
         //alert(viewDefault.scaleProgress.style.width + "-----" + item)
         alert(u)
         assert.isTrue()
      }
      // alert(viewDefault.rangeValue , viewDefault.handlerFullRadius)
      // alert(viewDefault.handlerFullRadius)

      viewDefault.scaleprogressColor(viewDefault.thumbMax)
      // alert(viewDefault.scaleProgress.style.width)
      // alert(viewDefault.scaleProgress.style.left)


      // assert.equal(viewDefault.scaleProgress.style.width, '96px')
      // assert.equal(viewDefault.scaleProgress.style.height, '6px')
   });

});

