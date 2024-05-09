import {
  FormField,
  Button,
  AsyncInput,
  Alert,
  PasswordField,
  LoadingSpinner,
} from "../../components";
import useAuth, { useAuthType } from "../../hooks/auth.hook";
import useAlert, { useAlertType } from "../../hooks/alert.hook";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { IRegisterField } from "../../interfaces/auth.interface";
import { registerService } from "../../services/auth.service";
import { resendVerification } from "../../services/email.service";

const Register = () => {
  const navigate = useNavigate();
  const { token } = useAuth() as useAuthType;
  const { isShow, openAlert, closeAlert } = useAlert() as useAlertType;

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [watchPassword, setWatchPassword] = useState<string>("");
  const [userMail, setUserMail] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IRegisterField>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerService,
    mutationKey: "register request",
  });

  const resendEmailMutation = useMutation({
    mutationFn: resendVerification,
    mutationKey: "resend verification request",
  });

  const submitHandler: SubmitHandler<IRegisterField> = async (formData) => {
    try {
      const { status } = await registerMutation.mutateAsync(formData);
      if (status === "success") {
        setIsSuccess(true);
        setUserMail(formData.email);
      }
    } catch (err: any) {
      const {
        response: { data },
      } = err;
      openAlert(data.message);
    } finally {
      setTimeout(() => closeAlert(), 4000);
    }
  };

  const resendEmailHandler = async () => {
    try {
      const { status } = await resendEmailMutation.mutateAsync(
        getValues("email")
      );
      if (status === "success") {
         openAlert("Success resend verification");
      }
    } catch (err:any) {
        const { response:{data} } = err;
        openAlert(data.message);
    } finally {
       setTimeout(()=>closeAlert(),4000);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  if (token) {
    return null;
  }

  return (
    <section className="w-full flex justify-center py-20 sm:py-10">
      {isSuccess ? (
        <div className="w-[450px]">
          <h3 className="text-xl sm:text-[16px] font-bold">
            Verify Email Address to Get Started
          </h3>
          {isShow && <Alert/>}
          <div className="w-full bg-white p-4 rounded-md mt-5">
            <p className="text-sm text-secondary">
              A confirmation link has been sent to your email address{" "}
              <span className="font-bold text-secondary">{userMail}</span>.
              Click the link to verify your account and unlock full access.
            </p>
          </div>

          <button
            onClick={() => resendEmailHandler()}
            disabled={resendEmailMutation.isLoading}
            className="w-full bg-primary text-white py-2 rounded-md mt-7 text-sm font-semibold"
          >
            {resendEmailMutation.isLoading ? <LoadingSpinner/> : "Resend Verification"}
          </button>
        </div>
      ) : (
        <div className="w-[450px]">
          <h3 className="text-2xl font-bold">Sign Up to Maia</h3>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="w-full mt-10 flex flex-col gap-y-3"
          >
            {isShow && <Alert />}
            <FormField
              register={register}
              error={errors.name}
              name="name"
              label="Your Name"
              placeholder="Your Name"
              type="text"
              page="register"
            />
            <AsyncInput
              register={register}
              error={errors.email}
              errorMessage="Email Address is required"
              name="email"
              label="Email Address"
              placeholder="Email"
              type="email"
            />
            <PasswordField
              register={register}
              error={errors.password}
              name="password"
              label="Create Password"
              placeholder="Password"
              type="password"
              page="register"
              setPassword={setWatchPassword}
            />
            <div className="w-full mt-3 bg-bgAlert border border-[#FBDFDF] rounded-md p-4 flex flex-col gap-y-2">
              <div className="flex items-center gap-x-3">
                {watchPassword && watchPassword.trim().length >= 8 ? (
                  <span className="block">
                    <i className="ri-checkbox-circle-fill text-green-500 text-[16px]"></i>
                  </span>
                ) : (
                  <span className="block rounded-full w-[16px] h-[16px] border-2 border-gray-400"></span>
                )}
                <p className="text-[13px] font-medium text-secondary">
                  Contains at least 8 characters
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                {watchPassword &&
                watchPassword.match(/(?=.*[a-z])/) &&
                watchPassword.match(/(?=.*[A-Z])/) ? (
                  <span className="block">
                    <i className="ri-checkbox-circle-fill text-green-500 text-[16px]"></i>
                  </span>
                ) : (
                  <span className="block rounded-full w-[16px] h-[16px] border-2 border-gray-400"></span>
                )}
                <p className="text-[13px] flex-1  font-medium text-secondary">
                  Includes both uppercase and lowercase letters
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                {watchPassword && watchPassword.match(/[0-9]/g) ? (
                  <span className="block">
                    <i className="ri-checkbox-circle-fill text-green-500 text-[16px]"></i>
                  </span>
                ) : (
                  <span className="block rounded-full w-[16px] h-[16px] border-2 border-gray-400"></span>
                )}
                <p className="text-[13px] flex-1  font-medium text-secondary">
                  Contains numbers (e.g., 1, 2, 3)
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                {watchPassword && watchPassword.match(/[#?!@$%^&*-]/g) ? (
                  <span className="block">
                    <i className="ri-checkbox-circle-fill text-green-500 text-[16px]"></i>
                  </span>
                ) : (
                  <span className="block rounded-full w-[16px] h-[16px] border-2 border-gray-400"></span>
                )}
                <p className="text-[13px] flex-1 font-medium text-secondary">
                  Includes symbols (e.g., @, #, $)
                </p>
              </div>
            </div>
            <Button
              isDisabled={registerMutation.isLoading}
              space="mt-5"
              title="Sign Up"
            />
          </form>
          <p className="text-center mt-5 text-[13px] font-medium">
            Already have account?{" "}
            <Link className="underline" to="/auth/login">
              Sign In
            </Link>
          </p>
        </div>
      )}
    </section>
  );
};

export default Register;
