import { Link } from "react-router-dom";



export const MainLayout = ({children}) => {


 
    return (
        <div className="md:bg-blue h-screen md:pt-20">
        <div className="max-w-3xl mx-auto  md:px-10 px-2 md:py-10 py-5 border-4 border-yellow rounded-lg bg-white">
            <div className="flex justify-between">
                <div className="bg-yellow w-12 h-12 items-center justify-center flex rounded-full cursor-pointer">
                    <Link to={'/'} className="text-red font-bold text-2xl font-FuzzyBold">
                        QR
                    </Link>
                </div>
              

            </div>
           
            {children}
        </div>
        </div>

    )
};