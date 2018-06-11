/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

require('dotenv').load();

const Botkit = require('botkit');
const express = require('express');
const middleware = require('botkit-middleware-watson')({
  username: process.env.CONVERSATION_USERNAME,
  password: process.env.CONVERSATION_PASSWORD,
  workspace_id: process.env.WORKSPACE_ID,
  url: process.env.CONVERSATION_URL || 'https://gateway.watsonplatform.net/conversation/api',
  version_date: '2017-05-26'
});

// ====================== Bot ======================
// Configure the bot called "botany"
const slackController = Botkit.slackbot();
const slackBot = slackController.spawn({
  token: process.env.SLACK_TOKEN
});

// Set up the bot to listen for input and then interpret that input through the botkit-middleware
slackController.hears(['.*'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
  slackController.log('Slack message received');
  middleware.interpret(bot, message, function() {
    if (message.watsonError) {
      console.log(message.watsonError);
      bot.reply(message, message.watsonError.description || message.watsonError.error);
    } else if (message.watsonData && 'output' in message.watsonData) {
      bot.reply(message, message.watsonData.output.text.join('\n'));
    } else {
      console.log('Error: received message in unknown format. (Is your connection with Watson Conversation up and running?)');
      bot.reply(message, "I'm sorry, but for technical reasons I can't respond to your message");
    }
  });
});

slackBot.startRTM();


// =========== Create an Express app ===========
const app = express();
const port = process.env.PORT || 5000;

// Root Route
app.get("/", function(req, res){
   res.send("Botany is up and running!");
});

app.set('port', port);
app.listen(port, function() {
  console.log('Client server listening on port ' + port);
});

// // Ping app after 29 minutes
// const http = require("http");
// setInterval(function() {
//     http.get("https://botany-kit.herokuapp.com/");
//     res.send("Botany was prevented from going to sleep!");
// }, 1740000); // every 29 minutes (60,000 per minute * 29 minutes)