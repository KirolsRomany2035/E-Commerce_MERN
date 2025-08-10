import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Container from "@mui/joy/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/joy/Button";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";

const RegisterPage = () => {
    const [error, setError] = useState("")
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

  
     const {login} = useAuth();
     
    async function onSubmit() {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!firstName || !lastName || !email || !password) {
      setError("Check submitted data!");
      return;
    }


    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      })
    });
    if (!response.ok) {
      setError("Unable to register user, please try different credientials!");
      return;
    }
    const token = await response.json();
    if (!token) {
      setError("Incorrect token");
      return;
    }
    login(email, token);

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
        <Typography level="h4" sx={{ fontSize: "2rem", fontWeight: "bold" }}> Register New Account</Typography>
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
        <TextField  inputRef={firstNameRef}label="First Name" name="firstName"  />
        <TextField  inputRef={lastNameRef}label="Last Name" name="lastName"  />
        <TextField  inputRef={emailRef}label="Email" name="email"  />
        <TextField  
        inputRef={passwordRef} 
        type="Password"
        label="Password" 
        name="password" />
        <Button onClick={onSubmit} variant="solid">
          Register
          </Button>
        {error && <Typography sx={{ color: "red" }}>{error}</Typography>}

        </Box>
        </Box>
            
    </Container>
    );
}
export default RegisterPage;
 //variant="4"