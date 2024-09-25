import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { DraftPatient } from '../types'
import Error from './Error'
import { usePatientStore } from '../store'
import { useEffect } from 'react'

export default function PatientForm() {

    const addPatient = usePatientStore(state => state.addPatient)
    const activeId = usePatientStore(state => state.activeId)
    const patients = usePatientStore(state => state.patients)
    const updatePatient = usePatientStore(state => state.updatePatient)

    const { register, handleSubmit, setValue, formState: {errors}, reset } = useForm<DraftPatient>()


    useEffect(() => {
        if(activeId){
            const activePatient = patients.filter( patient => patient.id === activeId)[0]
            setValue('name', activePatient.name)
            setValue('caretaker', activePatient.caretaker)
            setValue('date', activePatient.date)
            setValue('email', activePatient.email)
            setValue('symptoms', activePatient.symptoms)
        }
    }, [activeId])

    const registerPatient = (data: DraftPatient) => {
        if(activeId){
            updatePatient(data)
            toast('Patient updated successfully', {
                position: "top-center"
            })
        } else {
            addPatient(data)
            toast('Patient reistered successfully', {
                position: "top-center"
            })
        }
        reset()
    }

    
  
    return (
      <div className="md:w-1/2 lg:w-2/5 mx-5">
          <h2 className="font-black text-3xl text-center">Patient Tracking</h2>
  
          <p className="text-lg mt-5 text-center mb-10">
             Add Patients and {''}
              <span className="text-indigo-600 font-bold">Manage Them</span>
          </p>
  
          <form 
              className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
              noValidate
              onSubmit={handleSubmit(registerPatient)}
          >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Patient 
                    </label>
                    <input  
                        id="name"
                        className="w-full p-3  border border-gray-100"  
                        type="text" 
                        placeholder="Patient name" 
                        {...register('name', {
                            required: 'Patient name is required',
                        })}
                    />
                    
                    {errors.name && (
                        <Error>{errors.name?.message}</Error>
                    )}
                    
                </div>
  
                <div className="mb-5">
                  <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                      Caretaker 
                  </label>
                  <input  
                      id="caretaker"
                      className="w-full p-3  border border-gray-100"  
                      type="text" 
                      placeholder="Name of the caretaker" 
                      {...register('caretaker', {
                        required: 'Caretaker is required',
                    })}
                  />
                  {errors.caretaker && (
                        <Error>{errors.caretaker?.message}</Error>
                    )}
                </div>
  
              <div className="mb-5">
                <label htmlFor="email" className="text-sm uppercase font-bold">
                    Email 
                </label>
                <input  
                    id="email"
                    className="w-full p-3  border border-gray-100"  
                    type="email" 
                    placeholder="Email" 
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Not a valid email'
                        }
                      })} 
                />
                {errors.email && (
                        <Error>{errors.email?.message}</Error>
                    )}
              </div>
  
              <div className="mb-5">
                  <label htmlFor="date" className="text-sm uppercase font-bold">
                      Date 
                  </label>
                  <input  
                      id="date"
                      className="w-full p-3  border border-gray-100"  
                      type="date" 
                      {...register('date', {
                        required: 'Date is required',
                    })}
                  />
                  {errors.date && (
                        <Error>{errors.date?.message}</Error>
                    )}
              </div>
              
              <div className="mb-5">
                  <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                  Symptoms 
                  </label>
                  <textarea  
                      id="symptoms"
                      className="w-full p-3  border border-gray-100"  
                      placeholder="Síntomas del paciente" 
                      {...register('symptoms', {
                        required: 'Symptoms are required',
                    })}
                  />
                  {errors.symptoms && (
                        <Error>{errors.symptoms?.message}</Error>
                    )}

                 
              </div>
  
              <input
                  type="submit"
                  className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                  value='Save Patient'
              />
          </form> 
      </div>
    )
  }