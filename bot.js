const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("no_"));
app.listen(port, _ => 0);

const Discord = require("discord.js-light");

const MSG_SWEEP_SECONDS = 3;

const client = new Discord.Client(
   { intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"]
   , makeCache: Discord.Options.cacheWithLimits(
      { ApplicationCommandManager: 0
      , BaseGuildEmojiManager: Infinity
      , ChannelManager: Infinity
      , GuildChannelManager: Infinity
      , GuildBanManager: 0
      , GuildInviteManager: 0
      , GuildManager: Infinity
      , GuildMemberManager: Infinity
      , GuildStickerManager: 0
      , MessageManager:
         { maxSize: Infinity
         , sweepInterval: MSG_SWEEP_SECONDS
         }
      , PermissionOverwriteManager: 0
      , PresenceManager: 0
      , ReactionManager: 0
      , ReactionUserManager: 0
      , RoleManager: 0
      , StageInstanceManager: 0
      , ThreadManager: 0
      , ThreadMemberManager: 0
      , UserManager: 0
      , VoiceStateManager: 0
      })
   });

const EMOJI_ID         = process.env.BONK_EMOJI_ID;
const DISCORD_TOKEN    = process.env.DISCORD_TOKEN;
const BONKBOT_USER_ID  = process.env.BONKBOT_USER_ID;
const IMMUNE_USER_IDS  = process.env.IMMUNE_USER_IDS.split(',');

const REACT_WAIT_TIME = MSG_SWEEP_SECONDS * 1000;
client.on("messageCreate", msg =>
{
   if (IMMUNE_USER_IDS.includes(msg.author.id))
   {
      const collector = msg.createReactionCollector();
      collector.on("collect", (reaction, reactor) =>
      {
         if (reactor.id === BONKBOT_USER_ID && reaction.emoji.id === EMOJI_ID)
         {
            reaction.remove();
         }
      });
      setTimeout(collector.stop.bind(collector), REACT_WAIT_TIME);
   }
});
client.login(DISCORD_TOKEN);
