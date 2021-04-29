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
   let handlerWidth = parseInt(viewDefault.handlerFullRadius)
   it("1 бегунок", function() {
      viewUser.isVerticalIdentifier = true
      for(let item = 0; item < viewDefault.rangeValue - handlerWidth; item+=10) {
         viewDefault.thumb.style.left = item + 'px'
         viewDefault.scaleprogressColor(viewDefault.thumb)
         assert.equal(parseInt(viewDefault.scaleProgress.style.width), parseInt(viewDefault.thumb.style.left) + handlerWidth/2)      
         viewUser.thumb.style.top = item + 'px'
         viewUser.scaleprogressColor(viewUser.thumb)
         assert.equal(parseInt(viewUser.scaleProgress.style.width), parseInt(viewUser.thumb.style.left) + handlerWidth/2)      
     
      }
   });

   it("2 бегунка", function() {
      viewUser.isVerticalIdentifier = true
      viewUser.thumbMin.style.top = '0px'
      viewDefault.thumbMax.style.left = '288px'
      let handlerWidth = parseInt(viewDefault.handlerFullRadius)
      for(let item = 0; item < viewDefault.rangeValue - handlerWidth; item+=20) {
         viewDefault.thumbMin.style.left = item + 'px'
         viewDefault.scaleprogressColor(viewDefault.thumbMax)
         assert.isTrue(parseInt(viewDefault.thumbMin.style.left) == parseInt(viewDefault.scaleProgress.style.left))
         assert.isTrue(parseInt(viewDefault.scaleProgress.style.width) == (parseInt(viewDefault.thumbMax.style.left) - parseInt(viewDefault.thumbMin.style.left) - handlerWidth/2))
         viewUser.thumbMax.style.top = item + 'px'
         viewUser.scaleprogressColor(viewUser.thumbMax)         
         assert.isTrue(parseInt(viewUser.scaleProgress.style.height) == (parseInt(viewUser.thumbMax.style.top) - parseInt(viewUser.thumbMin.style.top) + handlerWidth/2))
     
      }
   });

   // it("Вертикально - 2 бегунка", function() {
   //    let handlerWidth = parseInt(viewUser.handlerFullRadius)
   // });
      // it("Вертикально - 1 бегунок", function() {
   //    viewUser.isVerticalIdentifier = true
   //    for(let item = 0; item < viewUser.rangeValue - handlerWidth; item-=20) {
      //    viewUser.thumb.style.top = item + 'px'
      //    viewUser.scaleprogressColor(viewUser.thumb)
      //    assert.equal(parseInt(viewUser.scaleProgress.style.width), parseInt(viewUser.thumb.style.left) + handlerWidth/2)      
      // }
   // });

}); 





describe("Метод scaleLinesAdd() класса View", function() {
   viewUser.minV = 0
   
  


   it("Шаг = 1", function() {
      for(let item = 1; item < 100; item++) {
         viewUser.stepView = 1
         viewUser.isVerticalIdentifier = true
         viewUser.maxV = item
         viewUser.correctValue = (viewUser.maxV - viewUser.minV)/viewUser.rangeValue
         viewUser.scaleLinesAdd()
         for(let i of viewUser.markerSkaleView.getElementsByTagName("div")) {
            assert.isTrue(parseInt(i.style.top) <= (parseInt(viewUser.scaleLong) - parseInt(viewUser.handlerFullRadius)/2))
         }

      }
   });

   it("Шаг > 1", function() {
      for(let item = 6; item < 90; item+=5) {
         viewUser.stepView = 3
         viewUser.isVerticalIdentifier = false
         viewUser.maxV = item
         viewUser.correctValue = (viewUser.maxV - viewUser.minV)/viewUser.rangeValue
         viewUser.scaleLinesAdd()
         for(let i of viewUser.markerSkaleView.getElementsByTagName("div")) {
            assert.isTrue(parseInt(i.style.left) <= (parseInt(viewUser.scaleLong) - parseInt(viewUser.handlerFullRadius)/2))
         }

      }
   });

   it("Шаг < 1", function() {
      for(let item = 1; item < 100; item++) {
         viewUser.stepView = 0.01
         viewUser.isVerticalIdentifier = true
         viewUser.maxV = item
         viewUser.correctValue = (viewUser.maxV - viewUser.minV)/viewUser.rangeValue
         viewUser.scaleLinesAdd()
         for(let i of viewUser.markerSkaleView.getElementsByTagName("div")) {
            assert.isTrue(parseInt(i.style.top) <= (parseInt(viewUser.scaleLong) - parseInt(viewUser.handlerFullRadius)/2))
         }

      }
   });


});
