import axios from "axios";

const API =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5000";

export async function importCsv(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${API}/api/import`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}