import FormCars from "./FormCars";
import { ICar } from "./Interfaces";
import { Suspense } from "react";

async function getCars() {
  const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
  const data = await response.json();
  return data.Results as ICar[]
}

export default async function FilterPage() {
  const cars = await getCars();
  const optionYears = []
  const currentYear = new Date().getFullYear()
  const lowestYear = 2015
  for (let year = lowestYear; year <= currentYear; year += 1) {
    optionYears.push(year)
  }
  
  return(
    <Suspense fallback={<span>Loading....</span>}>
      <div className="h-screen flex justify-center items-center pb-24">
        <FormCars cars={cars} optionYears={optionYears} />
      </div>
    </Suspense>
  )
}