const axios=require("axios")

axios.get("http://localhost:8000/bookings")
.then(res=>{
    console.log(res.data);
})
.catch(err=>{
    console.log(err);
})
