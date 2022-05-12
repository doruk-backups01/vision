import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "addgold",
      description: "Adds gold to a particular user's wallet",
      category: "dev",
      aliases: ['adg'],
      modsOnly: true,
      usage: `${client.config.prefix}adg [Mention | @Tag]`,
      baseXp: 10000,
    });
  }
  
  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    if (!joined)
      return void M.reply(`Specify the amount of gold to add!`);
    const bruhh: any = joined.trim().split(" ");
    const amount: number = bruhh[0]
      .replace(/\-/g, "trewte")
      .replace(/\./g, "retre");
    if (isNaN(amount))
      return void M.reply(`The amount must be a number!`);
    const user = M.sender.jid || M.sender.username;
    const target =
      M.quoted && M.mentioned.length === 0
        ? M.quoted.sender
        : M.mentioned[0] || null;
    const wallet = await (await this.client.getUser(target)).wallet
    await this.client.addGold(target!, amount);
    await M.reply(
      `✨ *${amount} gold* has been added to the wallet of *@${
        target?.split("@")[0]
      }* by *${user}*`,
      MessageType.text,
      undefined,
      [user || "", target!]
    );
  };
}
