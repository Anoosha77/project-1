import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Field = {
  label: string;
  key: string;
  required?: boolean;
};

type Props = {
  fields: Field[];
  onSubmit: (data: Record<string, string>) => void;
  buttonLabel: string;
};

export default function AddEntryDialog({ fields, onSubmit, buttonLabel }: Props) {
  const [formData, setFormData] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.key, ""]))
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.key]) {
        newErrors[field.key] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
      setFormData(Object.fromEntries(fields.map((f) => [f.key, ""])));
      setErrors({});
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">{buttonLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{buttonLabel}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              {field.key === "category" ? (
                <select
                  value={formData[field.key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.key]: e.target.value })
                  }
                  className={`w-full border rounded-md px-3 py-2 text-sm text-gray-700 ${
                    errors[field.key] ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Food">Food</option>
                  <option value="Books">Books</option>
                  <option value="Travel">Travel</option>
                  <option value="Bills">Bills</option>
                  <option value="Other">Other</option>
                </select>
              ) : field.key === "amount" ? (
                <input
                  type="number"
                  placeholder={field.label}
                  value={formData[field.key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.key]: e.target.value })
                  }
                  className={`w-full border rounded-md px-3 py-2 text-sm text-gray-700 ${
                    errors[field.key] ? "border-red-500" : ""
                  }`}
                />
              ) : (
                <Input
                  placeholder={field.label}
                  value={formData[field.key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.key]: e.target.value })
                  }
                  className={`${
                    errors[field.key] ? "border-red-500" : ""
                  } cursor-pointer`}
                />
              )}
              {errors[field.key] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.key]}</p>
              )}
            </div>
          ))}
          <Button onClick={handleSubmit} className="cursor-pointer">
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
