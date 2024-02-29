import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function DeleteCurrent() {
    const navigate = useNavigate()
    const {id} = useParams()
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "2rem",
            fontWeight: "bold"
        }}>
            <div>Deleted successfully</div>
            <div>
                <button onClick={()=>{
                    navigate(`/farmercrop/${id}`)
                }}>Go Back</button>
            </div>
        </div>
    );
}

export default DeleteCurrent;