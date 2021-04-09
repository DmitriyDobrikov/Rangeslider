type ModelType = {
    min?: number;
    max?: number;
    current?: number;
    minCurrentDoubleHeandler?: number;
    maxCurrentDoubleHeandler?: number;
    isVertical?: boolean;
    isRange?: boolean;
    step?: number;
    
}


 const defaultModel = {
    min: 0,
    max: 10,
    current: 5,
    minCurrentDoubleHeandler: 2,
    maxCurrentDoubleHeandler: 7,
    isVertical: false,
    isRange: false,
    step: 1,
    
}

export {ModelType, defaultModel}