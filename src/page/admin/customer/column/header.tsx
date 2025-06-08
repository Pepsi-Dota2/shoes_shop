import { ColumnsType } from "antd/es/table";
import { ICustomer } from "../../../../types/admin/customer";
import { DeleteOutlined } from "@ant-design/icons";

export const getCustomerHeader = (
    onDelete: (record: ICustomer) => void
): ColumnsType<ICustomer> => [
        {
            title: "ID",
            dataIndex: "cus_id",
            key: "cus_id",
        },
        {
            title: "Name",
            dataIndex: "cus_name",
            key: "cus_name",
            render: (name: string | null) => name ?? "N/A",
        },
        {
            title: "Sex",
            dataIndex: "sex",
            key: "sex",
            render: (sex: string | null) => sex ?? "N/A",
        },
        {
            title: "Phone Number",
            dataIndex: "tel",
            key: "tel",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Status",
            dataIndex: "cus_status",
            key: "cus_status",
            render: (status: string | null) => status ?? "N/A",
        },
        {
            title: "Action",
            key: "action",
            render: (_: unknown, record: ICustomer) => (
                <div style={{ display: "flex", gap: 8 }}>
                    <DeleteOutlined
                        style={{ color: "red" }}
                        onClick={() => onDelete(record)}
                    />
                </div>
            ),
        },
    ];
