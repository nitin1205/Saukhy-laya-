import { useMutation, useQueryClient } from "@tanstack/react-query"

import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/appContext/useAppContext";

function SignOutButton() {
    const { showToast } = useAppContext();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: apiClient.signOut,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['validateToken']})
            showToast({
                message: "Sign out Successfull!",
                type: "SUCCESS"
            })
        },
        onError: (error) => {
            showToast({
                message: error.message,
                type: "ERROR"
            })
        }
    })

    const handleClick = () => {
        mutation.mutate();
    };


  return (
    <button className="flex bg-white rounded-xl items-center text-purple-500 px-3 
            font-bold hover:bg-purple-600 hover:text-white cursor-pointer"
        onClick={handleClick}
    >
        Sign Out
    </button>
  )
}

export default SignOutButton