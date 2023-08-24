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

const login = async () => {
        try {
            dispatch(ShowLoader());
            const response = await LoginUser(user);
            dispatch(HideLoader());
            if (response.success) {
                toast.success(response.message);
                localStorage.setItem('token', response.data);
                window.location.href = '/';
            }
            else {
           
                  localStorage.removeItem("token");
              window.location.href = '/login';
            }
        }
        catch (error) {
            {
                
                 localStorage.removeItem("token");
              window.location.href = '/login';
              console.log("1");
            }
        }
    }
  


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
