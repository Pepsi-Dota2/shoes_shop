import { Button, Image, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { getHistoryHeader } from "./column/column";
import { useEffect, useState } from "react";
import order from "../../../api/order";
import { IGetAllOrder } from "../../../types/admin/history/history";

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [getAllOrder, setGetAllOrder] = useState<IGetAllOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {};
  const handleDelete = () => {};

  const fectData = async () => {
    try {
      setIsLoading(true)
      const res = await order.getAllOrder();
      setGetAllOrder(res.data);
      return res;
    } catch (error) {
      throw error;
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fectData();
  }, []);

  const columns = getHistoryHeader();
  return (
    <div>
      <Table
      loading={isLoading}
        className="bg-white rounded-lg"
        title={() => {
          return (
            <div className="flex justify-between">
              <div className="font-bold text-xl">Report order</div>
            </div>
          );
        }}
        columns={columns}
        dataSource={getAllOrder}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default HistoryPage;
