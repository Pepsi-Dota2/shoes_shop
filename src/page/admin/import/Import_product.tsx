import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table, Space, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getShoeReturnHeader } from "./column/header";
import import_product from "../../../api/import_product";
import { IShoeReturnData } from "../../../types/admin/re_import";
import { useNavigate } from "react-router-dom";

const ImportProduct: React.FC = () => {
    const [data, setData] = useState<IShoeReturnData[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const saved = localStorage.getItem("importData");
            if (saved) {
                setData(JSON.parse(saved));
            } else {
                const res = await import_product.getAllImport();
                const loaded = res.data || res;
                setData(loaded);
                localStorage.setItem("importData", JSON.stringify(loaded));
            }
        } catch (error) {
            message.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id: string) => {
        try {
            const filtered = data.filter(item => item.re_id !== id);
            setData(filtered);
            localStorage.setItem("importData", JSON.stringify(filtered));
            message.success("Product deleted successfully!");
        } catch (error) {
            message.error("Failed to delete product");
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/import/edit/${id}`);
    };

    const handleStatusClick = (record: IShoeReturnData) => {
        console.log("Status clicked:", record);
        // You can add status update logic here
    };

    const columns = [
        ...getShoeReturnHeader(handleStatusClick),
        {
            title: "Actions",
            key: "actions",
            width: 120,
            render: (_: any, record: IShoeReturnData) => (
                <Space size="small">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEdit(record.re_id)}
                        title="Edit"
                    />
                    <Popconfirm
                        title="Delete Product"
                        description="Are you sure you want to delete this product?"
                        onConfirm={() => handleDelete(record.re_id)}
                        okText="Yes"
                        cancelText="No"
                        placement="topRight"
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                            title="Delete"
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Table
                className="bg-white rounded-lg"
                loading={loading}
                title={() => (
                    <div className="flex justify-between items-center">
                        <div className="font-bold text-xl">Import Products</div>
                        <Button
                            type="primary"
                            onClick={() => navigate("/import/create")}
                            size="large"
                        >
                            + Create Product
                        </Button>
                    </div>
                )}
                columns={columns}
                dataSource={data}
                rowKey="re_id"
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                }}
                scroll={{ y: 400 }}
            />
        </div>
    );
};

export default ImportProduct;