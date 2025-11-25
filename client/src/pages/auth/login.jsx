import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import { toast } from "sonner";


function AuthLogin(){

    const initialState ={       
        email :'',
        password: ''
    }

    const [formData,setFormData] =useState(initialState)
    const dispatch  = useDispatch();
    //const {toast} =useToast()

    function onSubmit(event){
        event.preventDefault()
        dispatch(loginUser(formData)).then(data =>{
            if(data?.payload?.success){
                // toast({
                //     title: data?.payload?.message
                // })  
                toast.success(data?.payload?.message || "Login successful! 🎉");        
                 //console.log(data);      
            }else{
                 toast.error(data?.payload?.message || "Login failed! ❌");
            }
            //console.log(data);
        })
    }

    return<div className="mx-auto w-full max-w-md spacy-y-6">
        <div className="text-center mb-5">
            <h1 className="text-3xl font-bold tracking-tight text-foreground"> Sign in to your account </h1>
            <p>Don't have an account
            <Link className="font-medium ml-2 text-primary text-blue-500 hover:underline" to='/auth/register'>Register</Link>
            </p>
        </div>
        <CommonForm 
            formcontrols={loginFormControls}
            buttonText={'Sign Up'}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
        />
    </div>
}
export default AuthLogin;