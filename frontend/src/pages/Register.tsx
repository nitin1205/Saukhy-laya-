import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/appContext/useAppContext";


export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string
};


const Register = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const { register, watch, handleSubmit, formState: { errors }} = useForm<RegisterFormData>();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: apiClient.register,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['validateToken'] })
      showToast({
        message:"Registration Successful!",
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

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    
  }) 


  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>

      <div className="flex flex-col md:flex-row gap-5">
        <label htmlFor="firstName"
          className="text-gray-700 font-bold flex-1"
        >
          First Name
          <input type="text" id="firstName" 
            className="border-2 rounded w-full py-1 px-2 font-normal border-gray-400"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>

        <label htmlFor="lastName"
          className="text-gray-700 font-bold flex-1"
        >
          Last Name
          <input type="text" id="lastName" 
            className="border-2 rounded w-full py-1 px-2 font-normal border-gray-400"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>

      <label htmlFor="email"
          className="text-gray-700 font-bold flex-1"
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
          className="text-gray-700 font-bold flex-1"
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
      
      <label htmlFor="passwordConfirmation"
          className="text-gray-700 font-bold flex-1"
      >
        Confirm Password
        <input type="password" id="passwordConfirmation" 
            className="border-2 rounded w-full py-1 px-2 font-normal border-gray-400"
            {...register("passwordConfirmation", { 
              validate: (val) => {
                if(!val) {
                  return "This field is required";
                } else if(watch("password") !== val) {
                  return "Your passwords do not match";
                }
              } 
            })}
        />
        {errors.passwordConfirmation && (
            <span className="text-red-500">{errors.passwordConfirmation.message}</span>
          )}
      </label>

      <span className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Already Registered? <Link className="underline" to="/sign-in">Sign In</Link>
        </span>
        <button
          type="submit" 
          className="bg-purple-900 text-white p-2 font-bold hover:bg-purple-500 text-xl"
        >
          Create Account
        </button>
      </span>
    </form>
  )
}

export default Register