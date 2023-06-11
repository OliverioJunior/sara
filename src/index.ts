import { create, Whatsapp, Message, SocketState,  } from 'venom-bot'


const start = async (connection: Promise<Whatsapp>) => {
  const client = await connection
  client.onMessage(async (message) => {
    if (message.body === 'oi sara' && message.isGroupMsg) {
      const buttons = [
        {
          "buttonText": {
            "displayText": "Menu"
            }
          }
        ]
        await client.sendButtons(message.from, '🤖 Estou aqui', buttons, 'Como posso lhe ajudar ?')
        .then((result) => {
            console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
        });

    }
  });
}

const client = async (): Promise<Whatsapp> => {
  const client = await create({
    session: "sara-bot",
    logQR: true,
    browserArgs: ['--no-sandbox'],
    headless: true
  })
  return client
}

start(client())
