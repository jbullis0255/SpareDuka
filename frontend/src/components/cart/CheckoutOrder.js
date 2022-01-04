import React from 'react'

import {Link} from 'react-router-dom'

const CheckoutOrder = ({deliver, confirmOrder, payment}) => {
    return (
        <div className="checkout-progress d-flex justify-content-center mt-5">

            {deliver ? <Link to= '/delivery' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Deliver</div>
                <div className="triangle-active"></div>
            </Link> :
            <Link to='#!' disabled>
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Deliver</div>
                <div className="triangle-incomplete"></div>
            </Link>
                }

            {confirmOrder ? <Link to= '/confirm' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Confirm Order</div>
                <div className="triangle-active"></div>
            </Link> :
            <Link to='#!' disabled>
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Confirm Order</div>
                <div className="triangle-incomplete"></div>
            </Link>
                }

            {payment ? <Link to= '/payment' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Payment</div>
                <div className="triangle-active"></div>
            </Link> :
            <Link to='#!' disabled>
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Payment</div>
                <div className="triangle-incomplete"></div>
            </Link>
                }
        </div>
    )
}

export default CheckoutOrder
