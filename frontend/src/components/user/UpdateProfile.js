import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader";

import MetaData from "../layout/metaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";

const UpdateProfile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/avatar1.jpg");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
      setAddress(user.address);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      dispatch(loadUser());

      history.push("/me");

      dispatch({
        type: UPDATE_PROFILE_RESET,
        //  isUpdated: false
      });
    }
  }, [dispatch, alert, error, history, isUpdated, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("phoneNumber", phoneNumber);
    formData.set("address", address);
    formData.set("avatar", avatar);

    var object = {};
    formData.forEach((value, key) => (object[key] = value));
    var json = object;

    dispatch(updateProfile(json));
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <Fragment>
      <MetaData title={"Update Profile"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="application/json"
          >
            <h3 className="mt-2 mb-5">Update Profile</h3>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {user && user.role === "seller" && (
              <div className="form-group">
                <label htmlFor="phoneNumber_field">PhoneNo</label>
                <input
                  type="phoneNumber"
                  id="phoneNumber_field"
                  className="form-control"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            )}

            {user && user.role === "seller" && (
              <div className="form-group">
                <label htmlFor="address_field">Address</label>
                <input
                  type="name"
                  id="address_field"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
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
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="btn update-btn btn-block mt-4 mb-3"
              >
                Update
              </button>
            )}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
