import React, { useEffect } from 'react'
import QRCode from "qrcode.react"
import { useState } from "react"
import { MainLayout } from '../../layouts/MainLayout';
import { Images } from '../../envaironment';
import { Link } from 'react-router-dom';
import { userIsAuthenticated } from '../../hooks';
import store2 from 'store2';


const colors = ['red', 'green', 'blue', 'yellow', 'black'];

export const QrCode = () => {
    const isAuth = userIsAuthenticated();

    const [qrCodeValue, setQrCodeValue] = useState('qrCode')
    const [bgColor, setBgColor] = useState('black')
    const [fgColor, setFgColor] = useState('white')
    const [includeMargin, setIncludeMargin] = useState(false)
    const [showDownload, setShowDownload] = useState(false)


    const handleLogOut = () => {
        store2.remove('firebaseToken')
        setShowDownload(false)
    }

    useEffect(() => {
        if(isAuth) {
            setShowDownload(true)
        }

    },[isAuth])
    

    // const fileToDataUri = (file) => new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.onload = (event) => {
    //       resolve(event.target.result)
    //     };
    //     reader.readAsDataURL(file);
    //     })


    //     const onChange = (file) => {
            
    //         if(!file) {
    //         setDataUri('');
    //         return;
    //         }

    //         fileToDataUri(file)
    //         .then(dataUri => {
    //             setDataUri(dataUri)
    //         })
    //     }
            

    const downloadQRCodePng = () => {
        const qrCodeURL = document.getElementById('qrCode')
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let aEl = document.createElement("a");
        aEl.href = qrCodeURL;
        aEl.download = `${qrCodeValue}.png`;
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
      }
      const downloadQRCodeJpeg = () => {
        const qrCodeURL = document.getElementById('qrCode')
          .toDataURL("image/jpg")
          .replace("image/jpg", "image/octet-stream");
        let aEl = document.createElement("a");
        aEl.href = qrCodeURL;
        aEl.download = `${qrCodeValue}.jpeg`;
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
      }


    return (
            <MainLayout>
                <div className="flex justify-end h-8">
                    {
                        isAuth &&
                            <a  
                            onClick={handleLogOut}
                            className="font-FuzzyReg text-red underline cursor-pointer hover:opacity-60"
                            >
                                Log out
                            </a>
                    
                    }
                </div>
                <div className='flex justify-center'>
                    <span className="text-2xl font-FuzzyBold text-center ">
                        GENERATE YOUR OWN   <br/> <span className='text-red text-5xl'>QR</span> CODE
                    </span>
                </div>
                <div className='md:flex md:flex-row flex flex-col md:mt-16 mt-8 md:justify-around items-center '>
                    <QRCode  
                        id={'qrCode'}
                        value={qrCodeValue}
                        bgColor={bgColor} 
                        fgColor={fgColor} 
                        includeMargin={includeMargin}
                        size={256}
                        imageSettings={{src:Images.ScanMe, excavate:true, height: 63, width: 63}}
                        
                    />
                    <div className='flex flex-col  text-left'>
                        <div className='md:mt-0 mt-6'>
                            <span className='font-FuzzyReg'>Link to </span>
                            <input onChange={(e) => setQrCodeValue(e.target.value)} className='w-full border-b-2 outline-none focus:border-red'/> 
                        </div>
                      
                        <div className='flex flex-col md:mt-4 mt-2 md:mb-4 mb-2'>
                            <span className='font-FuzzyReg'>Choose type</span>
                            <div className='flex md:mt-4 mt-1 '>
                                <label>
                                    
                                </label>
                                <input className='cursor-pointer mr-4 h-6 w-6'  type="radio" name="fav_language" onClick={() => setIncludeMargin(true)}/>
                                <input className='cursor-pointer h-6 w-6' type="radio"  name="fav_language" onClick={() => setIncludeMargin(false) } />
                            </div>
                        </div>
                        <span className='md:mb-4 mb-2 font-FuzzyReg'>Choose QR color</span>
                        <div className='flex'>
                            <button className={`w-8 h-8 mr-2 rounded-full bg-red`} onClick={() => setBgColor('red')}/>    
                            <button className={`w-8 h-8 mr-2 rounded-full bg-green`} onClick={() => setBgColor('green')}/>        
                            <button className={`w-8 h-8 mr-2 rounded-full bg-black`} onClick={() => setBgColor('black')}/>      
                            <button className={`w-8 h-8 mr-2 rounded-full bg-white border-2`} onClick={() => setBgColor('white')}/>   
                            <button className={`w-8 h-8 mr-2 rounded-full bg-yellow`}  onClick={() => setBgColor('yellow')}/>      
                            <button className={`w-8 h-8 mr-2 rounded-full bg-blue`}onClick={() => setBgColor('blue')}/>    

                        </div>
                        <span className='md:my-4 my-2 font-FuzzyReg'>Choose background color</span>
                        <div className='flex'>
                            <button className={`w-8 h-8 mr-2 rounded-full bg-red`} onClick={() => setBgColor('red')}/>    
                            <button className={`w-8 h-8 mr-2 rounded-full bg-green`} onClick={() => setBgColor('green')}/>        
                            <button className={`w-8 h-8 mr-2 rounded-full bg-black`} onClick={() => setBgColor('black')}/>   
                            <button className={`w-8 h-8 mr-2 rounded-full bg-white border-2`}   onClick={() => setBgColor('white')}/>   
                            <button className={`w-8 h-8 mr-2 rounded-full bg-yellow`} onClick={() => setBgColor('yellow')}/>      
                            <button className={`w-8 h-8 mr-2 rounded-full bg-blue`} onClick={() => setBgColor('blue')}/>   
                        </div>

                        {/* <div>
                            <span>Upload Logo</span>
                            <input type="file" onChange={(event) => onChange(event.target.files[0] || null)} />
                        </div> */}
                    </div>
                    
                       
                </div>
                {
                    showDownload 
                    ? 
                        <div className='flex justify-center md:mt-14 mt-4'>
                            <button  
                                className='bg-blue px-5 py-2 rounded-3xl mr-2 hover:opacity-90 text-white hover:text-white'
                                onClick={downloadQRCodePng}
                            >   
                                Download .png
                            </button>
                            <button  
                                className='bg-blue px-5 py-2 rounded-3xl  hover:opacity-90 text-white hover:text-white'
                                onClick={downloadQRCodeJpeg}
                            >
                                Download .jpeg
                            </button>
                        </div> 
                    :
                        <div className='md:mt-10 mt-2 flex justify-center'>
                            <span className='text-red font-FuzzyBold text-center '>
                                To download QR code image please {""}
                                <Link to='/login' className='text-blue underline'>
                                    Sign in
                                </Link>           
                            </span>
                        </div>
                }
                       
        </MainLayout>
    )
}