export default async function handler(req, res) {
  const { path } = req.query;

  const url = `https://linked-posts.routemisr.com/${path.join("/")}`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        token: req.headers.token || "",
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy error" });
  }
}