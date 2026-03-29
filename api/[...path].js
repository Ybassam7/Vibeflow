export default async function handler(req, res) {
  const { path = [] } = req.query;

  const url = `https://linked-posts.routemisr.com/${path.join("/")}`;

  try {
    const response = await fetch(url, {
      method: req.method, // 🔥 مهم جدًا
      headers: {
        "Content-Type": "application/json",
        token: req.headers.token || "",
      },
      body:
        req.method !== "GET" && req.method !== "HEAD"
          ? JSON.stringify(req.body)
          : undefined,
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({
      error: "Proxy error",
      details: error.message,
    });
  }
}