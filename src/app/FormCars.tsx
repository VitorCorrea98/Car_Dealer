'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { ICar, IForm, formInitialValue } from './Interfaces'

type FormCarsProps = {
  cars: ICar[];
  optionYears: number[]
}

export default function FormCars({cars, optionYears}: FormCarsProps) {
  const [form, setForm] = useState<IForm>(formInitialValue)

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


  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-max">
        <div className="flex w-full gap-1">
          <select name="year" value={form.year} id="year" onChange={handleChange} className="text-center rounded-lg text-xl shadow-lg">
            {optionYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select name="type" value={form.type} id="type" onChange={handleChange} className="z-10 max-h-56 w-full overflow-auto rounded-md py-1 text-base shadow-lg" >
            <option value="" defaultChecked className="">Choose a type</option>
            {cars.map((car) => (
            <option
              key={car.MakeId}
              value={car.MakeId}
              className=""
            >
                  {car.MakeName}
            </option>
          ))}
          </select>
        </div>
        <div className='relative top-10'>
          {!validateForm() ? (
          <Link  
          href={`/result/${form.type}/${form.year}`}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 px-4 py-3 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Next
          </Link>

          ) : (
            <span className={`${validateForm() && 'cursor-not-allowed'} text-red-700 hover:text-white border px-4 py-3 rounded-lg border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 `}
            >
              Next
            </span>

          )}
        </div>
      </form>
  )
}
