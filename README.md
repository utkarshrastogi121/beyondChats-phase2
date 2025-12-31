# BeyondChats – Phase 2: AI-Powered Article Enhancement Pipeline

This project is **Phase 2** of the BeyondChats assignment.  
It implements an automated **Node.js–based content enhancement pipeline** that:

- Consumes articles created in **Phase 1**
- Finds competing high-ranking articles from Google Search
- Scrapes and analyzes their content
- Uses an **LLM** to rewrite and enhance the original article
- Publishes the newly generated article back via existing CRUD APIs  
- Properly **cites reference articles** used during enhancement

---

## 🚀 Features

- Fetches original articles from Phase 1 APIs
- Google Search integration using **SerpAPI**
- Intelligent filtering of blog/article links
- Web scraping using **Puppeteer**
- Rate-limited scraping with **Bottleneck**
- AI-driven content rewriting using **Groq LLM**
- Redis-based caching 
- MongoDB persistence
- Fully Dockerized setup

---

## 🧠 Workflow Overview

1. **Fetch Original Articles**
   - Retrieves articles via CRUD APIs from Phase 1

2. **Google Search**
   - Searches the article title on Google
   - Fetches top search results using SerpAPI

3. **Reference Selection**
   - Filters the first **two valid blog/article links**
   - Excludes ads, forums, and non-article content

4. **Content Scraping**
   - Scrapes main readable content from reference articles using Puppeteer

5. **AI Enhancement**
   - Calls Groq LLM to:
     - Improve structure & formatting
     - Align tone and depth with top-ranking articles
     - Preserve original intent

6. **Citation Handling**
   - Appends scraped reference URLs at the bottom of the new article

7. **Publishing**
   - Publishes the enhanced article via Phase 1 CRUD APIs

---

## 🛠 Tech Stack

| Category | Technology |
|-------|-----------|
| Runtime | Node.js |
| Scraping | Puppeteer |
| Search | SerpAPI |
| AI / LLM | Groq |
| Rate Limiting | Bottleneck |
| Cache | Redis |
| Database | MongoDB |
| Containerization | Docker |

---

## 🔐 Environment Variables

Create a `.env` file with the following values:

```env
PORT=5001
MONGODB_URI=mongodb://mongo:27017/beyondchats
REDIS_HOST=redis
REDIS_PORT=13259
REDIS_PASSWORD=****
SERPAPI_KEY=your_serpapi_key
GROQ_API_KEY=your_groq_api_key
PHASE1_API_URL=https://scraper-hna6.onrender.com
```

## Docker Setup

Build & Run

```bash
docker-compose up --build
```

## 📂 Project Structure

