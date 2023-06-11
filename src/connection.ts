import makeWASocket, { DisconnectReason, useMultiFileAuthState, AuthenticationCreds } from '@adiwajshing/baileys'
import { Boom } from '@hapi/boom'

export const connectToWhatsApp = async () => {

    const { state, saveCreds } = await useMultiFileAuthState('./assets/auth/baileys')
    
 
    const bot = makeWASocket({
        printQRInTerminal:true,
        defaultQueryTimeoutMs: undefined,
        auth: state,
    })
    
    bot.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update

        if(connection === "close") {
            const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            
            if(shouldReconnect) connectToWhatsApp()
        }
    })

    bot.ev.on('creds.update', saveCreds)

    return bot
}
