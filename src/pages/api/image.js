const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  try {
    const body = req.body && JSON.parse(req.body);
    const { description } = body || {};

    const results = await openai.createImage({
      prompt: `Return an image about "why iphone gets hot?". You have to use real images but you can modify. Don't write anything into image`,
      n: 2,
      size: '512x512',
    });

    console.log(`Results: ${JSON.stringify(results.data)}}`);

    res.status(200).json({
      image: results.data.data[0]
    });
  } catch(e) {
    console.log(`Failed to create image: ${e.message}`);
    res.status(500).json({
      error: e.message
    });
  }
}
