// by https://github.com/elrebelde21

import '../plugins/_content.js'
let handler = m => m
handler.all = async function (m) {
let chat = global.db.data.chats[m.chat]
let name = conn.getName(m.sender)
if (chat.isBanned) return
let bot = `${pickRandom([`📜 _Estoy aquí dispuesto a ayudarte._`, `🦉📜 _¡Por aquí!_`, `📜 _¡Hola! Con gusto te ayudo._`])}`.trim()

if (/^infinity|infinityWa|infohost|hosting$/i.test(m.text)) {
 await conn.sendMessage(m.chat, { text: txt,
contextInfo:{
forwardingScore: 9999999,
isForwarded: false, 
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
title: `HedwigBot`,
body: `✅ Hosting de Calidad`,
"previewType": "PHOTO",
thumbnailUrl: 'https://qu.ax/EQTd.jpg', 
sourceUrl: accountsgb}}},
{ quoted: fkontak})
}
 
if (/^bot$/i.test(m.text)) {
 let bot = `${pickRandom([`📜 _Estoy aquí dispuesto a ayudarte._`, `🦉📜 _¡Por aquí!_`, `📜 _¡Hola! Con gusto te ayudo._`])}`.trim()
await conn.sendPresenceUpdate('recording', m.chat)    
   }

if (/^e$/i.test(m.text) ) { //sin prefijo 
let teks = `${pickRandom([`Que bueno sabe la letra E`, `eeeeee`])}`.trim()
conn.reply(m.chat, teks, m, { mentions: { mentionedJid: [m.sender] }})}

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}

