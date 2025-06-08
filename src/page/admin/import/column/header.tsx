import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { IShoeReturnData } from "../../../../types/admin/re_import";

export const getShoeReturnHeader = (
    handleStatusClick: (record: IShoeReturnData) => void
): ColumnsType<IShoeReturnData> => [
        {
            title: "ID",
            dataIndex: "re_id",
            key: "re_id",
        },
        {
            title: "Selling Price",
            dataIndex: "re_sprice",
            key: "re_sprice",
        },
        {
            title: "Status",
            dataIndex: "re_status",
            key: "re_status",
            render: (text: string, record: IShoeReturnData) => (
                <a onClick={() => handleStatusClick(record)}>
                    <Tag color="processing">{text}</Tag>
                </a>
            ),
        },
        {
            title: "Return Date",
            dataIndex: "re_date",
            key: "re_date",
        },
        {
            title: "Return Time",
            dataIndex: "re_time",
            key: "re_time",
        },
        {
            title: "Remark",
            dataIndex: "re_remaek",
            key: "re_remaek",
        },
    ];
