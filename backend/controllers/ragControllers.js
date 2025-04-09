const getPineconeIndex = require("../middleware/pineconeClient");
const embedText = require("../middleware/embeddText");
const Product   = require('../models/productModel');

const index = getPineconeIndex();

//Feeding data to models. ie., convert text to vectors.
const ingestProds = async (req, res) => {

  const prods = await Product.find({});

  if (!prods) {return res.status(404).json({error:"Products Not Found!"})};

  const upserts = [];

  for (let prod of prods) {
    const combText = `Battery:${prod.battery} Design:${prod.design} Display:${prod.display}`;
    const embedding = await embedText(combText);
  
    // 💣 CRUCIAL LOGGING
    console.log("Embedding for:", prod.name);
    console.log("Embedding value:", embedding);
    console.log("Type of embedding:", typeof embedding);
    console.log("Is Array:", Array.isArray(embedding));
    console.log("First item type:", typeof embedding?.[0]);
  
    if (!Array.isArray(embedding) || typeof embedding[0] !== "number") {
      console.error("❌ Invalid embedding! It must be a flat array of numbers.");
      return res.status(500).json({ error: "Invalid embedding format!" });
    }
  
    upserts.push({
      id: prod._id.toString(),
      values: embedding,
      metadata: {
        name: prod.name,
        image: prod.image,
        price: prod.price,
      },
    });
  }
  
  await index.namespace('ns1').upsert(upserts);

  res.json({ message: "Document ingested!", docId: upserts.length });
};

//Querying data.
const queryProds = async (req,res) => {
    const {question} = req.body;
    console.log(question)
    if (!question) {return res.status(404).json({error:"Question is required!"})};
    try {
        const index = getPineconeIndex();
        //Turn the human question to vector for ml model:
        const questEmbedding = await embedText(question);

        //Use the question (now in the form of vector) to query pinecone : 
        const result = await index.namespace('ns1').query({
            vector : questEmbedding,
            topK : 5, //No of results
            includeMetadata : true,
        });

        //Build response from Pinecone matches : 
        const prods  = result.matches.map((match)=>({
            id : match.id,
            score : Number(match.score.toFixed(3)),
            name : match.metadata.name,
            image : match.metadata.image,
            price : match.metadata.price,
        }));
        console.log(result);
        res.json({results:prods});
    } catch(err) {
        console.error('Query Error: ',err);
        return res.status(500).json({error:"Query failed :("});
    }
}

module.exports = {ingestProds,queryProds};