export const generateFormData = (payload: Record<string, string>) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(payload)) {
    formData.append(`${key}`, value);
  }
  return formData;
};
