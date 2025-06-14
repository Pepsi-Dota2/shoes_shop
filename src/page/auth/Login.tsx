import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ILogin } from "../../types/admin/auth";
import auth from "../../api/auth";
import { TOKEN_KEY } from "../../lib/interceptor";
const LoginPage = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const onSubmit = async (data: ILogin) => {
    try {
      const response: any = await auth.login(data);

      if (response && response.success) {
        localStorage.setItem(TOKEN_KEY, response.token);
        localStorage.setItem("USER_ROLE", response.user.role);

        const userRole = response.user.role;

        if (userRole === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        console.log("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-200 px-4">
      <div className="bg-white px-6  py-10 w-full max-w-md rounded shadow-md">
        <div className="pb-10 text-center">
          <h1 className="font-bold text-2xl">Login</h1>
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

          <Form.Item>
            <Button type="primary" className="w-full" htmlType="submit">
              {t("login")}
            </Button>
          </Form.Item>
        </Form>

        <div className="pt-4 text-center text-sm">
          <span>
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
