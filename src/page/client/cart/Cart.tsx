import React, { useCallback, useEffect, useState } from "react";
import { IProductItem } from "../../../types/admin/product/product";
import {
  Button,
  Card,
  Form,
  GetProp,
  Input,
  Modal,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import order from "../../../api/order";
import { Image } from "antd";
import auth from "../../../api/auth";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<IProductItem[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [customerId, setCustomerId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState<number>();
  const [orderDetail, setOrderDetail] = useState<any>("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getCustomer = async () => {
      const token = localStorage.getItem("E_SHOSE_TOKEN");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const getCustomer = await auth.getMe();
        if (!getCustomer) {
          navigate("/login");
          return;
        }
        setCustomerId(getCustomer?.data?.customerId);
      } catch (error) {
        navigate("/login");
      }
    };

    getCustomer();
  }, []);

  const handleChange = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    console.log(newFileList);
    setFileList(newFileList);
  };

  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
  const getBase64 = (file: FileType): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }

    const storedOrderId = localStorage.getItem("lastOrderId");
    if (storedOrderId) {
      const parsedOrderId = parseInt(storedOrderId);
      setOrderId(parsedOrderId);
      getOrderDetail(parsedOrderId);
    }
  }, []);

  const removeFromCart = (productId: string, index?: number) => {
    if (productId) {
      const updatedCart = cartItems.filter(
        (item) => String(item.pro_id) !== productId
      );
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else if (index !== undefined) {
      const updatedCart = [...cartItems];
      updatedCart.splice(index, 1);
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const increaseQty = useCallback((productId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  }, []);

  const decreaseQty = useCallback((productId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] > 1 ? prev[productId] - 1 : 1,
    }));
  }, []);

  const onUploadImage = async (data: any, orderId: string) => {
    try {
      const file = data.receipt;

      if (file instanceof File || file instanceof Blob) {
        const formData = new FormData();
        formData.append("receipt", file);
        formData.append("orderId", orderId);

        const upload = await order.uploadSlip(formData, orderId);

        if (upload.status === 200) {
          console.log("Receipt uploaded successfully");
        }
        return upload;
      }
    } catch (error) { }
  };

  const onCreateOrder = async (data: any) => {
    try {
      const orderItems = cartItems.map((item) => ({
        productId: item.pro_id,
        quantity: quantities[item.pro_id] || 1,
        price: item.pro_price,
      }));

      const totalPrice = orderItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const orderData: any = {
        customerId: customerId,
        items: orderItems,
        totalPrice,
        shippingAddress: data.shippingAddress,
        shippingNote: data.shippingNote,
      };

      const addOrder = await order.createOrder(orderData);
      console.log("addorder", addOrder)
      const newOrderId = orderId;
      console.log("newOrderId", newOrderId)
      setOrderId(newOrderId);
      localStorage.setItem("lastOrderId", newOrderId!.toString());
      showModal();

      const uploadReceipt = await onUploadImage(
        { receipt: fileList[0]?.originFileObj },
        (newOrderId ?? "").toString()
      );

      console.log("upload", uploadReceipt)

      getOrderDetail(newOrderId!);
      localStorage.removeItem("cart");
      setCartItems([]);
      setQuantities({});
      setFileList([]);
      form.resetFields();
      return [addOrder, uploadReceipt];

    } catch (error) {
      console.error("Error during order creation and upload:", error);
    }
  };

  const getOrderDetail = async (id: number) => {
    if (!id) return;

    try {
      const response = await order.getOrderDetail(id);
      if (response.data) {
        setOrderDetail(response.data);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const viewLastOrder = () => {
    const storedOrderId = localStorage.getItem("lastOrderId");
    if (storedOrderId) {
      const parsedOrderId = parseInt(storedOrderId);
      setOrderId(parsedOrderId);
      getOrderDetail(parsedOrderId);
      showModal();
    }
  };

  const BASE_URL = "http://localhost:3003";
  return (
    <div className="p-8 flex gap-4">
      <div className="w-3/5">
        <div className="flex justify-between ">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            🛒 Your Cart
          </h1>
          <>
            <div>
              <Button
                type="primary"
                onClick={showModal}
                disabled={!orderDetail}
              >
                Order Details
              </Button>
            </div>
            <Modal
              title="Order Status"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>payment status : {orderDetail.payment_status}</p>

              {orderDetail.payment_status !== "verified" && (
                <p>shipping status : {orderDetail.shipping_status}</p>
              )}
            </Modal>
          </>
        </div>
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <ul className="space-y-6">
            {cartItems.map((item, index) => (
              <li
                key={item.pro_id}
                className="bg-white shadow-md rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 border border-gray-200"
              >
                <img
                  crossOrigin="anonymous"
                  src={`${BASE_URL}${item.pro_image}`}
                  alt={item.pro_name}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <div className="flex-1 space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.pro_name}
                  </h2>
                  <p className="text-gray-500">{item.pro_detail}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-gray-600 font-medium">Quantity:</span>
                    <Button
                      onClick={() => decreaseQty(item.pro_id.toString())}
                      icon={<MinusOutlined />}
                      size="small"
                    // disabled={quantities[item.pro_id.toString()] === 1}
                    />
                    <span className="px-2 text-lg">
                      {quantities[item.pro_id] || 1}
                    </span>
                    <Button
                      onClick={() => increaseQty(item.pro_id.toString())}
                      icon={<PlusOutlined />}
                      size="small"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between h-full ml-auto gap-4">
                  <p className="text-lg font-bold text-green-600">
                    {new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "LAK",
                    }).format(item.pro_price ?? 0)}
                  </p>
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() =>
                      item.pro_id
                        ? removeFromCart(item.pro_id.toString())
                        : removeFromCart("", index)
                    }
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-2/5">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          🛒 Payment Detail
        </h1>
        <div>
          <Card>
            <img
              src="src/assets/qr.jpg"
              alt="shoes"
              className="w-140 h-140 object-cover"
            />
            <div className="py-4">
              <Upload
                name="receipt"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={() => false} // Prevent auto upload
              >
                {fileList.length >= 1 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </div>
            <Form
              form={form}
              layout="vertical"
              onFinish={onCreateOrder} // when user clicks "Create Order", form values go into `data`
            >
              <Form.Item
                label="Shipping Address"
                name="shippingAddress"
                rules={[
                  {
                    required: true,
                    message: "Please input your shipping address!",
                  },
                ]}
              >
                <Input className="w-full" size="large" />
              </Form.Item>

              <Form.Item
                label="Shipping Note"
                name="shippingNote"
                rules={[
                  {
                    required: true,
                    message: "Please input your shipping note!",
                  },
                ]}
              >
                <Input className="w-full" size="large" />
              </Form.Item>
              <h1 className="text-2xl font-bold">
                Total :{" "}
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "LAK",
                }).format(
                  cartItems.reduce((total, item) => {
                    return (
                      total +
                      (item.pro_price ?? 0) * (quantities[item.pro_id] || 1)
                    );
                  }, 0)
                )}
              </h1>

              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="w-full py-8"
                >
                  Create Order
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
