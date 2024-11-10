import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth-slice/index";
import { useToast } from "@/hooks/use-toast";
const initialState={
    userName:'',
    email :'',
    password:''
}
function AuthRegister()
{
    const {toast}=useToast();   
    const[formData,setFormData]=useState(initialState);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    function onSubmit(event){
        event.preventDefault();
        console.log(formData);
        dispatch(registerUser(formData)).then((data)=> {
            console.log(data);
            if(data?.payload?.success) {
                navigate('/auth/login');
                toast({
                    title: data?.payload?.message
                })
            }
            else {
                toast({
                    title: data?.payload?.message,
                    variant: 'destructive'
                })
            }
        });
    }

    return(
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground  ">Create New Account</h1>
                <p className="mt-2 ">Already have an account?
                    <Link className="font-medium text-primary hover:underline" to='/auth/login'> Login</Link>
                </p>
            </div>
            <CommonForm
                formControls={registerFormControls}
                buttonText={'Sign Up'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    )
}
export default AuthRegister;