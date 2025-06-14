import { Button, Form, Input } from "antd";
import { IRegister } from "../../types/admin/auth";
import auth from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const onSubmit = async (data: IRegister) =>{
      try {
        const response: any = await auth.register(data)
        if(response) {
          navigate("/login");
        }else{
          console.log("Resgiter failed. Please check your credentials.");
        }
      } catch (error) {
        console.log('Register erorr',error)
      }
  }
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-200 px-4">
      <div className="bg-white px-6  py-10 w-full max-w-md rounded shadow-md">
        <div className="pb-10 text-center">
          <h1 className="font-bold text-2xl">Register</h1>
        </div>

        <Form
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          onFinishFailed={() => {}}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="User name"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="w-full" size="large" />
          </Form.Item>
          <Form.Item
            label="Sur name"
            name="sname"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="w-full" size="large" />
          </Form.Item>
          <Form.Item label="Date of birth" name="dateOfBirth">
            <Input className="w-full" size="large" type="date" />
          </Form.Item>
          <Form.Item
            label="User name"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="w-full" size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="w-full" size="large" />
          </Form.Item>
          <Form.Item
            label="Telephone"
            name="tel"
            rules={[
              { required: true, message: "Please input your Phone number" },
            ]}
          >
            <Input className="w-full" size="large" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your Address" }]}
          >
            <Input className="w-full" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" className="w-full" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>

        <div className="pt-4 text-center text-sm">
          <span>
            Don't have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              login
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
