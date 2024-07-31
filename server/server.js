const fs = require('fs');
const fastify = require('fastify')({ logger: false });
fastify.register(require('fastify-cors'), {});
const fastifyPlugin = require('fastify-plugin')
const database = require('./database');
const db = new database(name_db="db");

fastify.post('/addNewUser', async (request, reply) => {
  const payload = request.body;

  db.addUser(payload)
  reply.send(JSON.stringify(payload))
  return { receivedData: payload };
});


fastify.post('/updateRole', async (request, reply) => {
  const payload = request.body;

  db.addUser(payload)
  reply.send(JSON.stringify(payload))
  return { receivedData: payload };
});




const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
