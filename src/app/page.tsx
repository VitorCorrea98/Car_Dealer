'use client'

import { formInitialValue, ICar, IForm } from "./Interfaces";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

export default function FilterPage() {
  const [form, setForm] = useState<IForm>(formInitialValue)
  const [cars, setCars] = useState<ICar[]>([])
  const optionYears = []
  const currentYear = new Date().getFullYear()
  const lowestYear = 2015
  for (let year = lowestYear; year <= currentYear; year += 1) {
    optionYears.push(year)
  }



  async function getCars() {
    const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
    const data = await response.json();
    setCars(data.Results as ICar[])
  }
  

  useEffect(() => {
    getCars()
  }, [])
  
  const handleChange = ({target: {value, name}}: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => !(form.type && form.year)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return(
    <Suspense fallback={<span>Loading....</span>}>
      <div className="h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-max">
        <div className="flex gap-12">
          <select name="type" value={form.type} id="type" onChange={handleChange} className="text-center">
            <option value="" defaultChecked>Choose a type</option>
            {cars.map((car) => (
              <option key={car.MakeId} value={car.MakeId}>{car.MakeName}</option>
            ))}
          </select>
          <select name="year" value={form.year} id="year" onChange={handleChange} className="text-center">
          <option value="" defaultChecked>Choose a year</option>
            {optionYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div>
          <Link href={`/result/${form.type}/${form.year}`} className={`${validateForm() && 'cursor-not-allowed'}`}>
            Next
          </Link>
        </div>
      </form>
      </div>
    </Suspense>
  )
}