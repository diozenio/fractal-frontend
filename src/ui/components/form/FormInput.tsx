import { useId } from "react";

import { Input } from "@/ui/primitives/input";

interface FormInputProps {
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  errors?: string[];
}

function FormInput({
  name,
  required = false,
  type = "text",
  errors,
  ...rest
}: FormInputProps) {
  const randomID = useId();
  const id = `${name}-${randomID}`;

  return (
    <div className="space-y-1">
      <Input id={id} name={name} required={required} type={type} {...rest} />
      {errors && errors.length > 0 && (
        <p className="text-xs text-red-500">
          {errors.map((error, index) => (
            <span key={index}>
              {error}
              {index < errors.length - 1 && ", "}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

export { FormInput };
