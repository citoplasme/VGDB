var mailer = require('@sendgrid/mail');
var SG_ApiKey = require('./../../config/sendgrid').key;
var Mailer = module.exports

mailer.setApiKey(SG_ApiKey);

Mailer.sendEmailRecuperacao = function(destination, link){
    const msg = {
        from: 'myvideogamedb@gmail.com',
        to: destination,
        templateId: 'd-f7f9630147b6469b859561390f2c1c95',
        dynamic_template_data: {
          url: link
        }
    };
    mailer.send(msg)
      .then(() => console.log('Recovery email sent to ' + destination + '.'))
      .catch((error) => console.log('Error while recovering the user ' + destination + ':' + JSON.stringify(error.response.body)))
}

Mailer.sendEmailRegistoAPI = function(destination, jwt){
  const msg = {
      from: 'myvideogamedb@gmail.com',
      to: destination,
      templateId: 'd-8f35ca14cd3a4e4eaaae6eb5fd3eaecc',
      dynamic_template_data: {
        key: jwt
      }
  };
  mailer.send(msg)
  .then(() => console.log('API key email sent to ' + destination + '.'))
  .catch((error) => console.log('Error while generating an API key for ' + destination + ':' + JSON.stringify(error.response.body)))
}
