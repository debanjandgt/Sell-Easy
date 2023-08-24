import React, { useEffect, useState } from "react";
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
  
  const handleLogin = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await LoginUser(values);
      dispatch(SetLoader(false));
      
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/"); // Navigate after successful login
      } else {
        throw new Error("amar problem1");
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error("amar problem12");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          throw new Error("Token expired");
        }
      } catch (error) {
        console.error("Token error:", error);
        localStorage.removeItem("token");
        navigate("/login"); // Navigate to login on token error
      }
    }
  }, [navigate]);

  return (
    <div className="h-screen bg-cyan-400 flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[450px]">
        <h1 className="text-primary text-2xl">
          SELL EASY - <span className="text-gray-400 text-2xl">LOGIN</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input
              placeholder="Email"
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            className="mt-2 bg-sky-500 hover:bg-blue-700 "
          >
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
