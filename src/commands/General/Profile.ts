import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import request from "../../lib/request";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "profile",
      description: "Displays user-profile 📜",
      category: "general",
      usage: `${client.config.prefix}profile [tag/quote]`,
      aliases: ["p", "pf"],
      baseXp: 30,
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
    if (M.quoted?.sender) M.mentioned.push(M.quoted.sender);
    const user = M.mentioned[0] ? M.mentioned[0] : M.sender.jid;
    let username = user === M.sender.jid ? M.sender.username : "";
    if (!username) {
      const contact = this.client.getContact(user);
      username =
        contact.notify || contact.vname || contact.name || user.split("@")[0];
    }
    let haigusha;
    if (await (await this.client.getUser(user)).married) {
      haigusha = await (await this.client.getUser(user)).haigusha.name;
    } else {
      haigusha = "None";
    }
    let pfp: string;
    try {
      pfp = await this.client.getProfilePicture(user);
    } catch (err) {
      M.reply(`Profile Picture not Accessible of ${username}must be ugly probably 😹`);
      pfp = "https://telegra.ph/file/de72ea1903c646b4d4935.jpg";
    }
    const exp = (await this.client.getUser(user)).Xp;
    let role
    if (exp < 500) {
            role = '🌸 Citizen'
        } else if (exp < 1000) {
            role = '🔎 Cleric'
        } else if (exp < 2000) {
            role = '🔮 Wizard'
        } else if (exp < 5000) {
            role = '♦️ Mage'
        } else if (exp < 10000) {
            role = '🎯 Noble'
        } else if (exp < 25000) {
            role = '✨ Elite'
        } else if (exp < 50000) {
            role = '🔶️ Ace'
        } else if (exp < 75000) {
            role = '🌀 Hero'
        } else if (exp < 100000) {
            role = '💎 Supreme'
        } else if (exp < 300000) {
            role = '❄️ Mystic'
        } else if (exp < 600000) {
            role = '🥶Arcane'
        } else if (exp < 900000) {
            role = '🥵Legendary'
        } else if (exp < 1436780) {
            role = '🚀Orisis'
        } else if (exp < 2348900) {
            role = '💥Visionary'
        } else if (exp < 5000000) {
            role = '🌪️Almighty'
        } else if (exp < 9999999) {
            role = '🛐God'
        } else {
            role = '☀️TIER 0'
        }

        let level
        if (exp < 500) {
            level = 'KID'
        } else if (exp < 1000) {
            level = 'NEWBIE'
        } else if (exp < 2000) {
            level = 'NEWBIE'
        } else if (exp < 5000) {
            level = 'BEGINNER'
        } else if (exp < 10000) {
            level = 'INTERMEDIATE'
        } else if (exp < 25000) {
            level = 'INTERMEDIATE'
        } else if (exp < 50000) {
            level = 'SKILLED'
        } else if (exp < 75000) {
            level = 'SKILLED'
        } else if (exp < 100000) {
            level = 'EXPERIENCED'
        } else if (exp < 300000) {
            level = 'EXPERIENCED'
        } else if (exp < 600000) {
            level = 'VETERAN'
        } else if (exp < 900000) {
            level = 'VETERAN'
        } else if (exp < 1436780) {
            level = 'VETERAN'
        } else if (exp < 2358900) {
            level = 'VETERAN'
        } else if (exp < 5000000) {
            level = 'PROFESSIONAL'
        } else if (exp < 9999999) {
            level = 'PROFESSIONAL'
        } else {
            level = 'TIER 0'
        }
    await M.reply(
      await request.buffer(
        pfp || "https://telegra.ph/file/de72ea1903c646b4d4935.jpg"
      ),
      MessageType.image,
      undefined,
      undefined,
      `🏮 *Username: ${username}*\n\n📖 *Bio: ${
        (await this.client.getStatus(user)).status || "None"
      }*\n\n❤ *Haigusha: ${haigusha}*\n\n🔰 *Level: ${level}*\n\n⭐ *Exp: ${
        exp || 0
      }*\n\n💫 *Role: ${role}*\n\n📊 *Quiz Points: ${
        (
          await this.client.getUser(user)
        ).quizPoints
      }*\n\n♦️ *Pokemons: ${await (
        await this.client.getUser(user)
      ).pokemons.length}*\n\n🎗 *Characters: ${
        (
          await this.client.getUser(user)
        ).gallery.length
      }*\n\n👑 *Admin: ${
        M.groupMetadata?.admins?.includes(user) || false
      }*\n\n🟥 *Ban: ${(await this.client.getUser(user)).ban || false}*`
    );
  };
}
