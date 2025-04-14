import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
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
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ArchitectureMangForm = ({ data = {}, id, children }) => {
  const [open, setOpen] = React.useState(false);
  const [uploadImage, setUploadImage] = useState(false);
  const [formValues, setFormValues] = useState({
    ProjectName: data.ProjectName || "",
    Description: data.Description || "",
    images: data.images || [],
    Location: data.Location || "",
    Area: data.Area || "",
    DateofCompletion: data.DateofCompletion || "",
    Status: data.Status || "",
    TypeOfBuilding: data.TypeOfBuilding || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadToCloudnary(file);
    setFormValues((prev) => ({ ...prev, images: [...prev.images, image] }));
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formValues.images];
    updatedImages.splice(index, 1);
    setFormValues({ ...formValues, images: updatedImages });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormValues({
      ProjectName: "",
      Description: "",
      images: [],
      Location: "",
      Area: "",
      DateofCompletion: "",
      Status: "",
      TypeOfBuilding: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const docRef = doc(db, "ArchitectureProject", id);
        await updateDoc(docRef, formValues);
        alert("Project updated successfully!");
      } else {
        await addDoc(collection(db, "ArchitectureProject"), formValues);
        alert("Project added successfully!");
      }
      handleClose();
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Error adding project.");
    }
  };

  React.useEffect(() => {
    if (open) {
      setFormValues({
        ProjectName: data?.ProjectName || "",
        Description: data?.Description || "",
        images: data?.images || [],
        Location: data?.Location || "",
        Area: data?.Area || "",
        DateofCompletion: data?.DateofCompletion || "",
        Status: data?.Status || "",
        TypeOfBuilding: data?.TypeOfBuilding || "",
      });
    }
  }, [open, data]);

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {children}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, textAlign: "center" }}
          id="customized-dialog-title"
        >
          Architecture Manegment Form
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <Grid2 container spacing={2}>
              {/* file */}
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
                  {uploadImage && (
                    <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                      <CircularProgress />
                    </div>
                  )}
                </label>

                <div className="flex flex-wrap gap-2">
                  {formValues.images.map((image, index) => (
                    <div className="relative" key={index}>
                      <img
                        src={image}
                        alt={`productImage ${index + 1}`}
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

              {/* title */}
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  id="ProjectName"
                  name="ProjectName"
                  label="Project Name"
                  value={formValues.ProjectName}
                  onChange={handleInputChange}
                />
              </Grid2>

              {/* description */}
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  id="Description"
                  name="Description"
                  label="Description"
                  value={formValues.Description}
                  onChange={handleInputChange}
                />
              </Grid2>

              {/* location */}
              <Grid2 size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  id="Location"
                  name="Location"
                  label="Project Location"
                  value={formValues.Location}
                  onChange={handleInputChange}
                />
              </Grid2>

              {/* Area */}
              <Grid2 size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  id="Area"
                  name="Area"
                  label="Area of land"
                  value={formValues.Area}
                  onChange={handleInputChange}
                />
              </Grid2>

              {/* DateofCompletion */}
              <Grid2 size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  id="DateofCompletion"
                  name="DateofCompletion"
                  label="Date of Completion"
                  value={formValues.DateofCompletion}
                  onChange={handleInputChange}
                />
              </Grid2>

              {/* Status */}
              <Grid2 size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  id="Status"
                  name="Status"
                  label="Project Status"
                  value={formValues.Status}
                  onChange={handleInputChange}
                />
              </Grid2>

              {/* Type Of Building */}
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  id="TypeOfBuilding"
                  name="TypeOfBuilding"
                  label="Type Of Building"
                  value={formValues.TypeOfBuilding}
                  onChange={handleInputChange}
                />
              </Grid2>

              <Grid2 size={{ xs: 12 }}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  color="primary"
                  sx={{ p: "14px" }}
                >
                  {false ? (
                    <CircularProgress size={"small"} />
                  ) : (
                    <p>{id ? "Update Project" : "Add Project"}</p>
                  )}
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default ArchitectureMangForm;
