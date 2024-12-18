import React, { useState } from 'react';
import { Paper } from "@mui/material";

const ConfigurationLoader = () => {
  const [fileName, setFileName] = useState('');
  const [configuration, setConfiguration] = useState(null);
  const [error, setError] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  const paperstyle = { padding: "100px 50px", width: 600, margin: "20px auto" };
  const paperstyle2 = { padding: "10px 50px", width: 350, margin: "20px auto" };
  const paperstyle3 = { padding: "10px 50px", width: 450, margin: "20px auto" };

  const handleInputChange = (event) => {
    setFileName(event.target.value);
  };

  const loadConfiguration = async () => {
    if (!fileName) {
      setError('Please enter a file name.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/configurations/load?fileName=${fileName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load configuration');
      }

      const data = await response.json();
      setConfiguration(data);
      setError('');
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  const handleThreadController = async () => {
    setLoading(true);
    setResponseMessage('');

    try {
      const response = await fetch('http://localhost:8080/api/threadController/threadRunning', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.text();
      setResponseMessage(data);

      // Fetch logs after simulation is over
      await fetchSimulationLogs();
    } catch (error) {
      setResponseMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimulationLogs = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/simulationLogs/getlogs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch simulation logs');
      }

      const data = await response.json();
      setLogs(data);
    } catch (err) {
      console.error(`Error fetching simulation logs: ${err.message}`);
    }
  };

  return (
    <div>
      <Paper elevation={3} style={paperstyle}>
        <h3>Select Configuration</h3>
        <h5>and load</h5>
        <br></br>
        <input
          type="text"
          value={fileName}
          onChange={handleInputChange}
          placeholder="Enter JSON file name"
        />
        <button onClick={loadConfiguration}>Load</button>
        <Paper elevation={3} style={paperstyle2}>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {configuration && (
            <div>
              <h4>Configuration Data:</h4>
              <pre>{JSON.stringify(configuration, null, 2)}</pre>
            </div>
          )}
        </Paper>
        <button onClick={handleThreadController} disabled={loading}>
          {loading ? 'Running...' : 'Start Simulation'}
        </button>
        {responseMessage && <p>{responseMessage}</p>}
        <Paper elevation={3} style={paperstyle3}>
          <h4>Simulation Logs:</h4>
          {logs.length > 0 ? (
            <ul>
              {logs.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          ) : (
            <p>No logs available</p>
          )}
        </Paper>
      </Paper>
    </div>
  );
};

export default ConfigurationLoader;
