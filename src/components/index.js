import React from 'react'
import QRCode from "qrcode.react"
import { useState } from "react"


const colors = ['red', 'green', 'blue', 'yellow', 'black'];

export const QrCode = () => {
    const [qrCodeValue, setQrCodeValue] = useState('qrCode')
    const [bgColor, setBgColor] = useState('black')
    const [fgColor, setFgColor] = useState('white')
    const [includeMargin, setIncludeMargin] = useState(false)

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
        <div className="bg-blue h-screen pt-20">
            <div className="max-w-3xl mx-auto  px-10 py-10 border-4 border-yellow rounded-lg bg-white">
                <span className="text-2xl font-bold ">
                    GENERATE YOUR OWN   <br/> QR CODE
                </span>
                <div className='flex mt-24 justify-around'>
                    <QRCode  
                        id={'qrCode'}
                        value={qrCodeValue}
                        bgColor={bgColor} 
                        fgColor={fgColor} 
                        includeMargin={includeMargin}
                        size={256}
                    />
                    <div className='flex flex-col  text-left'>
                        <span className='font-bold '>Link to </span>
                        <input onChange={(e) => setQrCodeValue(e.target.value)} className='h-8 border-b-2 outline-none'/> 
                        <div className='flex flex-col mt-4 mb-4'>
                            <span className='font-bold'>Choose type</span>
                            <div className='flex mt-4 '>
                                <input className='cursor-pointer mr-4 h-6 w-6'  type="radio" name="fav_language" onClick={() => setIncludeMargin(true)}/>
                                <input className='cursor-pointer h-6 w-6' type="radio"  name="fav_language" onClick={() => setIncludeMargin(false) } />
                            </div>
                        </div>
                        <span className='mb-4 font-bold'>Choose QR color</span>
                        <div className='flex'>
                            {colors.map((color,i) => (
                                <button key={`${i}+${color}`}className={`w-8 h-8 mr-2 rounded-full bg-${color}`} value={color} onClick={() => setBgColor(color)}/>        
                            ))}
                        </div>
                        <span className='my-4 font-bold'>Choose background color</span>
                        <div className='flex'>
                            {colors.map((color,i) => (
                                <button  key={`${i}+${color}`} className={`w-8 h-8 mr-2 rounded-full bg-${color}`} value={color} onClick={() => setFgColor(color)}/>        
                            ))}
                        </div>
                        <div className='flex mt-14 '>
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
                    </div>
                       
                </div>
            </div>
        </div>
    )
}