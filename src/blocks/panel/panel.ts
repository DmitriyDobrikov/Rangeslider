import '../../index'
import { SliderParams, defaultSlider } from "../../types"
import { ControlParamButton } from '../switch-buttons/switch-buttons'


class SliderPanel {



    // sliderSelector
    rangeInput
    verticalInput

    min 
    max


    panel

    verticalParamButton = new ControlParamButton('Vertical')
    rangeParamButton = new ControlParamButton('Range')

    thumblerValue = new ControlParamButton('Current value')

    maxScaleValue = new ControlParamButton('Max value')
    minScaleValue = new ControlParamButton('Min value')

    stepValue = new ControlParamButton('Step')

    currentMinValue = new ControlParamButton('Current min')
    currentMaxValue = new ControlParamButton('Current max')

    scaleValues = new ControlParamButton('Scale values')
    scaleLines = new ControlParamButton('Scale lines')


    constructor(sliderSelector) {
        const that = this

      

        this.panel = $(sliderSelector).rangeSlider()
        // console.log(i.sliderScaleView)
        this.panel.append(this.verticalParamButton.containerOfSwitchParams)
        this.panel.append(this.rangeParamButton.containerOfSwitchParams)
        this.panel.append(this.thumblerValue.containerOfSwitchParams)
        this.panel.append(this.maxScaleValue.containerOfSwitchParams)
        this.panel.append(this.minScaleValue.containerOfSwitchParams)
        this.panel.append(this.stepValue.containerOfSwitchParams)
        this.panel.append(this.currentMinValue.containerOfSwitchParams)
        this.panel.append(this.currentMaxValue.containerOfSwitchParams)
        this.panel.append(this.scaleLines.containerOfSwitchParams)
        this.panel.append(this.scaleValues.containerOfSwitchParams)


        // var text = document.getElementsByTagName("input")[0];
        // var val = text.value;
        // alert(val);

        this.rangeParamButton.switchButton.onclick = function() {
            that.panel.controller.rangeSwich(that.rangeParamButton.booleanMethod(that.rangeParamButton.paramInput.value))
            that.panel.controller.getData()
        }

        this.verticalParamButton.switchButton.onclick = function() {
            that.panel.controller.verticalMethod(that.verticalParamButton.booleanMethod(that.verticalParamButton.paramInput.value))
            that.panel.controller.getData()
        }

        this.thumblerValue.switchButton.onclick = function() {
            if(isNaN(that.thumblerValue.numberMethod(that.thumblerValue.paramInput.value)) == false) {
                that.panel.controller.model.current = that.thumblerValue.numberMethod(that.thumblerValue.paramInput.value)
            }
            that.panel.controller.getData()
        }
        
        this.maxScaleValue.switchButton.onclick = function() {
            if(isNaN(that.maxScaleValue.numberMethod(that.maxScaleValue.paramInput.value)) == false) {
                that.panel.controller.model.max = that.maxScaleValue.numberMethod(that.maxScaleValue.paramInput.value)
            }
                that.panel.controller.getData()
        }

        this.minScaleValue.switchButton.onclick = function() {
            if(isNaN(that.minScaleValue.numberMethod(that.minScaleValue.paramInput.value)) == false) {
                that.panel.controller.model.min = that.minScaleValue.numberMethod(that.minScaleValue.paramInput.value)
            }
            that.panel.controller.getData()
        }

        this.stepValue.switchButton.onclick = function() {
            if(isNaN(that.stepValue.numberMethod(that.stepValue.paramInput.value)) == false) {
                that.panel.controller.model.step = that.stepValue.numberMethod(that.stepValue.paramInput.value)
            }
            that.panel.controller.getData()
        }

        this.currentMinValue.switchButton.onclick = function() {
            if(isNaN(that.currentMinValue.numberMethod(that.currentMinValue.paramInput.value)) == false) {
                that.panel.controller.model.minCurrentDoubleHeandler = that.currentMinValue.numberMethod(that.currentMinValue.paramInput.value)
            }
            that.panel.controller.getData()
        }

        this.currentMaxValue.switchButton.onclick = function() {
            if(isNaN(that.currentMaxValue.numberMethod(that.currentMaxValue.paramInput.value)) == false) {
                that.panel.controller.model.maxCurrentDoubleHeandler = that.currentMaxValue.numberMethod(that.currentMaxValue.paramInput.value)
            }
            that.panel.controller.getData()
        }



        this.scaleValues.switchButton.onclick = function() {
            that.panel.controller.model.scaleValues = that.scaleValues.booleanMethod(that.scaleValues.paramInput.value)
            that.panel.controller.getData()
        }

        this.scaleLines.switchButton.onclick = function() {
            that.panel.controller.model.scaleLines = that.scaleLines.booleanMethod(that.scaleLines.paramInput.value)
            that.panel.controller.getData()
        }







        // $(sliderSelector).rangeSlider(
            
        //     {
        //         sliderViewParams: {
        //         scaleView: {
        //             scaleWidth: "300px",
        //             scaleHeight: "6px",
        //             scaleBorder: "0px solid black",
        //             scaleBackground: "#EEEEEE",
        //             scaleBorderRadius: '10px',
        //             scaleProgress: "blue"
        //         },
        //         handlerView: { 
        //             handlerWidth: "12px",
        //             handlerHeight: "12px",
        //             handlerBorder: "1px solid #FFFFFF",
        //             handlerBackground: "blue",
        //             handlerBorderRadius: '10px',
        //             handlerLeft: "0px",
        //             handlerTop: "-4px",
        //         },

        //         },
            

        //         sliderModelParams: {
        //         min: 0,
        //         max: 10,
        //         //current: 50,
        //         minCurrentDoubleHeandler: 25,
        //         maxCurrentDoubleHeandler: 75,
        //         isVertical: false,
        //         isRange: false,
        //         step: 0.01,
        //         },
        //     }

        // )

    }


}
export { SliderPanel}