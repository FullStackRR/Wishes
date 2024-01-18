const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
let index=0
const chatGptApiKey = process.env.OPENAI_API_KEY; // Replace with your OpenAI GPT-3 API key

app.get('/getBlessings', async (req, res) => {
  try {
    let blessingsList=[]
    console.log("ooooooo")
    blessingsList=["n","p"]
    const { enviorment, length,type,target } = req.query
    const prompt=generatPrompt(enviorment,type,length,target)
    blessingsList=demo(prompt);
   
    
    // const blessings = await getChatGptBlessings(prompt);
    //  blessingsList = blessings.data.choices.map(choice => choice.text);
    const firstBlessing = blessingsList[0];

    res.json( firstBlessing );
  } catch (error) {
    console.error(error.message+"oooooooooooooooops");
  }
});
function generatPrompt(enviorment,type,length,target){
  return `Generate a ${enviorment} ${length} blessing for a ${target}`
  }
async function getChatGptBlessings(prompt) {

  const maxTokens = 50; // You can adjust this based on your preference

  const response = await axios.post(
    'https://api.openai.com/v1/engines/davinci-codex/completions',
    {
      prompt,
      max_tokens: maxTokens,
      n: 3, // Generate three completions
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${chatGptApiKey}`,
      },
    }
  );

  return response.data;
}
 function demo(prompt){
  return [prompt+'111',prompt+'222',prompt+'333']
}
app.get('/another',(req,res)=>{
if(index<3)
  return blessingsList[index++]
const ans= "no more blessings for this category please enter ypur request again"
res.json({ blessing: ans });
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
