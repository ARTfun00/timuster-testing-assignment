import knex from 'knex';

const db = knex({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: './db.sqlite',
  },
});

const TABLES = {
  emails: 'emails'
}

export default class DB {
  static async addEmail(data) {
    // TO DO: add input validation + sanitization
    return db(TABLES.emails).insert(data);
  }
  static async getEmails(receiverEmail, searchText) {
    if (typeof receiverEmail !== "string" || !receiverEmail)
      throw new Error("receiverEmail is required")

    if (searchText && typeof searchText !== "string")
      throw new Error("SQL-injection attempt")

    if (!searchText) {
      return db(TABLES.emails)
        .select('*')
        .where('email_from', receiverEmail)
        .orWhere('email_to', receiverEmail)
    }

    const expression = `%${searchText}%`

    return db(TABLES.emails)
      .select('*')
      .where(function () {
        this.where('email_from', receiverEmail)
          .orWhere('email_to', receiverEmail);
      })
      .andWhere(function () {
        this.where('email_to', 'LIKE', expression)
          .orWhere('cc_emails', 'LIKE', expression)
          .orWhere('bcc_emails', 'LIKE', expression)
          .orWhere('subject', 'LIKE', expression)
          .orWhere('body', 'LIKE', expression);
      })
  }
}