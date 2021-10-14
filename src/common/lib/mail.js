'use strict';

const mime = require('mime');
const { mail } = require('../config');
const text = require('./text');

let Iop = null;
let Parametro = null;
let Mail = null;

async function init (services) {
  if (process.env.MAIL_SMTP === 'true') {
    Parametro = services.Parametro;
    const nodemailer = require('nodemailer');
    const smtpTransport = require('nodemailer-smtp-transport');
    Mail = nodemailer.createTransport(smtpTransport(mail));
  } else {
    Iop = services.Iop;
    Mail = require('app-notificaciones');
  }
}

async function enviar (data, template = 'TEMPLATE_CORREO_BASE') {
  return new Promise(async (resolve, reject) => {
    if (process.env.MAIL_SMTP === 'true') {
      let tmpl = await Parametro.getParam(template);
      let contenido = text.nano(tmpl.valor, { mensaje: data.contenido, year: new Date().getFullYear() });
      const settings = {
        from: mail.origen,
        to: data.para,
        subject: data.asunto,
        // text: data.mensaje,
        html: contenido
      };
      if (data.adjuntoBase64) {
        let mimeType = data.adjuntoBase64.split(';')[0];
        mimeType = mimeType.split(':')[1];
        settings.attachments = [{
          filename: `archivo_adjunto.${mime.extension(mimeType)}`,
          path: data.adjuntoBase64
        }];
      } else {
        settings.attachments = [{ path: data.adjunto }];
      }
      Mail.sendMail(settings, (error, info) => {
        console.log('✅📧 Respuesta envio correo SMPT', error, info);
        if (error) {
          if (error.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE') {
            return resolve(error);
          } else {
            return reject(error);
          }
        }
        return resolve({ message: 'Correo enviado correctamente' });
      });
    } else {
      let pne = await Iop.findByCode('PNE-01');
      let cli = new Mail(pne.token, pne.url);
      const settings = {
        para: Array.isArray(data.para) ? data.para : [data.para],
        asunto: data.asunto,
        contenido: data.contenido,
        adjuntoBase64: data.adjuntoBase64,
        adjunto: data.adjunto
      };
      let correo = await cli.correo(settings);
      console.log('✅📧 Respuesta envio correo APP-NOTIFICACIONES', correo);
      if (correo && !correo.finalizado) {
        return reject(new Error(`No se pudo enviar el correo: ${correo.mensaje}`));
      }
      return resolve({ message: 'Correo enviado correctamente' });
    }
  });
}

module.exports = {
  init,
  enviar
};
