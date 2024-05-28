import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import Input from "../Utils/Input";
import Button from "../Utils/Button";
import { authUrl } from "./../../features/api/serverUrl";
import { useDispatch, useSelector } from "react-redux";
import { setAutoLogin, setLogin } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import { setAuthHeader } from "../../features/auth/authentification";
import { PiArrowsClockwiseBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthHeader();
      dispatch(
        setAutoLogin({
          token: localStorage.getItem("token"),
        })
      );
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const loginData = {
      username: data.username,
      password: data.password,
    };

    axios
      .post(`${authUrl}/login`, loginData)
      .then((res) => {
        const data = res.data;
        localStorage.setItem("token", data.token);
        setAuthHeader();
        dispatch(setLogin(data));
        reset();
        toast.success("Success Login!");
      })
      .catch(() => {
        toast.error("Wrong username or password!");
        reset();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className='w-full h-full flex flex-col items-center mt-20 md:px-0 px-4'>
        <div className='text-4xl font-bold text-blue-600 italic text-center'>
          Personal Trainer <span className='text-rose-500 text-xl'>AGENDA</span>
        </div>
        <div className='text-sm font-bold text-zinc-600 mb-10 italic'>
          manager tool for personal trainers
        </div>
        <div className='flex flex-col gap-4 md:w-96 w-full md:h-3/5 w-full border border-neutral-300 rounded-md shadow p-6 bg-white '>
          <div className='w-full text-xl text-center mb-8'>Login</div>
          <Input
            id='username'
            label='Username'
            register={register}
            errors={errors}
            required
          />
          <Input
            id='password'
            label='Password'
            type='password'
            register={register}
            errors={errors}
            required
          />
          <div className='mt-6'>
            <Button label='Login' small onClick={handleSubmit(onSubmit)} />
            <Button
              outline
              extraClass='mt-6 hover:bg-black hover:text-white focus:bg-white focus:border-rose-500'
              label='Back to Homepage'
              small
              onClick={() => navigate("/")}
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div className='flex gap-10 justify-center items-center w-full h-full bg-black opacity-50 absolute top-0 left-0'>
          <PiArrowsClockwiseBold
            className='animate-spin text-blue-500'
            size={40}
          />
        </div>
      ) : null}
    </>
  );
};

export default Login;
