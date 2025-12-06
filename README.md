## 🛍️ Gemini-Powered E-Commerce Assistant (Customer Support Chatbot)

This project is a high-performance, **AI-powered customer support chatbot** designed specifically for an e-commerce platform. It leverages Google's **Gemini LLM** and the **Astra DB** vector database to provide instant, context-aware assistance to customers.

It is engineered to seamlessly handle common customer queries such as order status, return policy explanations, product availability, shipping details, and general FAQs using sophisticated **Retrieval-Augmented Generation (RAG)** principles.

---

##  Key Features

* ** Interactive Chat Interface:** A modern, fast, and clean user interface built with Next.js 14.
* ** Gemini-Powered Responses:** Core intelligence for generation and reasoning is provided by the **Google Gemini** family of models.
* ** Vector Search (RAG):** Utilizes **Astra DB** for rapid vector similarity search, ensuring answers are factual and grounded in the latest knowledge base.
* ** Knowledge Base:** Supports a diverse knowledge base including **product data**, **policy documentation**, and general **FAQs**.
* ** Conversational Memory:** Maintains full chat history to provide contextual and coherent responses within a thread.
* ** Performance:** Optimized for low-latency retrieval and quick, user-friendly interaction.

---

## 🧱 Tech Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend/Backend** | **Next.js 14**, **React 19**, **TypeScript** | Full-stack framework for UI and robust API routing. |
| **LLM & Embeddings** | **Google Gemini** | Generative AI for reasoning and high-quality vector embeddings. |
| **Vector Database** | **Astra DB (DataStax)** | Low-latency vector storage and similarity search for RAG. |

---


## ⚙️ Environment Setup

### 1. Create `.env.local`

Create a file named **`.env.local`** in the project root to securely store your API keys and configuration details:

```dotenv
# Gemini API Key for LLM access
GEMINI_API_KEY=your_key_here

# Astra DB Configuration for Vector Database
ASTRA_DB_TOKEN=your_astra_token
ASTRA_DB_ENDPOINT=your_endpoint
ASTRA_DB_NAMESPACE=default_keyspace
ASTRA_DB_COLLECTION=ecommerce_chatbot_vectors
---
```
## ⚙️ Environment Setup

### 2. Installation and Seeding

Install the required Node.js dependencies:

```bash
npm install
```
