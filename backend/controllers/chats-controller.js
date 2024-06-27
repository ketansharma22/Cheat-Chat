// import { configureOpenAI } from "../conifg/openai-config.js";
import usersModel from "../models/usersModel.js";
import { OpenAI } from "openai";
import { config } from "dotenv";
config();

export const generateChatCompletion = async (req, res, next) => {
  console.log("aagya");
  const { message } = req.body;
  try {
    console.log("done");
    const user = await usersModel.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "user not regsitered or token malfunctioned" });
    }
    console.log("1done");
    //grab previous chats of current user
    const chats =
      usersModel?.chats?.map((chat) => ({
        role: chat.role,
        content: chat.content,
      })) || [];
    console.log(chats);

    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    //send all chats to openAI API
    // const config = configureOpenAI();
    // const openai = new OpenAI({
    //   apiKey: process.env.OPEN_AI_SECRET,
    //   organization: process.env.ORGANIZATION_ID,
    // });
    // const chatResponse = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: chats,
    // });
    // user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    console.log(user.chats);
    return res.status(200).json({ chats: user.chats })  ;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const sendChatsToUser = async (req, res, next) => {
  //user token check
  try {
    console.log("aagyy andar");
    const user = await usersModel.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .send("user not resgistered of token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    console.log("into controlr");
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch(error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message })
  }
};

export const deleteChatss=async(req,res,next)=>{
  try {
    const user = await usersModel.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .send("user not resgistered of token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    user.chats=[]
    await user.save()
    console.log(user.chats);
    return res.status(200).json({ message: "OK" });
  
  }
  catch(error){
    console.log(error);
  }
}