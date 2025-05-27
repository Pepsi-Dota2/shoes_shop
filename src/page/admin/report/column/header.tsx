import { ColumnsType } from "antd/es/table";
import { IProductItem } from "../../../../types/admin/product/product";
import { Image } from "antd";
import { IGetAllOrder } from "../../../../types/admin/history/history";

export const getReportProductHeader = (): ColumnsType<IProductItem> => [
    {
        title: "ID",
        key: "id",
        render: (_: any, __: any, index: number) => index + 1,
    },
    {
        title: "Image",
        key: "pro_image",
        render: (_: any, record: any) => {
            const BASE_URL = "http://localhost:3003";
            return (
                <Image
                    className="z-99999"
                    crossOrigin="anonymous"
                    src={
                        record.pro_image
                            ? `${BASE_URL}${record.pro_image}`
                            : "/src/assets/country/english.jpg"
                    }
                    alt="product"
                    width={40}
                    height={40}
                    style={{ objectFit: "cover" }}
                />
            );
        },
    },

    {
        title: "Name",
        dataIndex: "pro_name",
        key: "pro_name",
    },
    {
        title: "Detail",
        dataIndex: "pro_detail",
        key: "pro_detail",
        ellipsis: true,
    },
];

export const getHistoryHeader = (): ColumnsType<IGetAllOrder> => [
        {
            title: "ID",
            key: "id",
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: "Image",
            dataIndex: "payment_image",
            key: "payment_image",
            render: (_: any, record: any) => {
                const BASE_URL = "http://localhost:3003";
                return (
                    <Image
                        crossOrigin="anonymous"
                        src={`${BASE_URL}${record.payment_image}`}
                        alt="payment"
                        width={40}
                        height={40}
                        style={{ objectFit: "cover" }}
                    />
                );
            },
        },
        {
            title: "Customer name",
            dataIndex: "customer",
            key: "customer",
            render: (customer: { cus_name: string }) => customer?.cus_name,
        },
        {
            title: "phone number",
            dataIndex: "customer",
            key: "customer",
            render: (customer: { tel: string }) => customer?.tel,
        },
        {
            title: "Address",
            dataIndex: "customer",
            key: "customer",
            render: (customer: { address: string }) => customer?.address,
        },
    ];
