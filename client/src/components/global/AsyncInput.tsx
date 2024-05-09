import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { findExistingAccount } from "../../services/auth.service";
import debounce from "lodash.debounce";

type AsyncInputProps = {
  name: string;
  type: string;
  placeholder?: string;
  label: string;
  register: any;
  errorMessage: string;
  error: any;
};

const AsyncInput = ({
  name,
  type,
  placeholder,
  label,
  register,
  errorMessage,
  error,
}: AsyncInputProps) => {
  const [alertMessage, setAlertMessage] = useState<{
    isOpen: boolean;
    message: string;
  }>({ isOpen: false, message: "" });

  const findAccountExistingMutation = useMutation({
    mutationFn: findExistingAccount,
    mutationKey: "find-existing-account",
  });

  const handleDebounceFn = async (email: string) => {
    if (!email || email === "") {
      return null;
    }

    try {
      const userData = await findAccountExistingMutation.mutateAsync(email);
      if (userData) {
        setAlertMessage({
          isOpen: true,
          message:
            "Oops! It seems this email is already in use. Please try another email address or sign in with your existing account",
        });
      } else {
        setAlertMessage({
          isOpen: true,
          message: "Email is available",
        });
      }
    } catch (err: any) {
      const {
        response: { data },
      } = err;
      if (data) {
        setAlertMessage({
          isOpen: true,
          message: data.message,
        });
      }
    }
  };

  const debounceFn = useMemo(() => debounce(handleDebounceFn, 1000), []);

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceFn(e.target.value);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <label className="text-[13px] font-medium">{label}</label>
      <input
        {...register(name, {
          required: errorMessage,
        })}
        className={`text-[15px] outline-none py-2 px-2 border rounded-md ${
          error ? "border-red-500" : "border-[#CBD5E1]"
        }`}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={changeHandler}
      />
      {error && (
        <p className="text-[12px] text-red-500 font-semibold">
          {error.message}
        </p>
      )}
      {alertMessage.isOpen && (
        <div className="w-full mt-3 bg-bgAlert border border-[#FBDFDF] mb-5 py-2 px-3 rounded-md">
          <h5 className="text-[13px] text-secondary font-medium">
            {alertMessage.message}
          </h5>
        </div>
      )}
    </div>
  );
};

export default AsyncInput;
