import { Button, Form, Input } from "antd";
import category from "../../../../api/category";
import { ICategory } from "../../../../types/admin/product/product";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CreateCategory: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;
  const [isEdit, setIsEdit] = useState(false);
  const handleOnCreate = async (data: ICategory) => {
    try {
      if (isEdit && id) {
        const res = category.updateCategory(id, data);
        navigate(-1);
        return res;
      } else {
        const res = category.createCategory(data);
        navigate(-1);
        return res;
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const fetchSupplier = async () => {
        try {
          const res = await category.getCategoryById(id);
          form.setFieldsValue({
            cate_name: res.data.cate_name,
            cate_remark: res.data.cate_remark,
          });
        } catch (error) {
          console.error("Error fetching supplier data", error);
        }
      };
      fetchSupplier();
    }
  }, [id, form]);

  return (
    <div className=" bg-white">
      <div className="p-6">
        <h1>{isEdit ? "Edit Category" : "Category"}</h1>
        <Form
          form={form}
          onFinish={handleOnCreate}
          onFinishFailed={() => {}}
          autoComplete="off"
          layout="vertical"
        >
          <div className="py-2">
            <Form.Item label="Name" name="cate_name">
              <Input className="w-full" size="large" />
            </Form.Item>
          </div>
          <div className="py-2">
            <Form.Item label="Detail" name="cate_remark">
              <Input className="w-full" size="large" />
            </Form.Item>
          </div>

          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateCategory;
