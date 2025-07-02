import React, { useState, useEffect } from "react";
import order from "../../api/order";
import auth from "../../api/auth";
import { Typography, Spin, Empty, Tag } from "antd";

const { Title, Text } = Typography;

const ViewHistoryCus: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const getCustomerOrders = async () => {
        try {
            setLoading(true);
            const meRes = await auth.getMe();
            console.log("MeRes", meRes)
            const customerId = meRes.data.customerId;

            const historyRes = await order.viewHistoryOrderCus(customerId);
            setOrders(historyRes.data.orders);
        } catch (error) {
            console.error("Error fetching customer orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCustomerOrders();
    }, []);

    const getPaymentTag = (status: string) => {
        switch (status) {
            case "pending":
                return <Tag color="orange">Pending</Tag>;
            case "verified":
                return <Tag color="green">Verified</Tag>;
            default:
                return <Tag color="default">{status}</Tag>;
        }
    };

    const getShippingTag = (status: string) => {
        switch (status) {
            case "waiting":
                return <Tag color="red">Waiting</Tag>;
            case "processing":
                return <Tag color="blue">Processing</Tag>;
            default:
                return <Tag>{status}</Tag>;
        }
    };

    return (
        <div className="p-4">
            <Title level={3}>🧾 Order History</Title>
            {loading ? (
                <Spin size="large" />
            ) : orders.length === 0 ? (
                <Empty description="No orders found" />
            ) : (
                <div className="grid gap-4">
                    {orders.map((order) => (
                        <div
                            key={order.sell_id}
                            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="flex justify-between">
                                <Text strong>Order ID:</Text>
                                <Text>{order.sell_id}</Text>
                            </div>
                            <div className="flex justify-between">
                                <Text strong>Date:</Text>
                                <Text>{order.sell_date}</Text>
                            </div>
                            <div className="flex justify-between">
                                <Text strong>Time:</Text>
                                <Text>{order.sell_time}</Text>
                            </div>
                            <div className="flex justify-between">
                                <Text strong>Total Price:</Text>
                                <Text>{Number(order.sell_sprice).toLocaleString()} ₭</Text>
                            </div>
                            <div className="flex justify-between">
                                <Text strong>Payment Status:</Text>
                                {getPaymentTag(order.payment_status)}
                            </div>
                            <div className="flex justify-between">
                                <Text strong>Shipping Status:</Text>
                                {getShippingTag(order.shipping_status)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewHistoryCus;
