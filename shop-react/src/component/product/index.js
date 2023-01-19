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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { headerAxios } from "../../utils/headersAxios";
import { Link as RouterLink} from "react-router-dom";
import { currencyFormat } from "../../utils/functions";


// import { dataProducts } from "../../utils/static";

export default function ProductComponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataProducts, setDataProducts] = useState([]);

  useEffect(() => {
    getDataProduct()
  },[])

  const gotoDetail = id => {
    navigate("/product/" + id);
  };

  const getDataProduct = async() =>{
    const url_api = "http://localhost:3000";

  
    const response = await axios.get(url_api + "/products", { headers:headerAxios });

    if(response)
    {
      setDataProducts(response.data.data);
    }
  }

  
  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}  sx={{ mt:3 }}>
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
              <Link component={RouterLink} to="/cart" variant="body2">
                <Button
                    type="submit"
                    variant="contained"
                    //sx={{ mt: 3, mb: 2, mr:5, ml:5 }}
                    sx={{ mx:2, background: "Indigo", width:"140px", height:"60px" }}
                >
                  My Cart
                </Button>
              </Link>
        </Grid>
      <Grid container spacing={2}  sx={{ mt:3 }}>
        {dataProducts.map((data, i) => (
          <Grid key={i} item xs={3}>
            <Card> 
              <CardHeader title={data.name} style={{fontWeight: 'bold'}} />
              <CardMedia
                component="img"
                height="200"
                image={data.image}
                alt={data.name}
              />
              <CardContent>
                <Typography variant="subtitle2" style={{fontWeight: 'bold'}}>Price : {currencyFormat(data.price)} </Typography>
              </CardContent>
              <CardActions>
                {data.active ?                 
                  <Button
                    fullWidth
                    variant="contained"
                     sx={{ mx:1, background: "FireBrick" }} 
                    onClick={() => gotoDetail(data.id)}
                  >Detail</Button>
                :
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                  >Detail</Button>
                }
              </CardActions>
            </Card>
          </Grid>          
        ))}
      </Grid>
    </Grid>        
    </Container>
  
  );
}
