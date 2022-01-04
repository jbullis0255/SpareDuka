import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader";

import MetaData from "../layout/metaData";
import SideBar from "./SideBar";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { updateUser,getUserDetails, clearErrors } from "../../actions/userActions";

import { UPDATE_USER_RESET } from "../../constants/userConstants";

const UpdateUser = ({ match, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.userDetails);
  const { error,loading, isUpdated } = useSelector((state) => state.user);

  const userId = match.params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");

      history.push("/admin/users");

      dispatch({
        type: UPDATE_USER_RESET,
        //  isUpdated: false
      });
    }
  }, [dispatch, alert, error, userId, history, isUpdated, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);

    dispatch(updateUser(user._id,formData));
  };

  return (
    <Fragment>
      <MetaData title={"Update User"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>

        <div className="col-12 col-md-10">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h3 className="mt-2 mb-5">Update User</h3>

                <div className="form-group">
                  <label for="name_field">Name</label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label for="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label for="role_field">Role</label>

                  <select
                    id="role_field"
                    className="form-control"
                    name="role"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                  >
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                    <option value="seller">seller</option>
                    <option value="mechanic">mechanic</option>
                  </select>
                </div>

                {loading ? (
                <Loader/>
                ): (

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
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
