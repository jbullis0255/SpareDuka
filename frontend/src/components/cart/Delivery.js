import React, { Fragment, useState } from "react";

import CheckoutOrder from "./CheckoutOrder";


import Loader from "../layout/Loader";
import MetaData from "../layout/metaData";

import { useDispatch, useSelector } from "react-redux";
import { saveDeliveryInfo } from "../../actions/cartActions";

const Delivery = ({ history }) => {
  const { deliveryInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(deliveryInfo.address);
  const [town, setTown] = useState(deliveryInfo.town);
  const [postalCode, setPostalCode] = useState(deliveryInfo.postalCode);
  const [phoneNo, setPhoneNo] = useState(deliveryInfo.phoneNo);
  const [street, setStreet] = useState(deliveryInfo.street);



  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveDeliveryInfo({ address, town, postalCode, phoneNo, street }));

    history.push("/confirm");
  };

  const mapsHandler =(e) => {
    e.preventDefault()

    history.push("/map")
  }


  return (
            
    <Fragment>
      <MetaData title={"Delivery Info"} />

      <CheckoutOrder deliver/>

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Delivery Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="town_field">Town</label>
              <select
                type="text"
                id="city_field"
                className="form-control"
                value={town}
                onChange={(e) => setTown(e.target.value)}
                required
              >
                 {/* , , , , , , , Lubaga, Nateete, Busega, Mutundwe, Ndeeba, Katwe, Kibuli, Kabalagala, Ntinda, Kiwaatule, Kisaasi; Najjanankumbi; Nakawa, Kyambogo, Nagulu, Bugoloobi, Mbuya, Luzira, Port Bell and Butabika. */}
               
               <option>Namirembe</option>
               <option>Naakulabye</option>
               <option>Kasubi</option>
               <option>Bwaise</option>
               <option>Kawempe</option>
               <option>Kikaaya</option>
               <option>Mpererwe</option>
               </select>
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                              
              />
            </div>

            <div className="form-group">
              <label htmlFor="street_field">Street</label>
              <input
                id="country_field"
                className="form-control"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              CONTINUE
            </button>
            <button
              id="maps_btn"
              onClick={mapsHandler}
              className="btn btn-block py-3 mt-2"
            >
              Search with Google Maps
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Delivery;
