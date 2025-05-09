export const uploadToCloudnary = async (pics) => {
  const cloud_name = import.meta.env.VITE_CLOUDNARY_NAME;
  const upload_preset = import.meta.env.VITE_CLOUDNARY_UPLOAD_PRESET;

  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const fileData = await res.json();

    console.log("fileData : ", fileData);

    return fileData.url;
  } else {
    console.log("error : pics not found");
  }
};
