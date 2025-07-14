export const uploadToCloudinary = async (file) => {
  const cloudName = "dzlf5iu8j";
  const uploadPreset = "nhan7203"; // Đảm bảo preset này là unsigned

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.error.message || "Upload failed");

  return data.secure_url;
};
