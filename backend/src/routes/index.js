import DB from '../db/index.js'

export default async function routes(fastify, options) {
  fastify.get('/emails/search', async (request, reply) => {
    try {
      if (request.method === 'GET') {
        // Extraction
        // It's better to use Middleware for headers parsing      
        const authHeader = request.headers['authorization'];
        if (authHeader) {
          const token = authHeader.split(' ')[1];

          if (token) {
            // Lookup and validity check
            // Auth checks
            // User data extraction
            const userEmail = token;

            const searchText = request.query.text
            request.log.info({ searchText });

            const data = await DB.getEmails(userEmail, searchText);

            reply.status(200).send({ code: 200, data });
          } else {
            reply.status(401).send({ message: 'Token missing' });
          }
        } else {
          reply.status(401).send({ message: 'Authorization header missing' });
        }
      } else {
        reply.status(405).send({ message: 'Method not allowed' });
      }
    } catch (error) {
      request.log.error(error);

      reply.status(500).send({ message: 'Error while saving email' });
    }
  });
  fastify.post('/emails/new', async (request, reply) => {
    try {
      if (request.method === 'POST') {
        // Extraction
        // It's better to use Middleware for headers parsing      
        const authHeader = request.headers['authorization'];
        if (authHeader) {
          const token = authHeader.split(' ')[1];

          if (token) {
            // Lookup and validity check
            // Auth checks
            // User data extraction
            const userEmail = token;

            // Request data parsing and validation should be here
            const requestData = request.body;
            const {
              bcc_emails,
              body,
              cc_emails,
              email_to,
              subject
            } = requestData || {};
            const dataToSave = {
              email_from: userEmail,
              email_to,
              subject,
              body,
              bcc_emails,
              cc_emails
            };
            request.log.info({ requestData: dataToSave });

            const newRecordIds = await DB.addEmail(dataToSave);
            const lastSavedRecordId = newRecordIds.pop() || null;

            reply.status(200).send({ code: 200, message: 'Message successfully sent', data: lastSavedRecordId });
          } else {
            reply.status(401).send({ message: 'Token missing' });
          }
        } else {
          reply.status(401).send({ message: 'Authorization header missing' });
        }
      } else {
        reply.status(405).send({ message: 'Method not allowed' });
      }
    } catch (error) {
      request.log.error(error);

      reply.status(500).send({ message: 'Error while saving email' });
    }
  });
}
