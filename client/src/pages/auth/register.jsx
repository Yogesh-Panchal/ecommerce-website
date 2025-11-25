// import CommonForm from "@/components/common/form";
// import { registerFormControls } from "@/config";
// import { registerUser } from "@/store/auth-slice";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// //import Toast from "@/components/common/Toast";
// import { toast } from "sonner";

// function AuthRegister() {

//     const initialState = {
//         userName: '',
//         email: '',
//         password: ''
//     }

//     const [formData, setFormData] = useState(initialState)
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     //const [toast, setToast] = useState(null); // 👈 local toast state
//     const { toast } = setToast();
   

//     function onSubmit(event) {
//         event.preventDefault();
//         dispatch(registerUser(formData)).then((data) => {
//             if (data?.payload?.success) {
//                 setToast({
//                     title: data?.payload?.message,
//                 });
//                 navigate('/auth/login')
//                 console.log(data);                
//             } else {
//                 setToast({
//                     title: data?.payload?.message,
//                 });
//                 console.log(data); 
//             }
//         });
//         dispatch(registerUser(formData)).then((data) => {
//             if (data?.payload?.success) {
//                 setToast(data?.payload?.message);
//                 navigate('/auth/login');
//             } else {
//                setToast(data?.payload?.message);
//             }
//         });
//     }

//     return (
//     <div className="mx-auto w-full max-w-md space-y-6 relative">
//       {/* ✅ show toast when available */}
//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <div className="text-center mb-5">
//         <h1 className="text-3xl font-bold tracking-tight text-foreground">
//           Create new account
//         </h1>
//         <p>
//           Already have an account?
//           <Link
//             className="font-medium ml-2 text-primary text-blue-500 hover:underline"
//             to="/auth/login"
//           >
//             Login
//           </Link>
//         </p>
//       </div>

//       <CommonForm
//         formcontrols={registerFormControls}
//         buttonText={"Sign Up"}
//         formData={formData}
//         setFormData={setFormData}
//         onSubmit={onSubmit}
//       />
//     </div>
//   );
// }

//  export default AuthRegister;

import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"; // ✅ correct import

function AuthRegister() {
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();

    const data = await dispatch(registerUser(formData));

    if (data?.payload?.success) {
      toast.success(data?.payload?.message || "Registration successful!");
      navigate("/auth/login");
      console.log(data);
    } else {
      toast.error(data?.payload?.message || "Registration failed!");
      console.log(data);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 relative">
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p>
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary text-blue-500 hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>

      <CommonForm
        formcontrols={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;

