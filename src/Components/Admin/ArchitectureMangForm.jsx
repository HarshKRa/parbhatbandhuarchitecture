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
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { uploadToCloudnary } from "../../utils/UpoadToCloud";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ArchitectureMangForm = () => {
  const [open, setOpen] = React.useState(false);
  const [uploadImage, setUploadImage] = useState(false);

  const formik = useFormik({
    initialValues: {
      ProjectName: "",
      Description: "",
      images: [],
      Location: "",
      Area: "",
      DateofCompletion: "",
      Status: "",
      TypeOfBuilding: "",
    },
    // validationSchema: {},
    onSubmit: async (values) => {
      alert("Hello");
      try {
        const response = await addDoc(
          collection(db, "ArchitectureProject"),
          values
        );
        console.log(response);
        //   toast.success("User added successfully");
        alert("Success");
        navigate("/admin-console/architecture-mang");
      } catch (error) {
        console.log("Hello", error);
        //   toast.error(error.message);
      }
    },
  });
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadToCloudnary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };
  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Project
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
          Architecture Project Form
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
          <form onSubmit={formik.handleSubmit} action="">
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
                  <span
                    className="w-24 h-24 cursor-pointer flex items-center
               justify-center p-3 border rounded-md border-gray-400"
                  >
                    <AddPhotoAlternate className="text-gray-700" />
                  </span>
                  {uploadImage && (
                    <div
                      className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex 
                justify-center items-center"
                    >
                      <CircularProgress />
                    </div>
                  )}
                </label>

                <div className="flex flex-wrap gap-2">
                  {formik.values.images.map((image, index) => (
                    <div className="relative">
                      <img
                        src={image}
                        key={index}
                        alt={`productImage ${index + 1}`}
                        className="w-24 h-24 object-cover"
                      />

                      <IconButton
                        onClick={() => handleRemoveImage(index)}
                        className=""
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
                  value={formik.values.ProjectName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.ProjectName &&
                    Boolean(formik.errors.ProjectName)
                  }
                  helperText={
                    formik.touched.ProjectName && formik.errors.ProjectName
                  }
                />
              </Grid2>

              {/* description */}
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  id="Description"
                  name="Description"
                  label="Description"
                  value={formik.values.Description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.Description &&
                    Boolean(formik.errors.Description)
                  }
                  helperText={
                    formik.touched.Description && formik.errors.Description
                  }
                />
              </Grid2>

              {/* location */}
              <Grid2 size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  id="Location"
                  name="Location"
                  label="Project Location"
                  value={formik.values.Location}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.Location && Boolean(formik.errors.Location)
                  }
                  helperText={formik.touched.Location && formik.errors.Location}
                />
              </Grid2>

              {/* Area */}
              <Grid2 size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  id="Area"
                  name="Area"
                  label="Area of land"
                  value={formik.values.Area}
                  onChange={formik.handleChange}
                  error={formik.touched.Area && Boolean(formik.errors.Area)}
                  helperText={formik.touched.Area && formik.errors.Area}
                />
              </Grid2>

              {/* DateofCompletion */}
              <Grid2 size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  id="DateofCompletion"
                  name="DateofCompletion"
                  label="Date of Completion"
                  value={formik.values.DateofCompletion}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.DateofCompletion &&
                    Boolean(formik.errors.DateofCompletion)
                  }
                  helperText={
                    formik.touched.DateofCompletion &&
                    formik.errors.DateofCompletion
                  }
                />
              </Grid2>

              {/* Status */}
              <Grid2 size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  id="Status"
                  name="Status"
                  label="Project Status"
                  value={formik.values.Status}
                  onChange={formik.handleChange}
                  error={formik.touched.Status && Boolean(formik.errors.Status)}
                  helperText={formik.touched.Status && formik.errors.Status}
                />
              </Grid2>

              {/* Area */}
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  id="TypeOfBuilding"
                  name="TypeOfBuilding"
                  label="Type Of Building"
                  value={formik.values.TypeOfBuilding}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.TypeOfBuilding &&
                    Boolean(formik.errors.TypeOfBuilding)
                  }
                  helperText={
                    formik.touched.TypeOfBuilding &&
                    formik.errors.TypeOfBuilding
                  }
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
                    <p>Add Project</p>
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
