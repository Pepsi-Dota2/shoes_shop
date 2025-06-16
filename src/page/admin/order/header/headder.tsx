import { Image, Tag } from "antd";
import { IGetAllOrder } from "../../../../types/admin/history/history";
import { ColumnsType } from "antd/es/table";
import FlagImage from "/src/assets/country/english.jpg"

export const getOrderHeader = (
  handleStatusClick: (record: IGetAllOrder) => void
): ColumnsType<IGetAllOrder> => [
    {
      title: "ID",
      key: "id",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Payment  Image",
      dataIndex: "payment_image",
      key: "payment_image",
      render: (_: any, record: IGetAllOrder) => {
        const BASE_URL = "http://localhost:3003";
        console.log("log image", record.payment_image)
        return (
          <Image
            className="z-99999"
            crossOrigin="anonymous"
            src={
              record.payment_image
                ? `${BASE_URL}${record.payment_image}`
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
      title: "Customer name",
      dataIndex: "sell_sprice",
      key: "sell_sprice",
    },
    {
      title: "Status",
      dataIndex: "payment_status",
      key: "payment_status",
      render: (text: string, record: IGetAllOrder) => (
        <a onClick={() => handleStatusClick(record)}>
          <Tag color="processing">{text}</Tag>
        </a>
      ),
    },

    {
      title: "Created At",
      dataIndex: "sell_date",
      key: "sell_date",
    },
  ];

export const getShippingHeader = (
  handleStatusClick: (record: IGetAllOrder) => void
): ColumnsType<IGetAllOrder> => [
    {
      title: "ID",
      key: "id",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Payment  Image",
      dataIndex: "pro_image",
      key: "pro_image",
      render: (_: any, record: any) => {
        const BASE_URL = "http://localhost:3003";
        return (
          <Image
            className="z-99999"
            crossOrigin="anonymous"
            src={
              record.payment_image
                ? `${BASE_URL}${record.pro_image}`
                : FlagImage
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
      title: "Customer name",
      dataIndex: "sell_sprice",
      key: "sell_sprice",
    },
    {
      title: "Status",
      dataIndex: "shipping_status",
      key: "shipping_status",
      render: (text: string, record: IGetAllOrder) => (
        <a onClick={() => handleStatusClick(record)}>
          <Tag color="processing">{text}</Tag>
        </a>
      ),
    },

    {
      title: "Created At",
      dataIndex: "sell_date",
      key: "sell_date",
    },
  ];
