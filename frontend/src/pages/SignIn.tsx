import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import * as apiClient from "../api-client"; 
import { useAppContext } from "../contexts/appContext/useAppContext";

export type SignInFormData = {
    email : string;
    password: string;
}

const SignIn = () => {
    const { register, handleSubmit ,formState: { errors } } = useForm<SignInFormData>();

    const { showToast } = useAppContext();
    
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: apiClient.signIn,
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['validateToken'] })
          showToast({
            message:"Sign in Successfull!",
            type: "SUCCESS"
          })
          navigate("/");
        },
        onError: (error: Error) => {
          showToast({
            message: error.message,
            type: "ERROR"
          })
        }
    })

    const onSumbit = handleSubmit((data) => {
      mutation.mutate(data)
    });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSumbit}>
        <h2 className="text-5xl font-bold">Sign In</h2>
        <label htmlFor="email"
          className="text-gray-700 font-bold flex-1 text-2xl"
      >
        Email
        <input type="email" id="email" 
            className="border-2 rounded w-full py-1 px-2 font-normal border-gray-400"
            {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
      </label>
      
      <label htmlFor="password"
          className="text-gray-700 font-bold flex-1 text-2xl"
      >
        Password
        <input type="password" id="password" 
            className="border-2 rounded w-full py-1 px-2 font-normal border-gray-400"
            {...register("password", { 
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              } 
            })}
        />
        {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
      </label>

      <span className="flex items-center justify-between">
        <span className="text-gray-600">
          Not Registered? <Link className="underline" to="/register">Create an account</Link>
        </span>
        <button
          type="submit" 
          className="bg-purple-900 text-white p-2 font-bold hover:bg-purple-500 text-3xl"
        >
          Login
        </button>
      </span>
    </form>
  )
}

export default SignIn

