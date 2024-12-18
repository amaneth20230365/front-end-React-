import { Paper } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { Container, hslToRgb, margin, padding, positions, width } from "@mui/system";
import { useState } from "react";

export default function Myform(){
    const paperstyle ={padding:"100px 50px", width:600, margin:"20px auto"}
    const[eventName, setEventName]=useState('')
    const[totalTickets, setTotalTickets]=useState('')
    const[ticketReleaseRate, setTicketReleaseRate]=useState('')
    const[customerReleaseRate, setCustomerReleaseRate]=useState('')
    const[maxTicketCapacity, setMaxTicketCapacity]=useState('')

    const handleClick=(e)=>{
        e.preventDefault()
        const configuration={eventName, totalTickets, ticketReleaseRate, customerReleaseRate, maxTicketCapacity}
        console.log(configuration)
        fetch("http://localhost:8080/api/configurations/save",{
            method:"POST",
            headers:{"Content-Type":"Application/json"},
            body:JSON.stringify(configuration)
        }).then(()=>{ 
            console.log("add new configuration")
        }
    )
    }

    return(
        <div style={{marginTop:"80px"}}>
            <Paper elevation={3} style={paperstyle}>
                <h2><u>Administrator Privilage Only</u></h2>
                <br></br>
                <h3><u>Configure form</u></h3>
                <br></br>
                <form style={{display:"flex", flexDirection:"column",rowGap:'20px'}}>
                    
                    <label>Enter Event Name: </label>
                        <input type="text" placeholder="Name of the event" required value={eventName} onChange={(e)=>setEventName(e.target.value)}/>

                    <label>Enter Total Number of Ticket:</label>
                        <input type="number" placeholder="Enter total number of tickets" value={totalTickets} onChange={(e)=>setTotalTickets(e.target.value)}></input>
                    
                    <label>Enter Ticket Release Rate (Milli Seconds):</label>
                        <input type="number" placeholder="Enter ticket release rate in milli seconds" value={ticketReleaseRate} onChange={(e)=>setTicketReleaseRate(e.target.value)}/>
                    
                    <label>Enter Customer Release Rate ((Milli Seconds)):</label>
                        <input type="number" placeholder="Enter customer buying rate in milli seconds" value={customerReleaseRate} onChange={(e)=>setCustomerReleaseRate(e.target.value)}/>
                    
                    <label>Enter Maximum Capacity of Ticket Pool:</label>
                        <input type="number" placeholder="Enter maximum capacity of the ticket pool" value={maxTicketCapacity} onChange={(e)=>setMaxTicketCapacity(e.target.value)}/>
                    
                    <div style={{display:"flex", justifyContent:"center",alignItems:"center", paddingTop:'30px'}}>
                        
                        <button style={{width:'150px',borderRadius:'10px', backgroundColor:"red"}} onClick={handleClick}>
                            Submit
                        </button>
                    
                    </div>
                
                </form>
            </Paper>
        </div>    
    )
}