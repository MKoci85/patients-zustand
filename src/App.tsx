import { ToastContainer, Flip } from 'react-toastify'
import PatientForm from "./components/PatientForm"
import PatientsList from "./components/PatientsList"
import "react-toastify/dist/ReactToastify.css"

function App() {
  
  return (
    <>
      <div className="container mx-auto mt-20">
        <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto">
          Patient Tracking {''}
          <span className="text-indigo-700">Veterinary</span>
        </h1>

        <div className="mt-12 md:flex">

          <PatientForm />
          <PatientsList />
        </div>
      </div>

      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
         transition={Flip}
      />
    </>
  )
}

export default App
