import { useEffect } from 'react'

type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR"
    onClose: () => void
}

const Toast = ({ message, type, onClose }: ToastProps) => {

    const styles = `fixed top-4 right-4 z-50 p-4 rounded-md text-white
        max-w-md ${ type === "SUCCESS" ? "bg-green-600" : "bg-red-600"}`;
    useEffect(()=> {
        const timer = setTimeout(() => {
            onClose()
        }, 5000)

        return () => {
            clearTimeout(timer);
        }
    }, [onClose])

  return (
    <div className={styles}>
        <div className='flex justify-center items-center'>
            <span className='text-lg font-semibold'>{message}</span>
        </div>
    </div>
  )
}

export default Toast