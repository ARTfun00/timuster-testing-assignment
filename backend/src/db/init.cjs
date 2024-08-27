const knex = require('knex')({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: './db.sqlite',
  },
});

/* Ideally, DS here should be a bit different. At least
2 tables: emails and recipients. Current variant breaks
first normalization form (1NF), but used for simplicity */
(async () => {
  // Create our table
  const initData = await knex.schema
    .createTable('emails', (table) => {
      table.increments('id');
      table.string('email_from');
      table.string('email_to');
      table.string('cc_emails'); // 
      table.string('bcc_emails');
      table.string('subject');
      table.string('body');
    })
  console.log('DB initialized:', initData)

  const testData = [
    {
      email_from: 'alex.dev@gmail.com',
      email_to: 'pochynok_ar@icloud.com',
      subject: 'Quick Check-In',
      body: `Hi there,
      Just wanted to check in and see how things are going. Let me know if you need anything.
      Best,
      Alex
    
      `,
      bcc_emails: '',
      cc_emails: '',
    },
    {
      email_from: 'bob.recruitment.agency@outlook.com',
      email_to: 'pochynok_ar@icloud.com',
      subject: 'Meeting Reminder',
      body: `Hello,
    This is a reminder for our meeting scheduled at 3 PM today. Looking forward to it!
    Thanks,
    Jamie`,
      bcc_emails: '',
      cc_emails: 'alex.dev@gmail.com zjxjdrsnh@emltmp.com',
    },
    {
      email_from: 'g4m9am7t@spymail.one',
      email_to: 'pochynok_ar@icloud.com',
      subject: 'New Project Proposal',
      body: `Hi Team,
    Attached is the proposal for the new project. Please review and share your feedback by end of day.
    Cheers,
    Taylor`,
      bcc_emails: 'alex.dev@gmail.com alex.dev22@gmail.com',
      cc_emails: 'zjxjdrsnh@emltmp.com',
    }
  ]

  const insertionData = await knex('emails').insert(testData);
  console.log(insertionData);
})()
