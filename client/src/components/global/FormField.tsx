
type FormFieldProps = {
  name: string;
  type: string;
  placeholder?: string;
  label: string;
  register: any;
  error: any;
  page: string;
};

const FormField = ({
  name,
  type,
  placeholder,
  label,
  register,
  error,
  page,
}: FormFieldProps) => {
  const FormFieldItem = () => {
    switch (type) {
      case "email":
        return (
          <input
            {...register("email", {
              required: `${placeholder} is required`,
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
            })}
            className={`text-[15px] outline-none py-2 px-2 border rounded-md ${
              error ? "border-red-500" : "border-[#CBD5E1]"
            }`}
            type={type}
            name={name}
            placeholder={placeholder}
          />
        );



      default:
        return (
          <input
            {...register(name, {
              required: `${placeholder} is required`,
            })}
            className={`text-[15px] outline-none py-2 px-2 border rounded-md ${
              error ? "border-red-500" : "border-[#CBD5E1]"
            }`}
            type={type}
            name={name}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <label className="text-[13px] font-medium">{label}</label>
      <FormFieldItem />
      {error && (
        <p className="text-[12px] text-red-500 font-semibold">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormField;
