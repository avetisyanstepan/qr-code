import { Link } from "react-router-dom"

export const NotFoundPage = () => {
    return(
            <div className="flex h-screen flex-col  items-center justify-center bg-blue ">
                <span className="text-white md:text-9xl text-8xl font-FuzzyBold ">
                    Oops!
                </span>
                <span className='text-white mt-12 md:text-4xl text-xl font-FuzzyReg'>
                    404 The page not found.....
                </span>
                <Link to='/' className="mt-4">
                    <span className="text-gray underline font-FuzzyReg hover:text-white">
                       Please go home page
                    </span>
                </Link>
            </div>
           
    )
}