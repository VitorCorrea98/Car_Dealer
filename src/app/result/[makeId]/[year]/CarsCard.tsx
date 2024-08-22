import { IResult } from "@/app/Interfaces"

type CarsCardProps = {
  car: IResult
}

export default function CarsCard({car}: CarsCardProps) {
  return (
    <div>
      <span>Name: {car.Make_Name}</span>
      <span>Model: {car.Model_Name}</span>
    </div>
  )
}
