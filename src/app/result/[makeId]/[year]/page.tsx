import { IResult } from "@/app/Interfaces";
import CarsCard from "./CarsCard";
import { Suspense } from "react";

const getCars = async (makeId: string, year: string) => {
  const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`)
  const data = await response.json();
  return data.Results as IResult[]
}

export default async function ResultPage({ params }: {params: {makeId: string, year: string}}) {
  const {makeId, year} = params
  const cars = await getCars(makeId, year)

  if(cars.length === 0) return (<span>No cars found for {makeId} and {year}</span>)

  return (
    <div>
      <Suspense fallback={<span>Loading...</span>}>
        {cars.map((car) => (
          <CarsCard key={car.Model_ID} car={car}/>
        ))}
      </Suspense>
    </div>
  )
}
