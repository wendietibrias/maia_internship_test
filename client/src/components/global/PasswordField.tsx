type PasswordFieldProps = {
  name: string;
  type: string;
  placeholder?: string;
  label: string;
  register: any;
  error: any;
  page: string;
  setPassword?: any;
};

const PasswordField = ({
  name,
  type,
  placeholder,
  label,
  register,
  error,
  page,
  setPassword,
}: PasswordFieldProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <label className="text-[13px] font-medium">{label}</label>
      <input
        {...register("password", {
          required: `${placeholder} is required`,
          // validate: {
          //   minLength: (value: string) => value.trim().length === 8,
          //   containLowerAndUpper: (value: string) =>
          //     value.match(/[A-Z]/g) && value.match(/[a-z]/g),
          //   containNumber: (value: string) => value.match(/[0-9]/g),
          //   containSymbol: (value: string) => value.match(/[#?!@$%^&*-]/g),
          // },
          onChange: (e: any) => {
            if (setPassword) {
              setPassword(e.target.value);
            }
          },
        })}
        className={`text-[15px] outline-none py-2 px-2 border rounded-md ${
          error ? "border-red-500" : "border-[#CBD5E1]"
        }`}
        type={type}
        name={name}
        placeholder={placeholder}
      />
      {error && (
        <p className="text-[12px] text-red-500 font-semibold">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default PasswordField;
