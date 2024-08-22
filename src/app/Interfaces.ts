export interface ICar {
  MakeId: number
  MakeName: string
  VehicleTypeId: number
  VehicleTypeName: string
}

export interface IForm {
  type: string
  year: string
}

export const formInitialValue: IForm = {
  type: '',
  year: ''
}

export interface IResult {
  Make_ID: number,
  Make_Name: string,
  Model_ID: number,
  Model_Name: string
}