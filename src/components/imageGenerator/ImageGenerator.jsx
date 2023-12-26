import React, {useState, useRef} from 'react'
import './ImageGenerator.css'
import default_img from '../assets/default_img.png'

export const ImageGenerator = () => {

  const [imageUrl, setImgageUrl] = useState("/");
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
        return 0;
    } 
    const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer <OPENAI_KEY>",
                "User-Agent" : "Chrome",

            },
            body:JSON.stringify({
                prompt : `${inputRef.current.value}`,
                n : 1,
                size : "512x512"
            }),
        }
    );
    let data = await response.json();
    console.log(data);
    let data_array = data.data;
    setImgageUrl(data_array[0].url);
    console.log(data_array[0].url);
  }
 
  return (
    <div className='ai-image-generator'>
        <div  className='header'>
            AI Image Generator
            <div className='img-loading'>
                <div className='image'>
                   <img src={imageUrl === "/"? default_img : imageUrl} alt=""/>
                   {/* <div className="loading">
                      <div className="loading-bar">
                        <div className="loading-text">
                            Loading....
                        </div>

                      </div>
                   </div> */}
                </div>
            </div>
            <div className='search-box'>
                <input type='text' ref={inputRef} className='search-input' placeholder='Describe the image behaviour'/>
                <div className='generate-btn'onClick={() => {imageGenerator()}}> Generate </div>
            </div>
        </div>
    </div>
  )
}

// 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

export default ImageGenerator;
