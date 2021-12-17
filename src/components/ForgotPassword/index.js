import * as yup from 'yup';
import { useFormik } from 'formik';
import { MainLayout } from "../../layouts/MainLayout";
import { useState } from 'react';
import { auth } from '../../firebase.config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';


export const ForgotPassword = () => {

    const [loading, setLoading] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

    let loginFormSchema = yup.object().shape({
        email: yup.string().email("Not valid email address").required("Field is required!"),
      });
    
    const loginForm = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: loginFormSchema,
        onSubmit: (values) => {
            setLoading(true)
            sendPasswordResetEmail(auth, values.email,
                {
                    url: `http://localhost:3000/login`,
                  })
            .then(res => {
                setEmailSent(true)
                console.log('res',res)
            })

            .catch(error => {
                console.log("error.message",error.messages)
                setShowErrorMessage(true)
                setLoading(false)
              })
            
        },
    });

    const { values, handleSubmit, handleChange, errors, touched, handleBlur, isValid } = loginForm;
    return (
        <MainLayout>
            {
                !emailSent 
                ?
                    <div className="flex flex-col justify-center items-center mb-8 mt-12">
                        <span className='text-2xl font-FuzzyBold text-center'>Password Recovery</span>
                        <form onSubmit={handleSubmit} className='mt-14'>
                            <div className='flex flex-col'>
                            <input 
                                type='email'
                                name='email'
                                placeholder="Type your email"
                                className="outline-none border-b-2 border-gray focus:border-red"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.email ? errors.email : undefined}
                            />
                            {errors.email ? <span className='text-red'>Type valid email</span> : undefined}
                            {showErrorMessage ? <span className='text-red'>This email not found</span> : undefined}
                            </div>
                            <div className='flex justify-center'>
                                <button type='submit' className="bg-blue px-5 py-2 rounded-3xl relative  hover:opacity-90 text-white  mt-8">
                                        {
                                            loading &&
                                            <div className='absolute bottom-1 left-0 right-1 '>
                                                <ClipLoader color={'white'}   size={22} />
                                            </div>
                                        }
                                            <span className={`${loading ? 'invisible' : ''}`}>Send</span>
                                </button>
                            </div>
                        </form>
                    
                    </div> 
                :
                    <div className="flex flex-col justify-center items-center mt-8">
                    <span className='font-FuzzyReg text-center'>Reset Pasword link was sent, <br/>check your email</span>
                       <span className="mt-8">
                           Go to{" "}
                           <Link to='/login' className="underline mt-8 text-blue"> sign in </Link>
                       </span>
                   </div>
                


            }
           
        </MainLayout>
    )
}