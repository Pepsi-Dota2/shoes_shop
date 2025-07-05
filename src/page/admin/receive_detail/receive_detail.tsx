import { useEffect, useState } from "react";
import { Table, Tag, Typography, Spin, Button, Popconfirm } from "antd";
import { RecieveDetailWithRelations } from "../../../types/admin/recieve";
import recieve_detail from "../../../api/recieve_detail";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const ReceiveDetail = () => {
    const [data, setData] = useState<RecieveDetailWithRelations[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const getAlldData = async () => {
        try {
            setLoading(true);
            const response = await recieve_detail.getReceiveDetail();
            setData(response.data);
            ;
        } catch (error) {
            console.error("Error fetching receive details:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (re_id: number, pro_id: number) => {
        try {
            setLoading(true);
            await recieve_detail.deleteReceiveDetail(re_id, pro_id);
            await getAlldData();
        } catch (error) {
            console.error("Delete failed:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getAlldData();
    }, [])

    const columns = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: "Product Name",
            dataIndex: ["product", "pro_name"],
            key: "pro_name",
        },
        {
            title: "Quantity",
            dataIndex: "qty",
            key: "qty",
        },
        {
            title: "Unit Price",
            dataIndex: ["receive", "re_sprice"],
            key: "re_sprice",
        },
        {
            title: "Receive Date",
            dataIndex: ["receive", "re_date"],
            key: "re_date",
            render: (date: number) =>
                String(date).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"),
        },
        {
            title: "Time",
            dataIndex: ["receive", "re_time"],
            key: "re_time",
        },
        {
            title: "Status",
            dataIndex: ["receive", "re_ststus"],
            key: "re_ststus",
            render: (status: string) => {
                const color =
                    status === "completed"
                        ? "green"
                        : status === "pending"
                            ? "orange"
                            : "red";
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: RecieveDetailWithRelations) => (
                <Popconfirm
                    title="Are you sure you want to delete this record?"
                    onConfirm={() => handleDelete(record.re_id, record.pro_id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Delete</Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div className="bg-white" style={{ padding: 24 }}>
            <div className=" flex justify-between items-center mb-4">
                <Title level={3}>Receive Product</Title>
                <Button onClick={() => navigate("/product/create/detail")} children={"Create"} />
            </div>


            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin size="large" />
                </div>
            ) : (
                <Table
                    dataSource={data}
                    columns={columns}
                    rowKey={(record) => `${record.re_id}-${record.pro_id}`}
                    bordered
                    pagination={{ pageSize: 10 }}
                />
            )}
        </div>
    );
};

export default ReceiveDetail;
