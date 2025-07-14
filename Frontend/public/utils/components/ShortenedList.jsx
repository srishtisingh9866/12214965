const handleSubmit = async () => {
  try {
    const responseList = [];

    for (let item of urls) {
      const payload = {
        url: item.url,
        validity: parseInt(item.validity),
        shortcode: item.shortcode || undefined,
      };
      const res = await axios.post("http://localhost:5000/shorturls", payload); // <-- API call
      responseList.push(res.data);
      logEvent(`Shortened URL created for ${item.url}`);
    }

    setResults(responseList); 
  } catch (err) {
    alert(err?.response?.data?.error || "Error");
  }
};
