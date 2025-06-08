import { Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICustomer } from "../../../types/admin/customer";
import customer from "../../../api/customer";
import { getCustomerHeader } from "./column/header";

const Customer: React.FC = () => {
    const navigate = useNavigate();
    const [getAllCustomer, setGetAllCustomer] = useState<ICustomer[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(
        null
    );
    const [isOpenModal, setIsSelectModal] = useState(false);
    const fectData = async () => {
        try {
            const response = await customer.getAllCustomer();
            setGetAllCustomer(response.data)

        } catch (error) {
            throw error
        }
    }
    useEffect(() => {
        fectData();
    }, [])

    const onDelete = async (id: string) => {
        try {
            const res = await customer.deleteCustomer(id);
            fectData();
            return res;
        } catch (error) {
            throw error;
        }
    };

    const handleDelete = (record: ICustomer) => {
        setSelectedProductId(record.cus_id.toString());
        setIsSelectModal(true);
    };
    const columns = getCustomerHeader(handleDelete)
    return (
        <div>
            <Table
                loading={isLoading}
                className="bg-white rounded-lg"
                title={() => {
                    return (
                        <div className="flex justify-between">
                            <div className="font-bold text-xl">Customer</div>
                        </div>
                    );
                }}
                columns={columns}
                dataSource={getAllCustomer}
                pagination={{ pageSize: 10 }}
            />
            <Modal
                title="Do you want to delete Product?"
                centered
                open={isOpenModal}
                onOk={() => {
                    if (selectedProductId) {
                        onDelete(selectedProductId);
                    }
                    setIsSelectModal(false);
                }}
                onCancel={() => setIsSelectModal(false)}
            >
                <p>Are you sure to delete?</p>
            </Modal>
        </div>
    )
}
export default Customer