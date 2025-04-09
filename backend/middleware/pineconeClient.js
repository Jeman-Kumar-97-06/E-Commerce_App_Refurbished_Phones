const { Pinecone } = require("@pinecone-database/pinecone");

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const getPineconeIndex = () => pinecone.index(process.env.PINECONE_INDEX_NAME);

module.exports = getPineconeIndex;