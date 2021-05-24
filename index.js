

const TelegramApi = require('node-telegram-bot-api')

const {gameOptions, againOptions} = require('./options')

const token = '1837669099:AAGcLpJHhravMeC6f_dVuREn2uX7Bq4msac'

const bot = new TelegramApi(token, {polling:true})

const chats = { }


startGame = async(chatId) => {
  await bot.sendMessage(chatId, "Now I will guess the number, try to guess it.")
  await bot.sendMessage(chatId, `Try to guess `, gameOptions )
  const randomNumber = Math.floor(Math.random() * 10)
  chats[chatId] = randomNumber;
}

const start = () => {

  bot.setMyCommands([
    {command:'/start', description:"Welcomming"},
    {command:'/info', description:"See more info"},
    {command:'/game', description:"Start game"},
    {command:'/again', description:"Start game"},
  ])

  bot.on("message",async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === '/start'){
      await bot.sendSticker(chatId, `https://tlgrm.ru/_/stickers/6ea/859/6ea859dd-868b-3fa8-a9cf-cb7a88e3bb1f/6.webp`)
      await bot.sendMessage(chatId, `Hello, ${msg.from.first_name} ${msg.from.last_name}! Welcome to Katyas Chat Bot! If you want to know more, please, write "/info"`)

    }
     else if(text === '/info'){
      await bot.sendMessage(chatId, `Hello, my name is Katya and I have written this chat bot."`)
    }
     else if(text === '/game'){
       return startGame(chatId)
    }

    else{
      return bot.sendMessage(chatId, "I don`t understand you. Try again")
    }

    console.log(msg)
  })

  bot.on("callback_query", async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if(data === '/again'){
      return startGame(chatId)
    }
    if(data == chats[chatId]){
      return bot.sendMessage(chatId, `Congratulation! You guessed the number ${chats[chatId]}`, againOptions)
    }else{
      return bot.sendMessage(chatId, `Sorry! The Bot guessed the number ${chats[chatId]}`, againOptions)
    }

    console.log(msg)
  })

}

start()
