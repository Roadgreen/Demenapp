const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Notif = require("../models/user.notification");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("noToken");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "auth failed" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

module.exports.isAuth = async (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("noToken");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "auth failed" });
      } else {
        req.userId = decoded.id;
        res.json({ auth: true, result: req.userId });
      }
    });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const findedUser = await User.findOne({ email: email });
  console.log(findedUser);

  if (!findedUser) {
    res.send("emailError");
  } else if(findedUser.isOk === false){
          res.send("isOkFalse");
  } else {
    const comparePass = async (password, hash) => {
      try {
        return await bcrypt.compare(password, hash);
      } catch (err) {
        console.log(error);
      }
      return false;
    };

    const isValidPass = await comparePass(password, findedUser.mdp);

    if (!isValidPass) {
      res.send("passError");
    } else {
      const id = findedUser._id;
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 3600,
      });
      res.json({ auth: true, token: token, result: findedUser });
    }
  }
};

module.exports.signUp = async (req, res) => {
  const { username, nom, prenom, email, password, ville,tel, rue, numero, postal, Cheque,Rib} =
    req.body.formData;
  //console des infos du register coté front:
  console.log(username, nom, prenom, email, password, ville, rue, numero);
  const findedUser = await User.findOne({ email: email });
  console.log(findedUser);
  if (findedUser !== null) {
    res.send("userFinded");
  } else {
    try {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          // Store hash in your password DB.
          if (err) {
            console.log(err);
          } else {
            const newUser = new User({
              username: username,
              nom: nom,
              prenom: prenom,
              isOk: false,
              email: email,
              tel: tel,
              creationDate: new Date(),
              adresse: {
                ville: ville,
                rue: rue,
                numero: numero,
                postalCode: postal,
              },
              payment:{Rib: Rib,Cheque: Cheque},
              mdp: hash,
            });
            newUser.save();
            let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: 'demen.app.contact@gmail.com', // generated ethereal user
                pass: `${process.env.MAIL_SECRET}`// generated ethereal password
              }
            });
            let info =  transporter.sendMail({
              from: '"DemenHouse - DemenApp 🚚" demen.app.contact@gmail.com', // sender address
              to: email, // list of receivers
              subject: "Bienvenue", // Subject line
              text: "Bienvenue", // plain text body
              html:`
              <html>
              <head>
                      <!--[if gte mso 15]>
                      <xml>
                              <o:OfficeDocumentSettings>
                              <o:AllowPNG/>
                              <o:PixelsPerInch>96</o:PixelsPerInch>
                              </o:OfficeDocumentSettings>
                      </xml>
                      <![endif]-->
                      <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                      <meta name="format-detection" content="date=no" />
                      <meta name="format-detection" content="address=no" />
                      <meta name="format-detection" content="telephone=no" />
                      <title>Email Template</title>
                     
              
                      <style type="text/css" media="screen">
                              /* Linked Styles */
                              body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f9f9fb; -webkit-text-size-adjust:none }
                              a { color:#00b3c3; text-decoration:none }
                              p { padding:0 !important; margin:0 !important }
                              img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
              
                              /* Mobile styles */
                              @media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
                                      div[class='mobile-br-5'] { height: 5px !important; }
                                      div[class='mobile-br-10'] { height: 10px !important; }
                                      div[class='mobile-br-15'] { height: 15px !important; }
              
                                      th[class='m-td'],
                                      td[class='m-td'],
                                      div[class='hide-for-mobile'],
                                      span[class='hide-for-mobile'] { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }
              
                                      span[class='mobile-block'] { display: block !important; }
              
                                      div[class='img-m-center'] { text-align: center !important; }
              
                                      div[class='fluid-img'] img,
                                      td[class='fluid-img'] img { width: 100% !important; max-width: 480px !important; height: auto !important; }
              
                                      table[class='mobile-shell'] { width: 100% !important; min-width: 100% !important; }
                                      table[class='center'] { margin: 0 auto; }
                                     
                                      td[class='column'],
                                      th[class='column'] { float: left !important; width: 100% !important; display: block !important; }
              
                                      td[class='td'] { width: 100% !important; min-width: 100% !important; }
              
                                      td[class='content-spacing'] { width: 15px !important; }
                              }
                      </style>
              </head>
              <body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f9f9fb; -webkit-text-size-adjust:none">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f9f9fb">
                              <tr>
                                      <td align="center" valign="top">
                                              <table width="446" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
                                                      <tr>
                                                              <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="10"></td>
                                                              <td>
                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                              <tr>
                                                                                      <td class="td" style="width:426px; min-width:426px; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; Margin:0">
                                                                                              <!-- Header -->
                                                                                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                      <tr>
                                                                                                              <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                                                                                              <td>
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="30" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
              
                                                                                                                      <div class="img-center" style="font-size:0pt; line-height:0pt; text-align:center"><a href="#" target="_blank"><img src="images/logo.jpg" border="0" width="74" height="23" alt="" /></a></div>
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="24" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
              
                                                                                                              </td>
                                                                                                              <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                                                                                      </tr>
                                                                                              </table>
                                                                                              <!-- END Header -->
                                                                                              <!-- Main -->
                                                                                              <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                                                                                      <tr>
                                                                                                              <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="34"></td>
                                                                                                              <td>
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="36" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
              
                                                                                                                     
                                                                                                                      <div class="text" style="color:#49555c; font-family:Arial,sans-serif; font-size:14px; line-height:20px; text-align:left"><strong><a href="#" target="_blank" class="link" style="color:#00b3c3; text-decoration:none"><span class="link" style="color:#00b3c3; text-decoration:none">Hi Darren,</span></a></strong></div>
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="20" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
              
              
                                                                                                                      <div class="text" style="color:#49555c; font-family:Arial,sans-serif; font-size:14px; line-height:20px; text-align:left">
                                                                                                                              Thanks for signing for Djed, the family app. It's easy
                                                                                                                              to set up your family and start sharing information.
                                                                                                                      </div>
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="26" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
              
              
                                                                                                                      <!-- Button -->
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                                              <tr>
                                                                                                                                      <td align="center">
                                                                                                                                              <table border="0" cellspacing="0" cellpadding="0" bgcolor="#0aa5b5" style="border-radius: 4px;">
                                                                                                                                                      <tr>
                                                                                                                                                              <td>
                                                                                                                                                                      <table width="162" border="0" cellspacing="0" cellpadding="0" bgcolor="#0ccbd7" style="border-radius: 4px;">
                                                                                                                                                                              <tr>
                                                                                                                                                                                      <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20" height="46">&nbsp;</td>
                                                                                                                                                                                      <td>
                                                                                                                                                                                              <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="10" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
              
                                                                                                                                                                                              <div class="text-button" style="color:#ffffff; font-family:Arial,sans-serif; font-size:14px; line-height:20px; text-align:center; font-weight:bold">
                                                                                                                                                                                                      <a href="#" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none"><span class="link-white" style="color:#ffffff; text-decoration:none">Get started</span></a>
                                                                                                                                                                                              </div>
                                                                                                                                                                                              <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="10" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
              
                                                                                                                                                                                      </td>
                                                                                                                                                                                      <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                                                                                                                                                              </tr>
                                                                                                                                                                      </table>
                                                                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="2" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
              
                                                                                                                                                              </td>
                                                                                                                                                      </tr>
                                                                                                                                              </table>
                                                                                                                                      </td>
                                                                                                                              </tr>
                                                                                                                      </table>
                                                                                                                      <!-- END Button -->
              
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="28" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
              
                                                                                                                      <div style="font-size:0pt; line-height:0pt; height:1px; background:#f1f1f1; "><img src="images/spacer.gif" width="1" height="1" style="height:1px" alt="" /></div>
              
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="32" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
              
              
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                                              <tr>
                                                                                                                                      <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="40">
                                                                                                                                              <div class="img" style="font-size:0pt; line-height:0pt; text-align:left"><img src="images/ico1.jpg" border="0" width="27" height="27" alt="" /></div>
                                                                                                                                      </td>
                                                                                                                                      <td>
                                                                                                                                              <div class="text" style="color:#49555c; font-family:Arial,sans-serif; font-size:14px; line-height:20px; text-align:left"><strong>Djed was created for your family</strong> &mdash; invite parents, kids, caregivers, pets, anyone you'd like!</div>
                                                                                                                                      </td>
                                                                                                                              </tr>
                                                                                                                      </table>
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="32" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
              
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                                              <tr>
                                                                                                                                      <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="40">
                                                                                                                                              <div class="img" style="font-size:0pt; line-height:0pt; text-align:left"><img src="images/ico2.jpg" border="0" width="27" height="27" alt="" /></div>
                                                                                                                                      </td>
                                                                                                                                      <td>
                                                                                                                                              <div class="text" style="color:#49555c; font-family:Arial,sans-serif; font-size:14px; line-height:20px; text-align:left">Djed lets family members share information and chat about it using<em>real-time chat</em>.</div>
                                                                                                                                      </td>
                                                                                                                              </tr>
                                                                                                                      </table>
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="32" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
              
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                                              <tr>
                                                                                                                                      <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="40">
                                                                                                                                              <div class="img" style="font-size:0pt; line-height:0pt; text-align:left"><img src="images/ico3.jpg" border="0" width="27" height="27" alt="" /></div>
                                                                                                                                      </td>
                                                                                                                                      <td>
                                                                                                                                              <div class="text" style="color:#49555c; font-family:Arial,sans-serif; font-size:14px; line-height:20px; text-align:left">It's easy to hide information (e.g. from kids or ) caregivers) by using our simple <em>privacy feature</em>.</div>
                                                                                                                                      </td>
                                                                                                                              </tr>
                                                                                                                      </table>
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="32" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
              
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                                              <tr>
                                                                                                                                      <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="40">
                                                                                                                                              <div class="img" style="font-size:0pt; line-height:0pt; text-align:left"><img src="images/ico4.jpg" border="0" width="27" height="27" alt="" /></div>
                                                                                                                                      </td>
                                                                                                                                      <td>
                                                                                                                                              <div class="text" style="color:#49555c; font-family:Arial,sans-serif; font-size:14px; line-height:20px; text-align:left">You can also connect to other families like grandparents and siblings. This is your <em>Tribe</em>.</div>
                                                                                                                                      </td>
                                                                                                                              </tr>
                                                                                                                      </table>
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="32" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
              
                                                                                                                      <div style="font-size:0pt; line-height:0pt; height:1px; background:#f1f1f1; "><img src="images/spacer.gif" width="1" height="1" style="height:1px" alt="" /></div>
              
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="32" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
              
              
                                                                                                                      <div class="text" style="color:#49555c; font-family:Arial,sans-serif; font-size:14px; line-height:20px; text-align:left">
                                                                                                                              We hope you enjoy! Check out our <strong>blog</strong> on Medium if you have a moment.
                                                                                                                              <br />
                                                                                                                              <br />
                                                                                                                              - the Djed Team
                                                                                                                      </div>
              
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="30" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
              
                                                                                                              </td>
                                                                                                              <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="34"></td>
                                                                                                      </tr>
                                                                                              </table>
                                                                                              <div style="font-size:0pt; line-height:0pt; height:2px; background:#0da5b5; "><img src="images/spacer.gif" width="1" height="2" style="height:2px" alt="" /></div>
              
                                                                                              <!-- END Main -->
                                                                                              <!-- Footer -->
                                                                                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                      <tr>
                                                                                                              <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="34"></td>
                                                                                                              <td>
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="20" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
              
                                                                                                                      <div class="img-center" style="font-size:0pt; line-height:0pt; text-align:center"><a href="#" target="_blank"><img src="images/footer_logo.jpg" border="0" width="40" height="40" alt="" /></a></div>
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="22" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
              
                                                                                                                      <div class="text-footer" style="color:#d5d5d5; font-family:Arial,sans-serif; font-size:10px; line-height:14px; text-align:center">
                                                                                                                              Made in small batches by <a href="#" target="_blank" class="link" style="color:#00b3c3; text-decoration:none"><span class="link" style="color:#00b3c3; text-decoration:none">Djed Studios LLC</span></a> | <a href="#" target="_blank" class="link" style="color:#00b3c3; text-decoration:none"><span class="link" style="color:#00b3c3; text-decoration:none">Blog</span></a>
                                                                                                                              <br />
                                                                                                                              <a href="#" target="_blank" class="link2" style="color:#d5d5d5; text-decoration:none"><span class="link2" style="color:#d5d5d5; text-decoration:none">115 E 5th Street, Austin TX 78701</span></a>
                                                                                                                              <br />
                                                                                                                              <br />
                                                                                                                              <a href="#" target="_blank" class="link" style="color:#00b3c3; text-decoration:none"><span class="link" style="color:#00b3c3; text-decoration:none">Unsubscribe</span></a>  from Djed emails
                                                                                                                      </div>
                                                                                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="40" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
              
                                                                                                              </td>
                                                                                                              <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="34"></td>
                                                                                                      </tr>
                                                                                              </table>
                                                                                              <!-- END Footer -->
                                                                                      </td>
                                                                              </tr>
                                                                      </table>
                                                              </td>
                                                              <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="10"></td>
                                                      </tr>
                                              </table>
                                      </td>
                              </tr>
                      </table>
              </body>
              </html>`, // html body
            });
            res.send("sucess");

          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports.notif = async (req, res) => {
    const {ID} = req.query;
    var Notifi = await Notif.find({userId: ID});

    if(Notifi){
           
           res.send(Notifi)
    } else {
        console.log('errnotif')
    }
   

};

module.exports.info = async (req, res) => {
 
const filter1 = {isOk: false}
const filter2 = {isOk: true}


  const userWait = await User.find(filter1);
  const userVal = await User.find(filter2); 

  res.json({userWait,userVal});




};
module.exports.delete = async (req, res) => {
 
  const {id} = req.body;
  const filter = {_id: id}
  const deleted = await User.deleteOne(filter);

  res.deletedCount;

  
  
  
  
  };

  module.exports.validate = async (req, res) => {
 
    const {ID} = req.query;
    const {Val} = req.query;
    const filter = {_id: ID}
    const update ={isOk: Val}
    console.log(ID,Val);
    const USer = await User.findOneAndUpdate(filter,update,{
      new: true
  });


const filter1 = {isOk: false}
const filter2 = {isOk: true}


  const userWait = await User.find(filter1);
  const userVal = await User.find(filter2); 

  res.json({userWait,userVal});
  };

  module.exports.userInfo = async (req, res) => {
 const {id}= req.body;
 const {info} = req.body;
  const Filter = {_id: id};
  const {username,nom,prenom,email,tel,ville,postalCode,numero,rue}= req.body;
const update = { username: username,
  nom: nom,
  prenom: prenom,
  email: email,
  tel: tel,
  adresse: {
    ville: ville,
    rue: rue,
    numero: numero,
    postalCode: postalCode,
  }}
  if(username === undefined){
    const USer = await User.findOne(Filter);
    res.send(USer);
    
  } else {
    const USer = await User.findOneAndUpdate(Filter,update,{
      new: true
  });
  res.send('updated');
  }

  };

  module.exports.info = async (req, res) => {
        const userWait = await User.find({isOk: false});
        const userVal = await User.find({isOk: true}); 
       res.json({userVal,userWait});
         };
module.exports.postimgAdmin = async (req,res) => {
        const {imgBig,imgSmall} = req.body;
        const filter = {username: "Admin"}
        const update = {imgBig: imgBig}
         await User.findOneAndUpdate(filter,update)
         const update2 = {imgSmall}
         await User.findOneAndUpdate(filter,update2)
}
module.exports.imgGet = async (req,res) => {
       const Admin =  await User.findOne({username: "Admin"})
       if(Admin.imgBig !== "" && Admin.imgSmall !== ""){
        res.json({imgBig: Admin.imgBig, imgSmall: Admin.imgSmall});
       } else {
               res.send('nothing');
       }
        
}