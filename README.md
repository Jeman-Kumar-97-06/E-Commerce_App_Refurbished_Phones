# RefurbStore – Smart Deals on Certified Refurbished Phones 🛒📱

RefurbStore is a modern e-commerce platform that sells **certified refurbished smartphones** with a focus on quality, affordability, and sustainability.

This app is not just an online store — it integrates **secure user authentication (OAuth + JWT)** and a built-in **AI chatbot** powered by `@xenova/transformers` and **Pinecone vector database** to help customers find exactly what they need.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Sign in with Google using OAuth 2.0
  - Session-based JWT token security

- 🛍️ **E-commerce Core**
  - Browse, filter, and search refurbished phones
  - Product pages with detailed specs (battery, display, design, etc.)
  - Cart and checkout logic

- 🤖 **AI Shopping Assistant (Chatbot)**
  - Built with `@xenova/transformers` for text vector embedding
  - Vectors stored and searched using **Pinecone**
  - Helps users find phones that match their preferences or questions

- 🌐 **Tech Stack**
  - **Frontend:** React.js
  - **Backend:** Node.js, Express.js
  - **Database:** MongoDB
  - **Authentication:** Google OAuth 2.0 + JWT
  - **AI Integration:** `@xenova/transformers` + Pinecone
  - **Cloud & Media:** Cloudinary for product images

---

## 🧠 How the Chatbot Works

1. User messages are embedded using `@xenova/transformers` in the backend.
2. The embedding (vector) is queried against **Pinecone**, which returns the most relevant stored product data.
3. Results are parsed and sent back as contextual suggestions in a chatbot UI.

---

## 🛠️ Getting Started

```bash
# Clone the repo
git clone https://github.com/Jeman-Kumar-97-06/E-Commerce_App_Refurbished_Phones.git
cd refurbx

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your MongoDB URI, OAuth credentials, Pinecone API key, etc.

# Run the app
# Enter backend/ folder :
nodemon server.js
# Enter frontend/ folder :
npm run dev
```
## Required .env Variables: 
1. MONGOURL : Your own mongodb atlas url.
2. PORT : A port through which backend code can communicate.
3. PINE_CONE_API_KEY : Pine API key .
4. PINE_CONE_INDEX_NAME : "phoneindex"
5. SEC : A secret string that is used to create json web token.
6. GOOGLECLIENTID : You need this to create Google OAuth.
