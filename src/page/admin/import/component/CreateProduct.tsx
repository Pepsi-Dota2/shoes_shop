import React, { useState, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IShoeReturnData } from "../../../../types/admin/re_import";

const AddImportProduct: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            loadProductData(id);
        }
    }, [id]);

    const loadProductData = (productId: string) => {
        const existingData = JSON.parse(localStorage.getItem("importData") || "[]");
        const product = existingData.find((item: IShoeReturnData) => item.re_id === productId);

        if (product) {
            form.setFieldsValue({
                re_sprice: product.re_sprice,
                re_status: product.re_status,
                re_date: product.re_date,
                re_time: product.re_time,
                re_remaek: product.re_remaek,
            });
        } else {
            message.error("Product not found!");
            navigate("/import");
        }
    };

    const handleSubmit = (values: any) => {
        setLoading(true);

        try {
            const existingData = JSON.parse(localStorage.getItem("importData") || "[]");

            if (isEditing && id) {
                // Update existing product
                const updatedData = existingData.map((item: IShoeReturnData) => {
                    if (item.re_id === id) {
                        return {
                            ...item,
                            re_sprice: values.re_sprice,
                            re_status: values.re_status,
                            re_date: values.re_date,
                            re_time: values.re_time,
                            re_remaek: values.re_remaek,
                        };
                    }
                    return item;
                });

                localStorage.setItem("importData", JSON.stringify(updatedData));
                message.success("Product updated successfully!");
            } else {
                // Create new product
                const newProduct: IShoeReturnData = {
                    re_id: uuidv4(),
                    re_sprice: values.re_sprice,
                    re_status: values.re_status,
                    re_date: values.re_date,
                    re_time: values.re_time,
                    re_remaek: values.re_remaek,
                };

                localStorage.setItem("importData", JSON.stringify([newProduct, ...existingData]));
                message.success("Product added successfully!");
            }

            navigate("/import");
        } catch (error) {
            message.error("An error occurred while saving the product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
                {isEditing ? "Edit Import Product" : "Add Import Product"}
            </h2>
            <Form layout="vertical" form={form} onFinish={handleSubmit}>
                <Form.Item
                    label="Selling Price"
                    name="re_sprice"
                    rules={[
                        { required: true, message: "Please input selling price!" },
                        { pattern: /^\d+(\.\d{1,2})?$/, message: "Please enter a valid price!" }
                    ]}
                >
                    <Input placeholder="Enter selling price" />
                </Form.Item>

                <Form.Item
                    label="Status"
                    name="re_status"
                    rules={[{ required: true, message: "Please input status!" }]}
                >
                    <Input placeholder="Enter status" />
                </Form.Item>

                <Form.Item
                    label="Date"
                    name="re_date"
                    rules={[{ required: true, message: "Please select date!" }]}
                >
                    <Input type="date" />
                </Form.Item>

                <Form.Item
                    label="Time"
                    name="re_time"
                    rules={[{ required: true, message: "Please select time!" }]}
                >
                    <Input type="time" />
                </Form.Item>

                <Form.Item label="Remark" name="re_remaek">
                    <Input.TextArea
                        rows={4}
                        placeholder="Enter remarks (optional)"
                    />
                </Form.Item>

                <div className="flex justify-between">
                    <Button onClick={() => navigate("/import")} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                    >
                        {isEditing ? "Update" : "Add"}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AddImportProduct;