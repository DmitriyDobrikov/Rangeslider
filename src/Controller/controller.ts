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

    constructor(selectSliderParams : SliderParams = defaultSlider) {


        //Object.assign(this.controllerParamsData, defaultView, selectSliderParams)

        // //this.scaleStyleData = scaleStyleParams

        // for (const key in this.viewParamsData) {
        //     if (viewParams[key] != undefined) {
        //         this.viewParamsData[key] = viewParams[key]
        //     }
        // }
        //console.log(selectSliderParams)

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

  
        this.view.correctValue = (this.model.max - this.model.min)/this.view.rangeValue
        this.view.stepView = this.model.step
        this.view.getStepViewSimbols(this.view.stepView)
        this.view.maxV = this.model.max
        this.view.minV = this.model.min
        this.view.maxValue = this.model.max
        this.view.minValue = this.model.min
        this.view.isRange = this.model.isRange

        this.view.scaleLinesAdd();
        
        this.view.verticalControl(this.model.isVertical);
        this.view.isRangeSwitch(this.model.isRange);

        this.model.isRange?
        this.view.setCurrentRangeValue(this.model.minCurrentDoubleHeandler, this.model.maxCurrentDoubleHeandler):
        this.view.setCurrentValue(this.model.current);
        // this.view.scaleLinesAdd();

        this.view.scaleLinesTrigger(this.model.scaleLines);
        this.view.scaleValuesTrigger(this.model.scaleValues);
        this.view.positionLabelTrigger(this.model.positionLabels)


        const that = this

        



        // if(that.model.isRange) {
        //     if(that.model.isVerticalIdentifier) {
        //         this.observerMin = new MutationObserver(mutationRecords1 => {
        //             that.model.minCurrentDoubleHeandler = Number(that.view.positionLabelMax.textContent)
        //             //console.log(that.model.minCurrentDoubleHeandler)
        //         });
        //         this.observerMax = new MutationObserver(mutationRecords2 => {
        //             that.model.maxCurrentDoubleHeandler = Number(that.view.positionLabelMin.textContent)
        //             //console.log(that.model.maxCurrentDoubleHeandler)
        //         });
        //     } else {
        //         this.observerMin = new MutationObserver(mutationRecords1 => {
        //             that.model.minCurrentDoubleHeandler = Number(that.view.positionLabelMin.textContent)
        //             //console.log(that.model.minCurrentDoubleHeandler)
        //         });
        //         this.observerMax = new MutationObserver(mutationRecords2 => {
        //             that.model.maxCurrentDoubleHeandler = Number(that.view.positionLabelMax.textContent)
        //             //console.log(that.model.maxCurrentDoubleHeandler)
        //         });
        //     }
        // } else { 
            this.observer = new MutationObserver(mutationRecords => {
                that.model.current = Number(that.view.positionLabel.textContent)
            });
        // }
   


        // if(that.model.isRange) {
        //     this.observerMax.observe(this.view.positionLabelMax, {
        //         attributes: true,
        //     });
        //     this.observerMin.observe(this.view.positionLabelMin, {
        //         attributes: true,
        //     });
        // } else {
            this.observer.observe(this.view.positionLabel, {
                attributes: true,
             });
        // }



       
       


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

    setCurrentValue() {      
        this.view.scaleLinesAdd()
        this.view.isRangeSwitch(this.model.isRange)
    }




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

        this.model.isRange?
        this.view.setCurrentRangeValue(this.model.minCurrentDoubleHeandler, this.model.maxCurrentDoubleHeandler):
        this.view.setCurrentValue(this.model.current);
        
        this.view.verticalControl(this.model.isVertical)
    }

    setModelDanaInPanelInput(inputName, modelData) {
        inputName.value = String(modelData)
    }



    
}
