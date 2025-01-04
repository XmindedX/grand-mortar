import CommonForm from "@/components/common/form";
import ShoppingHeader from "@/components/shopping-view/header";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
			<motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-blue-700'>Masuk ke akun Anda</h2>
        <p className="mt-2 text-center text-black">
          Belum punya akun?
          <Link
            className="font-medium ml-2 text-blue-500 hover:underline "
            to="/auth/register"
          >
            Buat akun
          </Link>
        </p>
			</motion.div>
      <motion.div
				className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
        <div className='bg-gray-100 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 text-black'>
        <CommonForm
        formControls={loginFormControls}
        buttonText={"Masuk"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
        </div>
      </motion.div>
		</div>

  );
}

export default AuthLogin;
