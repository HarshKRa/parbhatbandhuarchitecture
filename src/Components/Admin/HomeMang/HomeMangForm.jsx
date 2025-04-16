import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import { AddPhotoAlternate, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid2,
  IconButton,
  TextField,
} from "@mui/material";
import { uploadToCloudnary } from "../../../utils/UpoadToCloud";
import { db } from "../../../utils/firebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const HomeMangForm = ({ data = {}, id, children, flag }) => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    projectName: data.projectName || "",
    description: data.description || "",
    images: data.images || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const image = await uploadToCloudnary(file);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, image],
    }));
    setUploading(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        console.log("Hellooo", formData);
        const docRef = doc(db, "HomeImage", id);
        await updateDoc(docRef, formData);
        alert("Project updated successfully!");
      } else {
        await addDoc(collection(db, "HomeImage"), formData);
        alert("Project added successfully!");
      }
      handleClose();
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Error adding project.");
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      projectName: "",
      description: "",
      images: [],
    });
  };

  React.useEffect(() => {
    if (open) {
      setFormData({
        projectName: data?.projectName || "",
        description: data?.description || "",
        images: data?.images || [],
      });
    }
  }, [open, data]);

  return (
    <>
      <span
        className={`${
          flag === true
            ? "border px-6 py-2 rounded-2xl hover:bg-[var(--secondaryColour)]"
            : ""
        } cursor-pointer`}
        onClick={handleClickOpen}
      >
        {children}
      </span>
      <BootstrapDialog
        onClose={handleClose}
        open={open}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }}>
          Architecture Project Form
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <Grid2 container spacing={2}>
              {/* File Upload */}
              <Grid2 className="flex flex-wrap gap-5" size={{ xs: 12 }}>
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <label className="relative" htmlFor="fileInput">
                  <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                    <AddPhotoAlternate className="text-gray-700" />
                  </span>
                  {uploading && (
                    <div className="absolute w-24 h-24 flex justify-center items-center top-0 left-0">
                      <CircularProgress />
                    </div>
                  )}
                </label>

                <div className="flex flex-wrap gap-2">
                  {formData?.images?.map((image, index) => (
                    <div className="relative" key={index}>
                      <img
                        src={image}
                        alt={`uploaded-${index}`}
                        className="w-24 h-24 object-cover"
                      />
                      <IconButton
                        onClick={() => handleRemoveImage(index)}
                        size="small"
                        color="error"
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          outline: "none",
                        }}
                      >
                        <Close sx={{ fontSize: "1rem" }} />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </Grid2>

              {/* Project Name */}
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Project Name"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                />
              </Grid2>

              {/* Description */}
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid2>

              {/* Submit */}
              <Grid2 size={{ xs: 12 }}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  color="primary"
                  sx={{ p: "14px" }}
                >
                  {id ? "Update Project" : "Add Project"}
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default HomeMangForm;
