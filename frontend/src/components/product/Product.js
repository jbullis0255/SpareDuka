import React from "react";
import {Link} from 'react-router-dom'

const Product = ({ product, col }) => {
  return (
  
    <div className={`col-xs-6 col-sm-4 col-md-3 col-lg-2 ${col} my-3`}>
      <div key={product._id} className="pdt-card px-2">
        <Link  to={`/product/${product._id}`}>
        <img
          className="card-img-top mx-auto"
          src={product.images[0].url}
          alt=""
        />
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product._id}`} >{product.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numofReviews})</span>
          </div>
          <p className="card-text">UGX {product.price.toLocaleString()}</p>
          <Link to={`/product/${product._id}`} id="view_btn" className="pdt-details btn btn-block">
            View Details
          </Link>
        </div>
      </div>
    </div>
    
   
  );
};

export default Product;
