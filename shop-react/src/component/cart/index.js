import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Typography,
  Link
} from "@mui/material";
import axios from "axios";
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { headerAxios } from "../../utils/headersAxios";
import { Link as RouterLink} from "react-router-dom";
import { currencyFormat } from "../../utils/functions";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// import { dataProducts } from "../../utils/static";

export default function CartComponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataProducts, setDataProducts] = useState([]);
  let [rows, setRows] = useState([]);
  
  useEffect(() => {
    getDataProduct()
  },[])


  const getDataProduct = async() =>{
    let cart_exsiting = localStorage.getItem("cart");
    if(cart_exsiting != null && cart_exsiting.length > 0 ) {
      rows = JSON.parse(cart_exsiting);
      setRows(rows)
      ///console.log(rows);
    }
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  return (

    <Container sx={{ mt: 2 }}>
      <Grid container>
        <Grid item xs>
            <Link component={RouterLink} to={"/user/edit/"} variant="body2">
              <Button
                  type="submit"
                  variant="contained"
                  //sx={{ mt: 3, mb: 2, mr:5, ml:5 }}
                  sx={{ mx:2, background: "Indigo", width:"140px", height:"60px" }} 
              >
                back to My Profile 
              </Button>
            </Link>
        </Grid>
        <Grid item xs>
            <Link component={RouterLink} to="/product" variant="body2">
              <Button
                  type="submit"
                  variant="contained"
                  //sx={{ mt: 3, mb: 2, mr:5, ml:5 }}
                  sx={{ mx:2, background: "FireBrick", width:"140px", height:"60px" }} 
              >
                List Product
              </Button>
            </Link>
        </Grid>
        <Grid container spacing={2}  sx={{ mt:3 }}>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell colSpan={5} sx={{ backgroundColor: "red", height:"10px" }}>Cart list</StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>&nbsp;</StyledTableCell>
                <StyledTableCell>Product #</StyledTableCell>
                <StyledTableCell align="center">Price (Rp)</StyledTableCell>
                <StyledTableCell align="center">Quantity</StyledTableCell>
                <StyledTableCell align="center">Total (Rp)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell align="left" width="60px" margi="10">
                    <CardMedia
                    component="img"
                    height="60"
          
                    image={row.image}
                    alt={row.id}
                  />

                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="center">{currencyFormat(row.price)}</TableCell>
                    <TableCell align="center">{row.qty}</TableCell>
                    <TableCell align="center">{currencyFormat(row.qty * row.price)}</TableCell>
                </TableRow>
              ))}  
            </TableBody>
          </Table>
          </TableContainer>
        </Grid>

        <Button type="button" fullWidth variant="contained" sx={{ background: "FireBrick",my: 2, height:"60px" }} component={RouterLink} to={"/cart/save"}  >
          Checkout    
        </Button>     
      </Grid>        
    </Container>
  
  );
}
