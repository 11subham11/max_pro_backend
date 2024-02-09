const { Contacts } = require("../models");
const templates = require("../email/email.template");
const sendEmail = require("../email/email.send");

const PostContact = async (req, res) => {
  try {
    const data = req.body;
    const contact = await Contacts.create(data);
    if (contact) {
      await sendEmail("subhammishra133@gmail.com", templates.contact(data));
      await sendEmail("ajaybohora2015@yahoo.com", templates.contact(data));
      await sendEmail("support@maxprocomputer.com", templates.contact(data));
      console.log("Email Sent");
      res.json({ message: "Thanks For Contacting" });
    } else {
      res.json({ error: "error" });
    }
  } catch (err) {
    console.log(err);
  }
};
const GetContact = async (req, res) => {
  try {
    const contact = await Contacts.findAll();
    if (contact) {
      res.json(contact);
    } else {
      res.json({ error: "error" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { PostContact, GetContact };
