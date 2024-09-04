import { TriangleAlert } from "lucide-react";
import { useFormContext } from "react-hook-form";

type ErrorMessageProps = {
  fieldName: string;
};

export const ErrorMessage = ({ fieldName }: ErrorMessageProps) => {
  const method = useFormContext();

  if (!method) return null;
  const { formState } = method;

  const error = formState.errors[fieldName];

  if (error?.message) {
    return (
      <div className="text-red-900 flex space-x-1 text-center text-sm mt-1">
        <span className="flex items-center">
          <TriangleAlert className="text-red-900 h-4 w-4" />
        </span>
        <span>{error?.message as string}</span>
      </div>
    );
  }

  if (error && !error?.message) {
    {
      return Object.keys(error).map((rule, idx) => {
        const ruleObj = error[rule as keyof typeof error] as {
          message: string;
        };

        return (
          <div
            key={idx}
            className="text-red-900 flex space-x-1 text-center text-sm mt-1"
          >
            <span className="flex items-center">
              <TriangleAlert className="text-red-900 h-4 w-4" />
            </span>
            <span>{ruleObj?.message ?? ""}</span>
          </div>
        );
      });
    }
  }
};
