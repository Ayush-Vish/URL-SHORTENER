import app  from "./app.js";
const PORT  = process.env.PORT 

app.listen(PORT,  ()=> { 
    console.log(`Server is listening on https://localhost:${PORT}`)
})