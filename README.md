# Botany Kit
Botany kit helps my Watson Assistant communicate with a slackbot. The bot's name is botany. 

## Technologies and Tools I Used
Watson Assistant is my trained AI chatbot. You can set up your own Watson Assistant instance w/ [IBM's documentation](https://console.bluemix.net/docs/services/conversation/getting-started.html#gettingstarted).

I used the [Botkit developer tool](https://botkit.ai/docs/) to set up the bot.

While Botkit is helpful, there is still configuration for Watson to communicate with the slackbot, so I used the [botkit-middleware](https://github.com/watson-developer-cloud/botkit-middleware) simple bot example to get the bot up and running.

## Configuration
You'll need to make your own .env file based on the example I've given in .env.example which will store the required Watson and Slack credentials.
