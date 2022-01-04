import React, { Fragment, useEffect, useState } from "react";
import Alert from 'react-bootstrap/Alert'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import MetaData from "./layout/metaData";

// import Carousel from './layout/Carousel'

import Pagination from "react-js-pagination";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { useAlert } from "react-alert"; 
import Product from "./product/Product"; 
import Loader from "./layout/Loader";

const {createSliderWithTooltip} = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = ({match}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([10000,5000000 ])
  const [category, setCategory] = useState('')
  const [rating, setRating] = useState(0)
  // const [seller, setSeller] = useState([])

  const categories = [
    'Tyres and Rims',
    'Engines and More',
    'Car Batteries',
    'Lights and More',
    'Brakes and More',
    'Car Service ',
    'Exterior Parts',
    'Car Trackers',
    'Detailed Parts',
  ]

 
  const alert = useAlert();

  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage, filteredProductsCount,sellers} = useSelector(
    (state) => state.products );

  const keyword = match.params.keyword

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price,category,rating));

  }, [dispatch, alert, error,keyword, currentPage,price, category,rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount
  if(keyword){
    count = filteredProductsCount
  }
  

  return (
    <Fragment>
      {/* <Carousel/> */}
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"SpareDuka - Genuine parts you can trust"} />
          {/* <div className=" col-xs-6 col-sm-4 col-md-3 col-lg-12 ">
            //new bootstrap Component for carousel
            <Carousel fade >
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src='/images/spare1.png'
                  alt="First slide"
                />
              </Carousel.Item>
              
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/images/spare1.png"
                  alt="Second slide"
                />
              </Carousel.Item>
             
            </Carousel>
          </div> */}

        <h2 id="products_heading">Latest Products</h2>
        <hr/>
          
          {count === 0 ?(
            <Alert variant="info">There are No Products available with this name <br/>Please Search Again!!</Alert>
          ):(
            <section id="products" className="container mt-5">
            <div className="row">
              {keyword && keyword ? (
                  <Fragment>
                    <div className="col-4 col-md-3 mt-5 mb-5">
                      <div className="px-5">
                        <Range 
                       
                          marks= {{
                            10000: 'UGX 10000',
                            5000000: 'UGX 5000000' 
                          }}
                          min={10000}
                          max={5000000}
                          defaultValue={[10000,5000000]}
                          tipFormatter={value => `${value}`}
                          tipProps={{
                            placement:'top',
                            visible: true
                          }}
                          value={price}
                          onChange={price => setPrice(price)}
                        />

                          <hr className="my-5" />

                          <div className="mt-3">
                            <h4 className="mb-3">
                              Categories
                            </h4>
                            <ul className="pl-0">
                              {categories && categories.map(category => (
                                <li
                                className="lists"
                                style={{cursor:'pointer', listStyleType:'none'}}
                                key={category}
                                onClick={()=>setCategory(category)}
                                >
                                  {category}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <hr className="my-5" />
{/* 
                          <div className="mt-3">
                            <h4 className="mb-3">
                              Seller
                            </h4>
                            <ul className="pl-0">
                              {sellers.map(seller => (
                                <li
                                className="lists"
                                style={{cursor:'pointer', listStyleType:'none'}}
                                key={seller}
                                onClick={()=>setSeller(seller)}
                                >
                                  {seller}
                                </li>
                              ))}
                            </ul>
                          </div> */}

                          <hr className="my-3" />

                          <div className="mt-3">
                            <h4 className="mb-3">
                              Ratings
                            </h4>
                            <ul className="pl-0">
                              {[5,4,3,2,1].map(star => (
                                <li
                                className="lists"
                                style={{cursor:'pointer', listStyleType:'none'}}
                                key={star}
                                onClick={()=>setRating(star)}
                                >
                                  <div className="rating-outer">
                                    <div className="rating-inner"
                                      style={{
                                        width:`${star * 20}%`
                                      }}
                                    >

                                      </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>

                      </div>
                    </div>
                    <div className="col-8 col-md-9" >
                      <div className="row ">
                        {products && products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))}
                      </div>
                    </div>
                  </Fragment>
              ): (
               products && products.map((product) => (
                  <Product key={product._id} product={product} col={2}/>
                ))
              )}
            
            </div>
          </section>
          )}
          
          {/* pagination */}
         
          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
