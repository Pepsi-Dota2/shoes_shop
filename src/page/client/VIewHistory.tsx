import React, { useState } from "react";
import order from "../../api/order";
import auth from "../../api/auth";

const ViewHistoryCus: React.FC = () => {
    const [getCusId, setGetCusId] = useState();
    const [getViewOrder, setViewOrder] = useState();

    const getMe = async () => {
        try {
            const getMe = await auth.getMe();
            console.log("get customer: ", getMe.user.customerId)
            setGetCusId(getMe.user.customerId);

        } catch (error) {
            throw error
        }
    }

    const getHistoryOrderCus = async () => {
        try {
            const res = await order.viewHistoryOrderCus(getCusId ?? 0);
            setViewOrder(res)

        } catch (error) {
            throw error
        }
    }
    return (
        <div>
            hello history
        </div>
    )
}

export default ViewHistoryCus