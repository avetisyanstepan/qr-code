import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import store2 from 'store2';
import * as yup from 'yup'
import { auth } from '../../firebase.config';
import { MainLayout } from "../../layouts/MainLayout"
import ClipLoader from "react-spinners/ClipLoader";
import { ImEye, ImEyeBlocked } from "react-icons/im";



export const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [typePassword, setTypePassword] = useState('password')
    const [showPass, setShowPass] = useState(false)

    const handleChangeTypePass = (typePassword) => {
        setTypePassword(typePassword)
        setShowPass(!showPass)
    }

    // const handleForgottPassword = () => {
    //     sendPasswordResetEmail(auth,'acc2@mailinator.com')
    // }
   
    let loginFormSchema = yup.object().shape({
        email: yup.string().email("Not valid email address").required("Field is required!"),
        password: yup.string().required("Field is required!").min(6),
      });
    
    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginFormSchema,
        onSubmit: (values) => {
            setLoading(true)
            signInWithEmailAndPassword(auth, values.email, values.password)
            .then(res => {
                store2.set('firebaseToken',res._tokenResponse)
                navigate('/')
            })

            .catch(error => {
                console.log("error.message",error.messages)
                setLoading(false)
              })
            
        },
    });

    const { values, handleSubmit, handleChange, errors, touched, handleBlur, isValid } = loginForm;

    return (
        
        <MainLayout>
            <div >
                <div className="mb-8 flex md:justify-end justify-center md:mt-0 mt-8">
                    <span className='font-FuzzyReg'>If you have not account? <a href='/register' className="text-blue underline font-FuzzyBold">Sign Up</a></span>
                </div>
                <div className='flex justify-center'>
                    <span className="text-2xl font-FuzzyBold text-center">Sign In</span>
                </div>
                <form className="flex flex-col w-72 m-auto mt-12" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label className="text-left mb-2">Email:</label>
                        <input 
                            type='email'
                            placeholder="Type your email"
                            name='email'
                            className="outline-none border-b-2 border-gray focus:border-red"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email ? errors.email : undefined}
                        />
                        {errors.email ? <span className='text-red'>Please enter valid email address</span> : undefined}

                    </div>
                    <div className="flex flex-col mt-8 relative">
                        <label className="text-left mb-2">Password:</label>
                            <input 
                                type={typePassword}
                                name='password'
                                placeholder="Type your password"
                                className="outline-none border-b-2 relative border-gray focus:border-red"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.password ? errors.password : undefined}
                            />
                            {
                                showPass 
                                ?
                                <ImEye className='absolute bottom-2 right-2 cursor-pointer' onClick={() => handleChangeTypePass('password')} />
                                :
                                <ImEyeBlocked className='absolute bottom-2 right-2 cursor-pointer' onClick={() => handleChangeTypePass('text')}/> 
                            }
                    </div>
                    {errors.password ? <span className='text-red'>The password should be  minimum 6 characters</span> : undefined}
                    <div className='mt-4'>
                        <Link to='/forgot-password' className='font-FuzzyReg text-red '>Forgot passoword ?</Link>
                    </div>
                    <div className='flex justify-center'>
                        <button type='submit' className="bg-blue px-5 py-2 rounded-3xl relative  hover:opacity-90 text-white  mt-8">
                                {
                                    loading &&
                                    <div className='absolute bottom-1 left-0 right-1 '>
                                        <ClipLoader color={'white'}   size={22} />
                                    </div>
                                }
                                    <span className={`${loading ? 'invisible' : ''}`}>Sign in</span>
                        </button>
                    </div>
                </form>
          </div>
        </MainLayout>
    )
}