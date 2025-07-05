import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import product from "../../../../api/product";
import recieve_detail from "../../../../api/recieve_detail";
import { Button, Form, InputNumber, message, Select } from "antd";
import { IProductItem } from "../../../../types/admin/product/product";
import { RecieveDetailWithRelations } from "../../../../types/admin/recieve";

const CrateReceiveDetail = () => {
    const [form] = useForm();
    const [receiveList, setReceiveList] = useState<RecieveDetailWithRelations[]>([]);
    const [productList, setProductList] = useState<IProductItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const receiveResponse = await recieve_detail.getReceiveDetail();
                setReceiveList(receiveResponse.data);
                const productResponse = await product.getProduct();
                setProductList(productResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const onFinish = async (values: { re_id: number; pro_id: number; qty: number }) => {
        try {
            setLoading(true);
            await recieve_detail.createReceiveDetail({
                re_id: values.re_id,
                pro_id: values.pro_id,
                qty: String(values.qty),
            });
            message.success("Receive detail created successfully");
            form.resetFields();
        } catch (error) {
            console.error(error);
            message.error("Failed to create receive detail");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 24, maxWidth: 600 }}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Receive ID"
                    name="re_id"
                    rules={[{ required: true, message: "Please enter receive ID" }]}>
                    <InputNumber min={1} className="w-full" placeholder="Enter receive ID" />
                </Form.Item>
                
                <Form.Item
                    label="Product"
                    name="pro_id"
                    rules={[{ required: true, message: "Please select product" }]}
                >
                    <Select
                        showSearch
                        placeholder="Select Product"
                        optionFilterProp="label"
                        options={productList.map(item => ({
                            label: item.pro_name,
                            value: item.pro_id,
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    label="Quantity"
                    name="qty"
                    rules={[{ required: true, message: "Please enter quantity" }]}
                >
                    <InputNumber min={1} className="w-full" placeholder="Enter quantity" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CrateReceiveDetail;
