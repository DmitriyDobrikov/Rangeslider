import { Model } from "../Model/model"
import { View } from "../View/view"
import { ViewType, defaultView } from "../View/types"
import { ModelType, defaultModel } from "../Model/types"
import { SliderParams, defaultSlider } from "../types"


export class Controller {

    maxModel
    minModel

    maxView
    minView
    


    model
    view
    controllerParamsData

    observer
    observerMin
    observerMax
    observerMaxVert
    observerMinVert

    proxy


    constructor(selectSliderParams : SliderParams = defaultSlider) {

        this.model = new Model(selectSliderParams.sliderModelParams)
        this.view = new View(selectSliderParams.sliderViewParams)
        this.getData()
    }



    getData() {
        if(this.model.max <= this.model.min) {
            alert('The min value cannot be less than the max value')
            return
        }

        if(this.model.current < this.model.min || this.model.current > this.model.max) {
            this.model.current = this.model.max
        }
   
        if(this.model.minCurrentDoubleHeandler < this.model.min || this.model.minCurrentDoubleHeandler > this.model.max) {
            this.model.minCurrentDoubleHeandler = this.model.min
        }
        if(this.model.maxCurrentDoubleHeandler > this.model.max || this.model.maxCurrentDoubleHeandler < this.model.min) {
            this.model.maxCurrentDoubleHeandler = this.model.max
        }

        const that = this

        this.observer = undefined
        this.observerMin = undefined
        this.observerMax = undefined
        this.observerMaxVert = undefined
        this.observerMinVert = undefined
        





        this.proxy = new Proxy(this.view, {
            get(target, prop) {
            //   console.log(
            //       target.positionLabel.textContent
            //   );
              return Reflect.get(target, prop);
            },
            // set(target, prop, value) {
            //   console.log({
            //     type: "set",
            //     target,
            //     prop,
            //     value
            //   });
            //   return Reflect.set(target, prop, value);
            // }
          });
          //this.proxy.i = 5
          


       
  
        this.view.correctValue = (this.model.max - this.model.min)/this.view.rangeValue
        this.view.stepView = this.model.step
        this.view.getStepViewSimbols(this.view.stepView)
        this.view.maxV = this.model.max
        this.view.minV = this.model.min
        this.view.maxValue = this.model.max
        this.view.minValue = this.model.min
        this.view.isRange = this.model.isRange


        //this.observerData()
        


        this.view.scaleLinesAdd();
        
        this.view.verticalControl(this.model.isVertical);
        this.view.isRangeSwitch(this.model.isRange);

        this.view.scaleLinesTrigger(this.model.scaleLines);
        this.view.scaleValuesTrigger(this.model.scaleValues);
        this.view.positionLabelTrigger(this.model.positionLabels)        
        
        this.setCurrenttoViewFromModel()

    }

    setCurrentValues() {
        if(this.model.isRange) {
            this.model.minCurrentValue = this.view.getCurrentMinValue
            this.model.maxCurrentValue = this.view.getCurrentMaxValue
            console.log(this.model.minCurrentDoubleHeandler, this.model.maxCurrentDoubleHeandler)
        } else {
            this.model.currentValue = this.view.getCurrentValue
        }
    }


    setCurrenttoViewFromModel() {
        if(this.model.isRange) {
            this.view.setCurrentRangeValue(this.model.minCurrentDoubleHeandler, this.model.maxCurrentDoubleHeandler)
        } else {
            this.view.setCurrentValue(this.model.current);
        }
    }

   




    getHandlerCurrentsPosition () {
        this.view.correctValue = (this.model.max - this.model.min)/this.view.rangeValue
        this.view.stepView = this.model.step
        this.view.getStepViewSimbols(this.view.stepView)
        this.view.maxV = this.model.max
        this.view.minV = this.model.min
    }

    HandlerCurrentsPositionTextContent () {
        this.view.maxValue = this.model.max
        this.view.minValue = this.model.min  
    }

    // setCurrentValue() {      
    //     this.view.scaleLinesAdd()
    //     this.view.isRangeSwitch(this.model.isRange)
    // }




    rangeSwich(isRangeValue) {
        if(isRangeValue === true){
            isRangeValue = true
        } else if (isRangeValue === false) {
            isRangeValue = false
        } else {
            return 
        }
        this.model.isRange = isRangeValue
        this.view.isRangeSwitch(this.model.isRange)
    }
    

    verticalMethod(isVerticalValue) {
        if(isVerticalValue === true){
            isVerticalValue = true
        } else if (isVerticalValue === false) {
            isVerticalValue = false
        } else {
            return 
        }
        this.view.isVerticalIdentifier = isVerticalValue
        this.model.isVertical = isVerticalValue
        this.view.verticalControl(this.model.isVertical)
    }

    setModelDanaInPanelInput(inputName, modelData) {
        inputName.value = String(modelData)
    }




    observerData() {
        if(this.model.isRange) {
            if(this.model.isVertical) {
                this.observerMinVert = new MutationObserver(mutationRecords1 => {
                    this.model.minCurrentDoubleHeandler = Number(this.view.positionLabelMax.textContent)
                });
                this.observerMaxVert = new MutationObserver(mutationRecords2 => {
                    this.model.maxCurrentDoubleHeandler = Number(this.view.positionLabelMin.textContent)
                });
                this.observerMaxVert.observe(this.view.positionLabelMin, {
                    attributes: true,
                    childList: true, 
                    subtree: true, 
                    characterDataOldValue: false 
                });
                this.observerMinVert.observe(this.view.positionLabelMax, {
                    attributes: true,
                    childList: true, 
                    subtree: true, 
                    characterDataOldValue: false 
                });
 
            } else {

                this.observerMin = new MutationObserver(mutationRecords4 => {
                    this.model.minCurrentDoubleHeandler = Number(this.view.positionLabelMin.textContent)
                });
                this.observerMax = new MutationObserver(mutationRecords5 => {
                    this.model.maxCurrentDoubleHeandler = Number(this.view.positionLabelMax.textContent)
                });

                this.observerMax.observe(this.view.positionLabelMax, {
                    attributes: true,
                    childList: true, 
                    subtree: true, 
                    characterDataOldValue: false 
                });
                this.observerMin.observe(this.view.positionLabelMin, {
                    attributes: true,
                    childList: true, 
                    subtree: true, 
                    characterDataOldValue: false 
                });
                return
            }


        } else { 
            this.observer = new MutationObserver(mutationRecords3 => {
                this.model.current = Number(this.view.positionLabel.textContent)
            });

            this.observer.observe(this.view.positionLabel, {
                attributes: true,
                childList: true, // наблюдать за непосредственными детьми
                subtree: true, // и более глубокими потомками
                characterDataOldValue: false // передавать старое значение в колбэк
             });
             return
        }
    }
     //this.observerData()

        // this.observerMinVert = new MutationObserver(mutationRecords1 => {
        //     this.model.minCurrentDoubleHeandler = Number(this.view.positionLabelMax.textContent)
        // });
        // this.observerMaxVert = new MutationObserver(mutationRecords2 => {
        //     this.model.maxCurrentDoubleHeandler = Number(this.view.positionLabelMin.textContent)
        // });
        // this.observer = new MutationObserver(mutationRecords3 => {
        //     this.model.current = Number(this.view.positionLabel.textContent)
        // });
        // this.observerMin = new MutationObserver(mutationRecords4 => {
        //     this.model.minCurrentDoubleHeandler = Number(this.view.positionLabelMin.textContent)
        // });
        // this.observerMax = new MutationObserver(mutationRecords5 => {
        //     this.model.maxCurrentDoubleHeandler = Number(this.view.positionLabelMax.textContent)
        // });

        //console.log(this.model.current, this.model.minCurrentDoubleHeandler, this.model.maxCurrentDoubleHeandler)
 



    
}
