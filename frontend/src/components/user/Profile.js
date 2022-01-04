import React, { Fragment } from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "../layout/Loader";
import MetaData from "../layout/metaData";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  return (
    <Fragment>
      {loading ? <Loader />
       : (
        <Fragment>
          <MetaData title={"Your Profile"} />

          <h2 className="mt-5 ml-5">My Profile</h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img className="rounded-circle img-fluid" src={user && user.avatar.url} alt={user && user.name} />
              </figure>
              <Link
                to="/me/update"
                id="edit_profile"
                className="btn btn-primary btn-block my-5"
              >
                Edit Profile
              </Link>
              {user && user.role === 'seller' &&(
              <Link
                to="/seller/catalog"
                id=""
                className="btn btn-success btn-block mt-1"
              >
                My Products
              </Link>
              )}
            </div>

            <div className="col-12 col-md-5">
              <h4>Full Name</h4>
              <p>{user && user.name}</p>

              <h4>Email Address</h4>
              <p>{user && user.email}</p>

              {user && user.role === 'seller' && (
                <div>
              <h4>PhoneNo</h4>
              <p>{user && user.phoneNumber}</p>
              </div>
              )}

              {user && user.role === 'seller' && (
                <div>
                  <h4>Address</h4>
                 <p>{user && user.address}</p>
                 </div>
              )}
              <h4>Joined Date</h4>
              <p>{String(user && user.createdAt).substring(0, 10)}</p>

                {user && user.role ===  'user' && (
              <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                My Orders
              </Link>
                )}

                {/* {user && user.role === 'seller' && (
                    <a href={user && user.legalDocuments.url} className="btn btn-danger btn-block mt-5">
                    Legal Documents
                  </a>
            )} */}

              <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                Change Password
              </Link>
            </div>
          </div> 
          
          
         
        </Fragment>
    
      )}
    </Fragment>
  );
};

export default Profile;
