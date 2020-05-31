var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var secretKey = require("./../../config/app");
var interfaceHosts = require("./../../config/database").interfaceHosts;
var Auth = require("../../controllers/auth");
var Chaves = require("../../controllers/api/chaves");
var Mailer = require("../../controllers/api/mailer");
const { param, header, body, query, validationResult } = require('express-validator');
const { existe, comecaPor, existeEnt } = require('../validation')

router.get("/", Auth.isLoggedInUser, Auth.checkLevel(6), (req, res) => {
  Chaves.listar(function(err, result) {
    if (err) {
      //res.status(500).send(`Erro: ${err}`);
      res.status(500).send("It was not possible to obtain the API keys.");
    } else {
      res.send(result);
    }
  });
});

router.get("/vgdbToken", [
    header('origin', "Não pode fazer o pedido desse domínio!")
        .custom(value => interfaceHosts.includes(value))
], (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
      return res.status(422).jsonp(errors.array())
  }
  
  Chaves.listarPorEmail("interface_vgdb@vgdb.pt", function(err, chave) {
    if (err) {
      //res.status(500).send(`Erro: ${err}`);
      res.status(500).send("Erro ao obter o token da CLAV!")
    } else if (!chave) {
      Chaves.criarChave(
        "vgdb_interface",
        "interface_vgdb@vgdb.pt",
        function(err, chave) {
          if (err) {
            //res.status(500).send(err);
            res.status(500).send("Error while obtaining the VGDB token.")
          } else {
            jwt.verify(chave.key, secretKey.apiKey, function(err, decoded) {
              if (err) {
                //res.status(500).send(err);
                res.status(500).send("Error while obtaining the VGDB token.")
              } else {
                res.send({ token: chave.key, exp: decoded.exp });
              }
            });
          }
        }
      );
    } else {
      jwt.verify(chave.key, secretKey.apiKey, function(err, decoded) {
        if (err) {
          Chaves.renovar(chave.id, function(err, chave) {
            if (err) {
              //res.status(500).send(err);
              res.status(500).send("Error while obtaining the VGDB token.")
            } else {
              jwt.verify(chave.key, secretKey.apiKey, function(err, decoded) {
                if (err) {
                  //res.status(500).send(err);
                  res.status(500).send("Error while obtaining the VGDB token.")
                } else {
                  res.send({ token: chave.key, exp: decoded.exp });
                }
              });
            }
          });
        } else {
          res.send({ token: chave.key, exp: decoded.exp });
        }
      });
    }
  });
});

router.get("/:id", Auth.isLoggedInUser, Auth.checkLevel(7), [
    param('id', "The API key does not contain a valid format.").isJWT()
], async function(req, res) {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
      return res.status(422).jsonp(errors.array())
  }

  await jwt.verify(req.params.id, secretKey.apiKey,async function(err, decoded){
    if (!err) {
      await Chaves.listarPorId(decoded.id, function(err, result) {
        if (err) {
          //res.status(403).send(err);
          res.status(500).send("Error while obtaining the VGDB token.")
        } else {
          res.send(result);
        }
      });
    } else {
      //res.status(403).send(err);
      res.status(500).send("Error while obtaining the VGDB token.")
    }
  });
});

router.post("/", [
    existe('body', 'name'),
    body('email', "Email inválido").isEmail()
], (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
      return res.status(422).jsonp(errors.array())
  }

  Chaves.listarPorEmail(req.body.email, function(err, chave) {
    if (err) {
      //return res.status(500).send(`Erro: ${err}`);
      return res.status(500).send("Error while registering the VGDB token.");
    }

    if (!chave) {
      Chaves.criarChave(
        req.body.name,
        req.body.email,
        function(err, result) {
          if (err) {
            //return res.status(500).send(`Erro: ${err}`);
            return res.status(500).send("Error while registering the VGDB token.");
          } else {
            Mailer.sendEmailRegistoAPI(req.body.email, result.ops[0].key);
            res.send("API key succesfully registered.");
          }
        }
      );
    } else {
      //Email já em uso
      //Por forma a não divulgar que emails estão já usados, será devolvido que foi enviado um email com sucesso
      res.send("API key succesfully registered.");
    }
  });
});

router.put("/renovar", [
    query('email', "Email inválido").isEmail()
], function(req, res) {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
      return res.status(422).jsonp(errors.array())
  }

  Chaves.listarPorEmail(req.query.email, (err, chave) => {
    if (err) {
      //res.status(500).send(`Erro: ${err}`);
      res.status(500).send("Error while renewing the VGDB token.");
    } else {
      if (!chave) {
        //Chave API não encontrada (404)
        //Por forma a não divulgar que emails estão já usados
        res.status(500).send("Error while renewing the VGDB token.");
      } else {
        Chaves.renovar(chave._id, function(err, chaveRen) {
          if (err) {
            //res.status(500).send(`Erro: ${err}`);
            res.status(500).send(`Error while renewing the VGDB token.`);
          } else {
            res.jsonp({ apikey: chaveRen.key });
          }
        });
      }
    }
  });
});

router.put("/:id/desativar", Auth.isLoggedInUser, Auth.checkLevel(7), [
    param('id', "Formato do id inválido").isMongoId()
], function(req, res) {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
      return res.status(422).jsonp(errors.array())
  }

  Chaves.desativar(req.params.id, function(err, cb) {
    if (err) {
      //res.status(500).send(`Erro: ${err}`);
      res.status(500).send("Error while deactivating the VGDB token.");
    } else {
      res.send("API key sucessfully deactivated.");
    }
  });
});

router.put("/:id/ativar", Auth.isLoggedInUser, Auth.checkLevel(7), [
    param('id', "Formato do id inválido").isMongoId()
], function(req, res) {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
      return res.status(422).jsonp(errors.array())
  }

  Chaves.ativar(req.params.id, function(err, cb) {
    if (err) {
      //res.status(500).send(`Erro: ${err}`);
      res.status(500).send("Error while activating the VGDB token.");
    } else {
      res.send("API key successfully activated.");
    }
  });
});

router.delete("/:id", Auth.isLoggedInUser, Auth.checkLevel(7), [
    param('id', "Formato do id inválido").isMongoId()
], function(req, res) {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
      return res.status(422).jsonp(errors.array())
  }

  Chaves.eliminar(req.params.id, function(err, cb) {
    if (err) {
      //res.status(500).send(`Erro: ${err}`);
      res.status(500).send("Error while deleting the VGDB token.");
    } else {
      res.send("API key sucessfully deleted.");
    }
  });
});

router.put("/:id/atualizar", Auth.isLoggedInUser, Auth.checkLevel(7), [
    param('id', "Formato do id inválido").isMongoId(),
    existe('body', 'name'),
    body('contactInfo', "Email inválido").isEmail()
], function(req, res) {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
      return res.status(422).jsonp(errors.array())
  }

  Chaves.listarPorEmail(req.body.email, function(err, chave) {
    if (chave && req.params.id != chave._id) {
      res.status(500).send("It was not possible to update the API key. There is an API key for that email.");
    } else {
      Chaves.atualizarMultiplosCampos(
        req.params.id,
        req.body.name,
        req.body.contactInfo,
        function(err, cb) {
          if (err) {
            //res.status(500).send(`Erro: ${err}`);
            res.status(500).send("Error while updating the VGDB token.");
          } else {
            res.send("API key sucessfully updated.");
          }
        }
      );
    }
  });
});

module.exports = router;
