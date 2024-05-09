import { 
  Alert,
  Button,
  FormField,
  PasswordField 
} from "../../components";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { ILoginField } from "../../interfaces/auth.interface";
import { useMutation } from "react-query";
import { loginService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import useAuth, { useAuthType } from "../../hooks/auth.hook";
import useAlert, { useAlertType } from "../../hooks/alert.hook";

const Login = () => {
  const navigate = useNavigate();
  const { login, token } = useAuth() as useAuthType;
  const { isShow, openAlert, closeAlert } = useAlert() as useAlertType;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginField>();

  const loginMutation = useMutation({
    mutationFn: loginService,
    mutationKey: "login request",
  });

  const submitHandler: SubmitHandler<ILoginField> = async (formData) => {
    try {
      const { status, data } = await loginMutation.mutateAsync(formData);
      if (status === "success") {
        login(data.access_token);
      }
    } catch (err: any) {
      const {
        response: { data },
      } = err;
      openAlert(data.message);
    } finally {
      setTimeout(() => {
        closeAlert();
      }, 4500);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  if (token) {
    return null;
  }

  return (
    <section className="w-full flex justify-center py-20 sm:py-10">
      <div className="w-[450px]">
        <h3 className="text-2xl sm:text-[16px] font-bold">Welcome Back!</h3>
        <p className="text-sm font-medium mt-3 mb-10">
          Sign in below to access your workspace and continue your projects.
          Let's pick up where you left off!
        </p>
        {isShow && <Alert />}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className={`w-full flex flex-col gap-y-3 ${isShow ? "mt-5" : "mt-0"}`}
        >
          <FormField
            register={register}
            error={errors.email}
            name="email"
            label="Email Address"
            placeholder="Email"
            type="email"
            page="login"
          />
          <PasswordField
            register={register}
            error={errors.password}
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            page="login"
          />
          <Button
            isDisabled={loginMutation.isLoading}
            space="mt-5"
            title="Sign In"
          />
        </form>
        <p className="text-center mt-5 text-[13px] font-medium">
          Don't have account?{" "}
          <Link className="underline" to="/auth/register">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
