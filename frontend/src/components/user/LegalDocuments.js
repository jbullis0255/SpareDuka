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

const LegalDocuments = ({ history }) => {

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/avatar1.jpg");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Documents updated Successfully");
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
    ;
    formData.set("avatar", avatar);

    dispatch(updateProfile(formData));
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
      <MetaData title={"Legal Documents"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler} encType="application/json">
            <h3 className="mt-2 mb-5">Upload Legal Documents</h3>


            <div className="form-group">
              <label htmlFor="avatar_upload">Document</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className=" mr-3 item-rtl">
                    <img src={avatarPreview} className="legal-doc" alt="Document Preview" />
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
                    Choose Document
                  </label>
                </div>
              </div>
            </div>

            {loading ? (
              <Loader/>
            ): (
            <button type="submit" className="btn update-btn btn-block mt-4 mb-3">
              Upload
            </button>
             )}

          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default LegalDocuments;
