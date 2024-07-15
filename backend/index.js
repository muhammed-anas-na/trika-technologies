import {app} from './app.js'

console.log("Connecting to server")
app.listen(8000,()=>{
    console.log("Backend Server up and running on port 8000")
})