import { Controller, useFormContext } from "react-hook-form";

const FormInput = ({ name, label, type = "text", as = "input", options = [], placeholder }) => {
  const { register, control, formState: { errors } } = useFormContext();

  // ✅ Handle Textarea fields
  if (as === "textarea") {
    const isArrayField = name === "responsibilities" || name === "requirements";


    return (
      <div className="mb-2">
        <div className="mb-2">
        <label className="font-bold">
          {label} <span className="ml-1 text-red-600">*</span>
        </label>
        </div>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <textarea
              value={
                isArrayField
                  ? Array.isArray(value)
                    ? value.join("\n")
                    : ""
                  : value || ""
              }
              onChange={(e) =>
                isArrayField
                  ? onChange(e.target.value.split("\n"))
                  : onChange(e.target.value)
              }
              rows={4}
              placeholder={placeholder}
              className={`w-full px-4 py-2.5 border-3 rounded-lg 
    focus:ring-1 focus:ring-[#244034] focus:border-[#244034] 
    ${errors[name] ? "border-red-500" : "border-gray-300"}`}
            />
          )}
        />
        <div className="">
        {errors[name] && (
          <p className="text-red-600 text-sm mt-2 font-bold text-md">{errors[name].message}</p>
        )}
        </div>
      </div>
    );
  }

  // ✅ Handle Select Fields
  if (as === "select") {
    return (
      <div className="mb-2">
        <label className="font-bold">
          {label} <span className="ml-1 text-red-600">*</span>
        </label>
        <select
          {...register(name)}
          className={`border-2 border-gray-400 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13] ${errors? "border-red-500":"border-gray-300"}`}
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="">
        {errors[name] && (
          <p className="text-red-600 text-sm mt-3 font-bold text-md">{errors[name].message}</p>
        )}
        </div>
      </div>
    );
  }

  // ✅ Handle normal input
  return (
    <div className="mb-2">
      <label className="font-bold">
        {label} <span className="ml-1 text-red-600">*</span>
      </label>
      <input
        {...register(name,type==="number"?{valueAsNumber:true}:{})}
        type={type}
        placeholder={placeholder}
        className={`border-2 border-gray-400 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13] ${errors? "border-red-500":"border-gray-300"}`}
      />
      <div className="">
      {errors[name] && (
        <p className="text-red-600 text-sm mt-3 font-bold text-md">{errors[name].message}</p>
      )}
      </div>
    </div>
  );
};

export default FormInput;
