import { ColumnsType } from "antd/es/table";
import { Image } from "antd";
import { ICategory, IGetListBrand, IProductItem } from "../../../../types/admin/product/product";
import { ISupplier } from "../../../../types/admin/supplier";

export const getAllProductHeader = (): ColumnsType<IProductItem> => [
    {
        title: "ID",
        key: "id",
        render: (_: any, __: any, index: number) => index + 1,
    },
    {
        title: "Image",
        key: "pro_image",
        render: (_: any, record: IProductItem) => {
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

    {
        title: "Action",
        key: "action",

    },
];


export const getCategoryHeader = (): ColumnsType<ICategory> => [
    {
        title: "ID",
        key: "id",
        render: (_: any, __: any, index: number) => index + 1,
    },
    {
        title: "Name",
        dataIndex: "cate_name",
        key: "cate_name",
    },
    {
        title: "Remark",
        dataIndex: "cate_remark",
        key: "cate_remark",
    },

    {
        title: "Action",
        key: "action",

    },
];

export const getSupplierHeader = (): ColumnsType<ISupplier> => [
    {
        title: "ID",
        dataIndex: "supplier_id",
        key: "supplier_id",
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Contract",
        dataIndex: "contact_info",
        key: "contact_info",
    },
    {
        title: "Address",
        dataIndex: "adresses",
        key: "adresses",
    },

    {
        title: "Action",
        key: "action",

    },
];
export const getAllBrandHeader = (
): ColumnsType<IGetListBrand> => [
        {
            title: "ID",
            key: "id",
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: "Image",
            key: "brand_logo",
            render: (_: any, record: IGetListBrand) => {
                const BASE_URL = "http://localhost:3003";
                return (
                    <Image
                        className="z-99999"
                        crossOrigin="anonymous"
                        src={
                            record.brand_logo
                                ? `${BASE_URL}${record.brand_logo}`
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
            dataIndex: "brand_name",
            key: "brand_name",
        },
        {
            title: "Description",
            dataIndex: "brand_description",
            key: "brand_description",
            ellipsis: true,
        },
        {
            title: "Brand Website",
            dataIndex: "brand_website",
            key: "brand_website",
        },
        {
            title: "Status",
            dataIndex: "brand_status",
            key: "brand_status",
        },
        {
            title: "Created at",
            dataIndex: "created_at",
            key: "created_at",
            render: (text: string) => new Date(text).toLocaleString(),
        },
        {
            title: "Action",
            key: "action",

        },
    ];