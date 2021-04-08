import { ModelType, defaultModel } from "./types"


export class Model {

    min
    max
    current
    minCurrentDoubleHeandler
    maxCurrentDoubleHeandler
    isVertical
    isRange
    step

    modelData: ModelType = {}

    constructor (madelParam: ModelType = defaultModel) {
        //Object.assign(this.madelData, madelParam)

        Object.assign(this.modelData, defaultModel, madelParam)

        // //this.scaleStyleData = scaleStyleParams

        // for (let key in madelParam) {
        //     if (madelParam[key] != undefined) {
        //         this.modelData[key] = madelParam[key]
        //     }
        //     //this.key
        //     Object.assign(this.modelData, key)
        // }

        this.min = this.modelData.min 
        this.max = this.modelData.max
        // if(madelParam.current == undefined) {
        //     this.current = madelParam.current
        // }
        //this.current = this.modelData.current
        this.minCurrentDoubleHeandler = this.modelData.minCurrentDoubleHeandler
        this.maxCurrentDoubleHeandler = this.modelData.maxCurrentDoubleHeandler
        this.isVertical = this.modelData.isVertical
        this.isRange = this.modelData.isRange
        this.step = this.modelData.step 

    }

}