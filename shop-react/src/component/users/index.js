import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { headerAxios } from "../../utils/headersAxios";
import {  Card, CardHeader, CardContent, Link, Button, CssBaseline, TextField, Box, Grid, Typography, Container } from '@mui/material';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import ProfileIcon from '@mui/icons-material/AssignmentInd';
import axios from "axios";
const theme = createTheme();

function UserComponent() {
    const params = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const navigate = useNavigate();
    // const [dataDetail, setDataDetail] = useState(null);
   
    useEffect(() => {
        getDataUser();
    }, []);
    
    const getDataUser = async() =>{
        const url_api = "http://localhost:3000";
        const user_id = localStorage.getItem("user_id")
 

        const response = await axios.get(url_api + "/users/" + user_id, { headers:headerAxios });
        if(response)
        {
            setId(response.data.data.id)
            setName(response.data.data.name)
            setEmail(response.data.data.email)
            
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Grid container spacing={8}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        
                        <Grid container xs={2}>
                        <Grid item >
                                <Link component={RouterLink} to="/product" variant="body2">
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        //sx={{ mb: 2, ml: 10}}
                                        sx={{ mx:2, background: "Indigo", width:"140px", height:"60px" }} 
                                    >
                                    <p>List Product</p>
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                        
                        <Card>
                            <CardHeader  style={{textAlign: "center"}} title=  'My Profile' />
                            
                            
                            <CardContent>
                                <Box sx={{
                                    marginTop: 8,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}>
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                                <ProfileIcon />
                            </Avatar>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        name="name"   
                                        value = {name}
                                        autoFocus
                                        enabled="yes"
                                        sx={{
                                            input: {
                                            color: "black",
                                            background: "gainsboro"
                                            }
                                        }}
                                    />
                                    
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        value = {email}
                                        sx={{
                                            input: {
                                            color: "black",
                                            background: "gainsboro"
                                            }
                                        }}                                
                                    />

                                    <Grid container >
                                        <Grid item xs>
                                            <Link component={RouterLink} to={"/user/edit/"+id} variant="body2">
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    //sx={{ mt: 3, mb: 2, mr:5, ml:5 }}
                                                    sx={{ mx:2, background: "FireBrick", width:"140px", height:"60px" }} 
                                                >
                                                    <p>Edit Profile</p> 
                                                </Button>

                                            </Link>
                                        </Grid>
                                        <Grid item xs>
                                            <Link component={RouterLink} to="/login" variant="body2">
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    //sx={{ mt: 3, mb: 2, mr:5 }}
                                                    sx={{ mx:2, background: "FireBrick", width:"140px", height:"60px" }} 
                                                >
                                                <p>Log out</p>
                                                </Button>
                                            </Link>
                                        </Grid>
                                    </Grid>

                                </Box> 
                                
                            </CardContent>
                        </Card>                             
                    </Box>
                    </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default UserComponent