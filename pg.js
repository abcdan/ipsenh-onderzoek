// Example invoice object
const invoice = require("./json/invoice.json");
const invoice2 = require("./json/invoice2.json");
const json = JSON.stringify(invoice);
const json2 = JSON.stringify(invoice2)
const PreciseTimer = require("precise-timer");
const Entry  = require("./modules/entry");
const cliProgress = require('cli-progress');
const averages = require("./modules/averages");




async function pg_test(TOTAL_ROUNDS = 10, ITERATIONS = 100) {

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
bar1.start(TOTAL_ROUNDS, 0);

const stats = [];

const knex = require("knex")({
  client: "pg", // or 'better-sqlite3'
  connection: {
    host : 'localhost',
    port : 5432,
    user : 'postgres',
    // password : 'hemiron_security',
    database : 'postgres',
    charset  : 'utf8'
  }
});

let timer = new PreciseTimer({ decimals: 0 });

function reset() {
  timer = new PreciseTimer({ decimals: 0 });
}



  reset();
  if(knex.schema.hasTable("invoices")) {
    await knex.schema.dropTableIfExists("invoices");

  }

  reset();
  await knex.schema.createTable("invoices", (table) => {
    table.increments();
    table.string("name");
    table.json("invoice");
    table.timestamps();
  });

  for (let i = 0; i < TOTAL_ROUNDS; i++) {
    bar1.update(i);
    // await knex("invoices").del().where("id", "!=", "null");

    for (let j = 0; j < ITERATIONS; j++) {
      await knex.insert([{ invoice: json }], ["id"]).into("invoices");
    }

    const INSERT_TIME = timer.elapsed; reset()

    const fetched_invoices = await knex("invoices").select("*");
    const SELECT_TIME = timer.elapsed; reset()

    for (let j = 0; j < fetched_invoices.length; j++) {
      await knex("invoices").where({id: fetched_invoices[j].id}).update({
        invoice: json2,
      }, ['id', 'invoice']);
    }

    const EDIT_TIME = timer.elapsed; reset()

    for (let j = 0; j < fetched_invoices.length; j++) {
      await knex("invoices").del(fetched_invoices[j].id);
    }

    const DELETE_TIME = timer.elapsed;

    stats.push(new Entry(i+1, INSERT_TIME, SELECT_TIME, EDIT_TIME, DELETE_TIME))
  }

  const avg = averages(stats)
  stats.push(new Entry('------','------','------','------','------'))
  stats.push(avg)
  console.log('\n')
  console.table(stats)
  process.exit();

}

module.exports = {
  pg_test 
}