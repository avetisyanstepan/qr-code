import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase.config";
import { useFormik } from 'formik';
import * as yup from 'yup'
import { MainLayout } from "../../layouts/MainLayout"
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";



export const Register = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [typePassword, setTypePassword] = useState('password');
    const [showPass, setShowPass] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false)
    const [successPage, setSuccessPage] = useState(false)
    const handleChangeTypePass = (typePassword) => {
        setTypePassword(typePassword)
        setShowPass(!showPass)
    };

    
    let registerFormSchema = yup.object().shape({
        email: yup.string().email("Not valid email address").required("Field is required!"),
        password: yup.string().min(8, "Please include one number and one special character. Password must be 8-15 characters.").max(15,"Please include one number and one special character. Password must be 8-15 characters.").required("Field is required!").matches(/[$&+,:;=?@#|'<>.^*()%!-]/,"Please include one number and one special character. Password must be 8-15 characters."),
      });

    const registerForm = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: registerFormSchema,
        onSubmit: (values) => {
            setLoading(true)
            createUserWithEmailAndPassword(auth,values.email,values.password)
            .then(res => {
                setSuccessPage(true)
            })

            .catch(error => {
                console.log("error.message",error.messages)
                setLoading(false)
                setErrorMessage(true)
              })
         
        }
    });
    

    const { values, handleSubmit, handleChange, errors, touched, handleBlur, isValid } = registerForm;

  

    return (
        <MainLayout>
            {
                !successPage 
                ?
                    <div>
                        <div className="mb-8 flex md:justify-end justify-center md:mt-0 mt-8">
                            <span className="font-FuzzyReg">If you have account? <a href='/login' className="text-blue font-FuzzyBold underline">Sign In</a></span>
                        </div>
                        <div className="flex justify-center">
                            <span className="text-2xl font-FuzzyBold">Sign Up</span>
                        </div>
                        {errorMessage && 
                            <div className="flex justify-center mt-10">
                                <span className='text-red'>The email already exists</span> 
                            </div>    
                        }

                        <form className="flex flex-col w-72 m-auto mt-12" onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <label className="text-left mb-2">Email:</label>
                                <input 
                                    type='email'
                                    name="email"
                                    value={values.displayName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="e.g. qr-code@gmail.com "
                                    className="outline-none border-b-2 border-gray focus:border-red"
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

                        <div className='flex justify-center'>
                            <button type='submit' className="bg-blue px-5 py-2 rounded-3xl relative  hover:opacity-90 text-white  mt-8">
                                    {
                                        loading &&
                                        <div className='absolute bottom-1 left-0 right-1 '>
                                            <ClipLoader color={'white'}   size={22} />
                                        </div>
                                    }
                                        <span className={`${loading ? 'invisible' : ''}`}>Sign up</span>
                            </button>
                        </div>
                        </form>
                    </div>
                :
                    <div className="flex flex-col justify-center items-center mt-12">
                        <span className="text-2xl font-FuzzyBold">Registration completed successfully!!!</span>
                        <span className="mt-8">
                            Go to{" "}
                            <Link to='/login' className="underline mt-8 text-blue"> sign in </Link>
                        </span>
                    </div>
                
            }
            
           

        </MainLayout>
    )
}