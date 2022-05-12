import { MessageType, Mimetype } from '@adiwajshing/baileys'
import { join } from 'path'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: '',
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        const n = [
            'https://telegra.ph/file/0deeeed3cb3772934e686.jpg'
        ]
        let lucy = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: lucy }, MessageType.image, {
            quoted: M.WAMessage,
            mimetype: Mimetype.gif,
            caption: `It's too quiet *${M.sender.username}* Do you mean *${this.client.config.prefix}help* ?\n` }
        )
    }
}
          
       


    
        
           
           
            
            
        
    

    
        
           
           
           
   
