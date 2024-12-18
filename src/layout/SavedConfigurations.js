import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function SavedConfigurations() {
    const paperstyle = { padding: "100px 50px", width: 400, margin: "20px auto" };
    const paperstyle2 = { padding: "10px 50px", width: 250, margin: "20px auto" };

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = () => {
        // Fetch configurations from the backend REST API
        fetch("http://localhost:8080/api/configurations/list")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch configurations");
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setError(null); // Clear any previous errors
            })
            .catch((error) => {
                console.error("Error fetching configurations:", error);
                setError("Unable to load configurations. Please try again later.");
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Paper elevation={3} style={paperstyle}>
                <h4><u>Saved Configurations</u></h4>
                <Paper elevation={2} style={paperstyle2}>
                    {error ? (
                        <p style={{ color: "red" }}>{error}</p>
                    ) : (
                        <ul>
                            {data.length > 0 ? (
                                data.map((config, index) => <li key={index}>{config}</li>)
                            ) : (
                                <li>No configurations available</li>
                            )}
                        </ul>
                    )}
                </Paper>
                <Button style={{ marginTop: "10px", backgroundColor:"darkgray"}} onClick={fetchData}>
                    Refresh
                </Button>
            </Paper>
        </div>
    );
}
