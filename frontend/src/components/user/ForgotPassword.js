import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader";

import MetaData from "../layout/metaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import { forgotPassword, clearErrors } from "../../actions/userActions";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("email", email);

    dispatch(forgotPassword(formData));
  };
  
  return (
    <Fragment>
      <MetaData title={"Forgot Password"} />

      <div className="row wrapper">
          <form className="shadow-lg" onSubmit={submitHandler}>
        <div className="col-10 col-lg-5">
            <h3 className="mb-3">Forgot Password</h3>
            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={e=> setEmail(e.target.value)}
              />
            </div>

                {loading ? (
                    <Loader/>
                ):(
            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Send Email
            </button>

                )}
        </div>
          </form>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
