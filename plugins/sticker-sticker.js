import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false
  let user = db.data.users[m.sender]
  try {
  	
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime)) if ((q.msg || q).seconds > 11) return m.reply('📜🦉 _El vídeo dura más de 7 segundos, por favor recórtalo._')
      let img = await q.download?.()
      if (!img) throw `🦉📜 _Hay un error. Tienes que responder a una imagen, video o GIF utilizando el siguiente comando:_ *${usedPrefix + command}`
      let out
      try {
        stiker = await sticker(img, false, global.packname, global.author)
      } catch (e) {
        console.error(e)
      } finally {
await conn.chatRead(m.chat) // Marca el chat como leído para evitar que el mensaje aparezca como reenviado
await conn.sendMessage(m.chat, `📜🦉 _Ya estoy haciéndolo._`, 'conversation', { 
  quoted: m,
  contextInfo: { forwardingScore: 0, isForwarded: false }
})

if (!stiker) {
  let out
  if (/webp/g.test(mime)) out = await webp2png(img)
  else if (/image/g.test(mime)) out = await uploadImage(img)
  else if (/video/g.test(mime)) out = await uploadFile(img)

  if (typeof out !== 'string') out = await uploadImage(img)
  stiker = await sticker(false, out, global.packname, global.author)
}

else if (args[0]) {
      if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packname, global.author)
      else return m.reply('URL invalido')
    }
  } catch (e) {
    console.error(e)
    if (!stiker) stiker = e
  } finally {
     if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 0, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: wm, body: `Hedwig Bot 🦉📜 `, mediaType: 2, thumbnail: imagen1}}}, { quoted: m })
    else throw '_Responda a una imagen, video o GIF para que funcione._'
  }
user.lastmiming = new Date * 1
}
handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker'] 

export default handler

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds

return minutes + " m y " + seconds + " s " 
}

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}
