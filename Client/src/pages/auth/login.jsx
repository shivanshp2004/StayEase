import CommonForm from "@/components/common/form";
import { loginFormControls, registerFormControls } from "@/config";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth-slice/index";
import { useToast } from "@/hooks/use-toast";
const initalState={
    email :'',
    password:''
}
function AuthLogin()
{
    const[formData,setFormData]=useState(initalState);
    const dispatch=useDispatch();
    const {toast}=useToast();
    function onSubmit(event){
        event.preventDefault();
        dispatch(loginUser(formData)).then ((data)=>{
            console.log(data);
            if(data?.payload?.success) {
                toast({
                    title: data.payload.message
                })
            }
            else {
                toast({
                    title: data?.payload?.message,
                    variant: 'destructive'
                })
            }
        })
        console.log(formData);
    }

    return(
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground  ">Log In to your Account</h1>
                <p className="mt-2 ">Don't have Account?
                    <Link className="font-medium text-primary hover:underline" to='/auth/register'> Register</Link>
                </p>
            </div>
            <CommonForm
                formControls={loginFormControls}
                buttonText={'Log In'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    )
}
export default AuthLogin;