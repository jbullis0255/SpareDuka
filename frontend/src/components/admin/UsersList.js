import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import Loader from "../layout/Loader";
import MetaData from "../layout/metaData";

import SideBar from "./SideBar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import { getAllUsers,deleteUser, clearErrors } from "../../actions/userActions";

import { DELETE_USER_RESET } from '../../constants/userConstants'

const UsersList = ({history}) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("User Deleted Successfully");
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, alert,isDeleted,history, error]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "desc",
        },
        {
          label: "Name",
          field: "name",
          sort: "desc",
        },
        {
          label: "Email",
          field: "email",
          sort: "desc",
        },
        {
          label: "Role",
          field: "role",
          sort: "desc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <Fragment>
            <Link
              className="btn btn-primary py-1 px-2"
              to={`/admin/user/${user._id}`}
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={()=>deleteUserHandler(user._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return(
    <Fragment>
    <MetaData title={'All Users'}/>
    <div className="row">
        <div className="col-12 col-md-2">
            <SideBar />
        </div>

        <div className='col-12 col-md-10'>
            <Fragment>
                <h1 className="my-5">All Users</h1>

                {loading ? <Loader/> :(
                        <MDBDataTable
                        data={setUsers()}
                        className="px-3"
                        bordered
                        striped
                        hover
                    />
                )}
            </Fragment>

        </div>
    </div>
    
</Fragment>
  )
};

export default UsersList;
