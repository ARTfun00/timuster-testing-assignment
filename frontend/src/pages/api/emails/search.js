// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const emails = [
  {
    emailFrom: "vadim.boom@gmail.com",
    email_to: "pochynok_ar@icloud.com",
    cc_emails: null,
    bcc_emails: null,
    subject: "Hello",
    body: "Welcome to iCloud Mail"
  },
  {
    emailFrom: "yaroslav.bidiuk@icloud.com",
    email_to: "pochynok_ar@icloud.com",
    cc_emails: null,
    bcc_emails: null,
    subject: "Test",
    body: "test"
  },
  {
    emailFrom: "magda.esotsm@gmail.com",
    email_to: "pochynok_ar@icloud.com",
    cc_emails: null,
    bcc_emails: null,
    subject: "Hi",
    body: "Hi Artur"
  }
]
export default function handler(req, res) {
  res.status(200).json(emails);
}
