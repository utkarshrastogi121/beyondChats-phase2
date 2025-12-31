import puppeteer from "puppeteer";
import limiter from "../config/limiter.js";

const scrapeContent = async (url) =>
  limiter.schedule(async () => {
    try {
      const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
      });

      const page = await browser.newPage();

      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
      );

      await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

      const content = await page.evaluate(() => {
        const paragraphs = Array.from(document.querySelectorAll("p"));
        if (!paragraphs || paragraphs.length === 0) return "";
        return paragraphs.map((p) => p.innerText || "").join("\n");
      });

      await browser.close();

      return content.slice(0, 3500);
    } catch (err) {
      console.error("ScrapeContent Error:", err.message);
      return "";
    }
  });

export default scrapeContent;
