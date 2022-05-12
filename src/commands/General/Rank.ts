/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";
import Canvacord from "canvacord";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "rank",
      description: "Displays User's Stats",
      aliases: ['card', 'rk'],
      category: "general",
      usage: `${client.config.prefix}rank [tag/quote]`,
      aliases: ["stats"],
      baseXp: 10,
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
    let pfp: string;
    try {
      pfp = await this.client.getProfilePicture(user);
    } catch (err) {
      M.reply(`Profile Picture not Accessible of ${username}`);
      pfp =
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";
    }
    const exp = (await this.client.getUser(user)).Xp;
    let role: string;
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

        let level: string;
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
    let level: string;
        if (exp < 500) {
            level = '500'
        } else if (exp < 1000) {
            level = '1000'
        } else if (exp < 2000) {
            level = '2000'
        } else if (exp < 5000) {
            level = '5000'
        } else if (exp < 10000) {
            level = '10000'
        } else if (exp < 25000) {
            level = '25000'
        } else if (exp < 50000) {
            level = '50000'
        } else if (exp < 75000) {
            level = '75000'
        } else if (exp < 100000) {
            level = '100000'
        } else if (exp < 300000) {
            level = '300000'
        } else if (exp < 600000) {
            level = '600000'
        } else if (exp < 900000) {
            level = '900000'
        } else if (exp < 1436780) {
            level = '1436780'
        } else if (exp < 2358900) {
            level = '2358900'
        } else if (exp < 5000000) {
            level = '5000000'
        } else if (exp < 9999999) {
            level = '9999999'
        } else {
            required = '👑 REGAL'
        }
    const rank = new Canvacord.Rank()
      .setAvatar(pfp)
      .setCurrentXP(exp || 0)
      .setRequiredXP(required)
      .setStatus("online", false)
      .setLevel(level, "Level:", true)
      .setRank(0, `Role: ${role}`, true)
      .setProgressBar("#FFC0CB", "COLOR")
      .setOverlay("#FFFFFF")
      .setUsername(username)
      .setDiscriminator("0007")
      .setBackground("COLOR", "#FFC0CB");
    rank.build({}).then((rankcard) => {
      const text = `🏮 *Username: ${username}*\n\n〽️ *Level: ${level}*\n\n⭐ *Exp: ${
        exp || 0
      } / ${required}*\n\n💫 *Role: ${role}*\n\n`;
      M.reply(
        rankcard,
        MessageType.image,
        undefined,
        undefined,
        text,
        undefined
      );
    });
  };
}
