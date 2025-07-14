import { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { logEvent } from "../utils/logger";

export default function ShortenerForm() {
  const [urls, setUrls] = useState([{ url: "", validity: 30, shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const addMore = () => {
    if (urls.length < 5) {
      setUrls([...urls, { url: "", validity: 30, shortcode: "" }]);
    }
  };

  const handleSubmit = async () => {
    try {
      const responseList = [];

      for (let item of urls) {
        const payload = {
          url: item.url,
          validity: parseInt(item.validity),
          shortcode: item.shortcode || undefined,
        };
        const res = await axios.post("http://localhost:5000/shorturls", payload);
        responseList.push(res.data);
        logEvent(`Shortened URL created for ${item.url}`);
      }

      setResults(responseList);
    } catch (err) {
      alert(err?.response?.data?.error || "Error");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      {urls.map((item, i) => (
        <Grid container spacing={2} key={i} style={{ marginBottom: 12 }}>
          <Grid item xs={12} md={5}>
            <TextField fullWidth label="Long URL" value={item.url} onChange={(e) => handleChange(i, "url", e.target.value)} />
          </Grid>
          <Grid item xs={3}>
            <TextField type="number" label="Validity (min)" value={item.validity} onChange={(e) => handleChange(i, "validity", e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Custom Shortcode" value={item.shortcode} onChange={(e) => handleChange(i, "shortcode", e.target.value)} />
          </Grid>
        </Grid>
      ))}

      <Button variant="contained" color="primary" onClick={addMore} disabled={urls.length >= 5}>
        + Add More
      </Button>

      <Button variant="contained" color="success" onClick={handleSubmit} style={{ marginLeft: 12 }}>
        Shorten URLs
      </Button>

      <div style={{ marginTop: 20 }}>
        {results.map((res, i) => (
          <Typography key={i}>
             <a href={res.shortLink} target="_blank" rel="noreferrer">{res.shortLink}</a> (Expires at {res.expiry})
          </Typography>
        ))}
      </div>
    </div>
  );
}
