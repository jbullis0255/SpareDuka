import React ,{Fragment} from 'react'
import {useSelector} from 'react-redux'
import { Route, Redirect} from 'react-router-dom'


const ProtectedRoute = ({isSeller,isAdmin, component: Component, ...rest}) => {

    const {loading,user, isAuthenticated} = useSelector(state => state.auth)

    
    return (
        <Fragment>
           { loading === false && (
               <Route
               {...rest}
               render={props => {
                   if(isAuthenticated === false) {
                       return <Redirect to='/login'/>
                    }

                //    if(isSeller === true && (user && user.role === 'seller')){
                //        return <Redirect to="/seller/dashboard" />
                //    }

                //    if(isAdmin === true && user && user.role !== 'admin'){
                //         return <Redirect to='/' />
                //    }

                        return <Component {...props} />
                           
                }}
                />
                
            )}
        </Fragment>
    )}

export default ProtectedRoute
