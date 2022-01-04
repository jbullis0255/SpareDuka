import React, { Fragment, useEffect, useState } from "react";

import "rc-slider/assets/index.css";

import MetaData from "../layout/metaData";

import Pagination from "react-js-pagination";

import { useDispatch, useSelector } from "react-redux";
import { getSellerProducts } from "../../actions/productActions";
import { useAlert } from "react-alert";
import Product from "../product/Product";
import Loader from "../layout/Loader"



const SellerProfile = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const alert = useAlert();

  const dispatch = useDispatch();

  const { productsCount, resPerPage } = useSelector((state) => state.products);

  const { loading, error, sellerProducts } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getSellerProducts(currentPage));
  }, [dispatch, alert, error, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  
  let count = productsCount

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"SpareDuka - Genuine parts you can trust"} />
          <h1 id="products_heading">Latest Products</h1>
          <hr />
          <section id="products" className="container mt-5">
            <div className="row">
              {sellerProducts && sellerProducts.map((product) => (
              <Product key={product._id} product={product} col={2} />
              ))}
              
            </div>
          </section>
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

export default SellerProfile;
