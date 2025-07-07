import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

const main = async (content) => {
  try {
    const result = await model.generateContent(content);
    return(result.response.text());
  }catch (e) {
    console.log(e.message);
  }
};

const postAiApi = async (req, res)=>{
  try{
    const { question } = req.body;

    if(!question){
      return res.status(400).json({
        success: false,
        data: null,
        message: "Question is required"
      }); 
    }

    const result = await main(question);

    return res.status(200).json({
        success: true,
        data: result,
        message: "Content generated successfully"
      });

  }catch(e){
    return res.status(400).json({
      success: false,
      data: null,
      message: e.message
    })
  }
};

export { postAiApi };