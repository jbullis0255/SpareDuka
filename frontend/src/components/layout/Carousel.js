import React,{Fragment, useState,useEffect} from "react";
import {
  CarouselWrapper,
  prev,
  next,

} from "react-pretty-carousel";
import { useSelector } from "react-redux";
import{Link} from "react-router-dom"; 



const Carousel = () => {
    
    // const { products } = useSelector((state) => state.products);
    // const[images, setImages] = useState([])

    
    // useEffect(() => {
    //   if(products){
    //       setImages(products)
    //   }
    //   console.log(products)
    // },[products])

  return (
      <Fragment>
         <h3 id="products_heading">Discounted Products</h3>
         <hr/>
      <CarouselWrapper items={5} mode="gallery" showControls={true}>
      {/* {images && images.map(product => ( */}
          
        {/* <Link  to={`/product/${product._id}`}> */}
        {/* <img
          className="image image1"
          src={product.images[0].url}
          alt=""
          key={product.images[0]._id}
        /> */}
        {/* </Link> */} 
      {/* ))} */}
     
      <div>
          <img
          src='/images/spare1.png'
          className='image image1'
          alt='img1'
          />
      </div>
          {/* <Link to='product/60f8de0f956ca931d0ea4832'> */}
      <div>
          <img
          src='/images/spare2.jpg'
          className='image image1'
          alt=''
          />
      </div>
      {/* </Link> */}
      
      <div>
          <img
          src='/images/rim2.jpg'
          className='image image1'
          alt=''
          />
      </div>
      <div>
          <img
          src='/images/bush1.png'
          className='image image1'
          alt=''
          />
      </div>
      <div>
          <img
          src='/images/bush2.jpg'
          className='image image1'
          alt=''
          />
      </div>
      <div>
          <img
          src='/images/spare1.png'
          className='image image1'
          alt=''
          />
      </div>
      <div>
          <img
          src='/images/spare1.png'
          className='image image1'
          alt=''
          />
      </div>
      <div>
          <img
          src='/images/spare1.png'
          className='image image1'
          alt=''
          />
      </div>
  
      </CarouselWrapper>
      </Fragment>
  );
};

export default Carousel;
