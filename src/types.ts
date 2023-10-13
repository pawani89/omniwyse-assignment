export interface Nutrients {
  nutrientId: number,
  nutrientName: string,
  nutrientNumber: number,
  unitName: string,
  derivationCode: string,
  derivationDescription: string,
  derivationId:number,
  value: number,
  foodNutrientSourceId: number,
  foodNutrientSourceCode: number,
  foodNutrientSourceDescription: string,
  rank: number,
  indentLevel:number,
  foodNutrientId: number,
  percentDailyValue: number
  }
  export interface FoodItem {
    fdcId: number,
    dataType: string,
    description: string,
    foodCode: string,
    foodNutrients: Nutrients[],
    publicationDate: string,
    scientificName: string,
    brandOwner: string,
    gtinUpc: number,
    ingredients: string,
    ndbNumber: number,
    additionalDescriptions: string,
    allHighlightFields: string,
    score: number
  }

  export interface FoodGridInterface {
    loader: boolean,
    result: FoodItem[]
}