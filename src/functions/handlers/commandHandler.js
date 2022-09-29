const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { DevGuild, AppID, BotToken } = process.env;

/**
 *
 * @param {import('discord.js').Client} client
 */
module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = rds("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = rds(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        if (command.subCommand) return
        if (command.developer) {
          developerArray.push(command.data.toJSON());
        } else {
          commandArray.push(command.data.toJSON());
        }
        commands.set(command.data.name, command);
      }
    }

    await client.application.commands.set(commandArray);
    const devGuild = client.guilds.cache.get(DevGuild);
    devGuild.commands.set(developerArray)
    // const rest = new REST({ version: "10" }).setToken(BotToken);
    // (async () => {
    //   try {
    //     await rest
    //       .put(Routes.applicationGuildCommands(AppID, DevGuild), { body: developerArray })
    //     await rest
    //       .put(Routes.applicationCommands(AppID), { body: commandArray })
    //   } catch (error) {
    //     console.error(error);
    //   }
    // })();
  };
};
