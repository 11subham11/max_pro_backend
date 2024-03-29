module.exports = {
  confirm: (id) => ({
    subject: "Confirm Email",
    html: `
        <a href='/'>
          click to confirm email
        </a>
      `,
    text: `Copy and paste this link: https://...............`,
  }),
  contact: (data) => ({
    subject: "Contact Information",
    html: `
        <div>
        <p>Name: ${data.name}</p>
        <p>email: ${data.email}</p>
        <p>subject: ${data.subject}</p>
        <p>message: ${data.message}</p>
        </div>
      `,
    text: `hello`,
  }),
  login: (data) => ({
    subject: "Login Information",
    html: `
        <div>
        <p>Name: ${data.name}</p>
        <p>email: ${data.email}</p>
        <p>Has Logged into the website at ${data.date}</p>
        </div>
      `,
    text: `hello`,
  }),
};
