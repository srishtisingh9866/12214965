import { urlDatabase, statsDatabase } from "../envdata/db.js";
import generatecode from "../utils/generatecode.js";

export const createShortUrl = (req, res, next) => {
  try {
    const { url, validity = 30, shortcode } = req.body;
    if (!url || !url.startsWith("http")) {
      throw { statusCode: 400, message: "Invalid URL" };
    }

    let code = shortcode || generateShortcode();

    if (urlDatabase.has(code)) {
      throw { statusCode: 409, message: "Shortcode already in use" };
    }

    const now = new Date();
    const expiry = new Date(now.getTime() + validity * 60000);

    urlDatabase.set(code, {
      longUrl: url,
      createdAt: now,
      expiry,
    });

    statsDatabase.set(code, []);

    res.status(201).json({
      shortLink: `http://localhost:5000/${code}`,
      expiry: expiry.toISOString(),
    });
  } catch (err) {
    next(err);
  }
};
