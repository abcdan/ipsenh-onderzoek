
// Example invoice object
const invoice = require('./json/invoice.json')
const json = JSON.stringify(invoice)

const knex = require('knex')({
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
        filename: "./db.sqlite"
    },
    useNullAsDefault: true
});


async function main() {
    // Make table
    await knex.schema
        .createTable("invoices", (table) => {
            table.increments()
            table.string("name")
            table.string("invoice")
            table.timestamp("time")
        })


    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 10000; j++) {
            await knex
                .insert(
                    [
                        { invoice: json },
                    ],
                    ['id']
                )
                .into('invoices')


        }
    }

}

main().then(r => {
    console.log(r)
}).catch(e=> {
  console.error(e)
})