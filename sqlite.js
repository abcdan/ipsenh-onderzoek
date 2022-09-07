// Example invoice object
const invoice = require('./json/invoice.json')
const invoice2 = require('./json/invoice2.json')
const json = JSON.stringify(invoice)
const PreciseTimer = require('precise-timer')

const knex = require('knex')({
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
        filename: "./db.sqlite"
    },
    useNullAsDefault: true
});


let timer = new PreciseTimer({decimals: 6})

function reset() {
    timer = new PreciseTimer({decimals: 6})
}

async function main() {
    reset();
    await knex.schema.dropTableIfExists('invoices')
    console.log('Drop', timer.elapsed)

    reset();
    await knex.schema
        .createTable("invoices", (table) => {
            table.increments()
            table.string("name")
            table.string("invoice")
            table.timestamp("time")
        })
    console.log('New table', timer.elapsed)


    for (let i = 0; i < 3; i++) {
        console.log('Iteration', i)
        console.log('Dropping all invoices')
        reset();
        await knex('invoices')
            .del().where('id', '!=', 'null')
        console.log('Dropped all invoices')
        console.log('Dropped all invoices in', timer.elapsed)


        for (let j = 0; j < 10000; j++) {
            await knex
                .insert(
                    [
                        {invoice: json},
                    ],
                    ['id']
                )
                .into('invoices')


        }
        console.log('Added 10k invoices in ', timer.elapsed)

        reset();
        const jemama_in_whales = await knex('invoices').select('*')
        console.log(`Selected ${jemama_in_whales.length/1000}k items in `, timer.elapsed)

        reset();
        for (let j = 0; j < jemama_in_whales.length; j++) {
            await knex('invoices').update({
                invoice: invoice2
            })
        }
        console.log(`Edited ${jemama_in_whales.length/1000}k items in `, timer.elapsed)

        reset();
        for (let j = 0; j < jemama_in_whales.length; j++) {
            await knex('invoices').del(jemama_in_whales[j])
        }
        console.log(`Deleted ${jemama_in_whales.length/1000}k items in `, timer.elapsed)

        console.log('\n')


    }

}

main().then(r => {
    console.log(r)
}).catch(e => {
    console.error(e)
})