import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const Courses = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();


  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Malumot yuklandi:', data);
    console.log("Form submitted");
  };

return (
  <>
    <form onSubmit={handleSubmit(onSubmit)} className="border w-100 flex flex-col gap-4 p-5">
      <input {...register('email', {
        required: "Email kiritishingiz shart!",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Email formati noto'g'ri!"
        }
      })}
        type="text"
        placeholder='email'
        className="border p-2 rounded-sm"
      />
      {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
      <input {...register('password', {
        required: "Parol kiritishingiz shart!",
        minLength: {
          value: 6,
          message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak!"
        }
      })}
        type="text"
        placeholder='password'
        className="border p-2 rounded-sm"
      />
      {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
      <button className="bg-blue-500 text-white p-2 rounded-sm transition duration-300 ease-in-out hover:bg-blue-600" type='submit' disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  </>
)
}

export default Courses
