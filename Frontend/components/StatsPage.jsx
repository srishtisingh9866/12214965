import { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

export default function StatsPage() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const codes = ["abcd1", "xyz123"];
    const fetchStats = async () => {
      const all = [];
      for (let code of codes) {
        try {
          const res = await axios.get(`http://localhost:5000/shorturls/${code}/stats`);
          all.push({ code, ...res.data });
        } catch {}
      }
      setStats(all);
    };
    fetchStats();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>
      {stats.map((item, i) => (
        <div key={i}>
          <Typography>🔗 {item.shortcode}</Typography>
          <Typography>Clicks: {item.clicks}</Typography>
          <Typography>Expires: {item.expiry}</Typography>
        </div>
      ))}
    </div>
  );
}
