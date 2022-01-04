import React, { Fragment, useEffect, useState } from "react";
import Loader from '../layout/Loader'

import MetaData from "../layout/metaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import { registerSeller, clearErrors } from "../../actions/userActions";

const RegisterSeller = ({ history }) => {
  const [user, setUser] = useState({
    name: "",
    email: "", 
    password: "",
    phoneNumber: "",
    address: "",
  });

  const { name, email, password, phoneNumber,address} = user;

  const [avatar, setAvatar] = useState("");
  const [legalDocuments, setLegalDocuments] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/avatar1.jpg");
  const [legalDocumentsPreview, setLegalDocumentsPreview] = useState("/images/avatar1.jpg");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error) {
      alert.success(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated,error, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("phoneNumber", phoneNumber);
    formData.set("address", address);
    formData.set("avatar", avatar);
    formData.set("legalDocuments", legalDocuments);

    var object = {}
    formData.forEach((value, key)=> object[key] = value)
    var json = object
 
    dispatch(registerSeller(json));
 
  };

  const onChange = (e) => {
      if(e.target.name === 'avatar'){
        const reader = new FileReader();
        
        reader.onload = () => {
          if(reader.readyState === 2){
            setAvatarPreview(reader.result)
            setAvatar(reader.result);
          }
        }
        reader.readAsDataURL(e.target.files[0])
        
      }else{
        setUser({...user, [e.target.name]: e.target.value })
      }
      
  }

  const onChange1 = (e) => {
      if(e.target.name === 'legalDocuments'){
        const reader = new FileReader();
        
        reader.onload = () => {
          if(reader.readyState === 2){
            setLegalDocumentsPreview(reader.result)
            setLegalDocuments(reader.result);
          }
        }
        reader.readAsDataURL(e.target.files[0])
        
      }else{
        setUser({...user, [e.target.name]: e.target.value })
      }
      
  }

  return (
    <Fragment>
      <MetaData title={"Register Seller"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler} encType="application/json">
            <h4 className="mb-3">Register As Seller</h4>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber_field">PhoneNo</label>
              <input
                type="phoneNumber"
                id="phoneNumber_field"
                className="form-control"
                name="phoneNumber"
                value={phoneNumber}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="name"
                id="address_field"
                className="form-control"
                name="address"
                value={address}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                    src={avatarPreview}
                    className="rounded-circle" 
                    alt="Avatar Preview" />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Image
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Legal Documents</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                    src={legalDocumentsPreview}
                    className="rounded-circle" 
                    alt="LegalDocuments Preview" />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="legalDocuments"
                    className="custom-file-input"
                    id="custom1File"
                    accept="images/*"
                    required
                    onChange={onChange1}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                     Document
                  </label>
                </div>
              </div>
            </div>

            {loading ? (
              <Loader/>
            ): (

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              REGISTER
            </button>
            )}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterSeller;
