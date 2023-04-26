import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import jwtDecode from "jwt-decode";

const rules = [
  {
    required: true,
    message: "required",
  },
];
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await LoginUser(values);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        const token = response.data;
        const existingToken = localStorage.getItem("token");
        if (existingToken) {
          const decodedToken = existingToken ? jwtDecode(existingToken) : null;

          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            localStorage.removeItem("token");
          }
        }
        localStorage.setItem("token", token);
        window.location.href = "/";
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  

  useEffect(() => {
    if (localStorage.getItem("token")) 
    {

      navigate("/");
    }
  }, []);
  return (
    <div className="h-screen bg-cyan-400 flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[450px]">
        <h1 className="text-primary text-2xl">
          SELL EASY - <span className="text-gray-400 text-2xl">LOGIN</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="mt-2 bg-sky-500 hover:bg-blue-700 ">
            Login
          </Button>

          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary">
                Register
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
