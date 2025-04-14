import { React, useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { db } from "../../../utils/firebaseConfig";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { IconButton } from "@mui/material";
import { Collections, Delete, Edit } from "@mui/icons-material";
import HomeMangForm from "./HomeMangForm";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const HomePageData = () => {
  const [homeScreenData, setHomeScreenData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getDocs(collection(db, "HomeImage"));
      const dataList = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHomeScreenData(dataList);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "HomeImage", id));
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(homeScreenData[0]?.images);
  return (
    <div className="mt-6">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Project Name</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Images</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {homeScreenData.map((item, index) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                  {item.projectName}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {item.description}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {item?.images?.map((image, ind) => (
                    <img className="h-20 w-20" src={image} alt="Images" />
                  ))}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <HomeMangForm data={item} id={item.id}>
                    <IconButton size="small" color="primary">
                      <Edit />
                    </IconButton>
                  </HomeMangForm>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton size="small" color="error">
                    <Delete onClick={() => handleDelete(item.id)} />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HomePageData;
