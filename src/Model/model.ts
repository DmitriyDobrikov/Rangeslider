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
    scaleValues
    scaleLines

    modelData: ModelType = {}

    constructor (madelParam: ModelType = defaultModel) {

        Object.assign(this.modelData, defaultModel, madelParam)

        this.min = this.modelData.min 
        this.max = this.modelData.max

        this.current = this.modelData.current
        this.minCurrentDoubleHeandler = this.modelData.minCurrentDoubleHeandler
        this.maxCurrentDoubleHeandler = this.modelData.maxCurrentDoubleHeandler
        this.isVertical = this.modelData.isVertical
        this.isRange = this.modelData.isRange
        this.step = this.modelData.step 
        this.scaleValues = this.modelData.scaleValues 
        this.scaleLines = this.modelData.scaleLines 
    }

}