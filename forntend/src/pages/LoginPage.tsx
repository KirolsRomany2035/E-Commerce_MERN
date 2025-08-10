import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Container from "@mui/joy/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/joy/Button";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
    const [error, setError] = useState("")
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

     const {login} = useAuth();



    const onSubmit =async () => {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;


      // Validate the form data
      if (  !email || !password) {
        setError('Check submitted data!');
        return;
      }

      console.log( email, password);

      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          
          email,
          password,
        })
      });
        if (!response.ok) {
            setError("Unable to login user, please try different credientials!");
            return;
        }
        const token = await response.json();

        if (token) {
            setError("Icorrect token");
            return;
        }

        login(email, token);

        navigate("/");
         
    }
    return (
     <Container>
      <Box 
       sx={{
         display: "flex",
            flexDirection: "column",
         justifyContent: "center",
            alignItems: "center",
         mt: 4,
         }}>
        <Typography level="h4" sx={{ fontSize: "2rem", fontWeight: "bold" }}> Login to Your Account</Typography>
        <Box 
        sx={{
        display: "flex",
         flexDirection: "column",
            alignItems: "center",
            
           mt: 3,
            gap: 2 ,
             border: 2,
             borderColor:"#f5f5f5",
                borderRadius: 22,
                padding: 3,
              
               }}>
        <TextField  inputRef={emailRef}label="Email" name="email"  />
        <TextField  inputRef={passwordRef} type="Password"label="Password" name="password" />
        <Button onClick={onSubmit} variant="solid">
            Login
            </Button>
            {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
          </Box>
        </Box>
            
    </Container>
    );
}
export default LoginPage;
 //variant="4"