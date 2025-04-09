//Takes plain text and turns it into vector using OPEN AI embedding models
//Why : 
    //to embed your data before storing it to Pinecone.
    //to embed user data / queries before performing similarity search in Pinecone.

// const {EmbeddingModel,FlagEmbedding} = require('fastembed');

// let embedder;

// async function initEmbedder() {
//     if (!embedder) {
//         embedder = await FlagEmbedding.init({
//             model:EmbeddingModel.BGEBaseEN,
//             cacheDir:'./chat_cache'
//         });
//     }
//     return embedder;
// };


// async function embedText(text) {
//     const model = await initEmbedder();
//     const iterator = model.embed([text]);
//     for await (const vector of iterator) {
//         return vector;
//     }
// };

// async function embedText(text) {
//     const embedderInstance = await initEmbedder();
//     const embeddings = await embedderInstance.embed([text]);
//     return embeddings[0];
//   }

// module.exports = embedText;

// const { FlagEmbedding, EmbeddingModel } = require("fastembed");

// async function testEmbedding() {
//   try {
//     const embedder = await FlagEmbedding.init({
//       model: EmbeddingModel.BGEBaseEN,
//       cacheDir: './local_cache' // Your extracted folder
//     });

//     const inputText = ["Battery lasts two days, very efficient"];
//     const embeddings = await embedder.embed(inputText);

//     console.log("Embedding result:", embeddings);

//     if (embeddings && embeddings.length > 0 && Array.isArray(embeddings[0])) {
//       console.log("✅ First vector sample:", embeddings[0].slice(0, 5)); // first 5 numbers
//     } else {
//       console.log("❌ Embedding returned an unexpected value");
//     }
//   } catch (err) {
//     console.error("❌ Error generating embedding:", err);
//   }
// }

// testEmbedding();


// utils/embedText.js
const { pipeline } = require('@xenova/transformers');

let embedder = null;

async function initEmbedder() {
  if (!embedder) {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  return embedder;
}

async function embedText(text) {
  try {
    const model = await initEmbedder();
    const result = await model(text, {
      pooling: 'mean',    // Average token embeddings into a single vector
      normalize: true     // Normalize to unit vector (optional but good for Pinecone)
    });
    return Array.from(result.data);   // This is your embedding vector
  } catch (err) {
    console.error('Embedding error:', err);
    return null;
  }
}

module.exports = embedText;
