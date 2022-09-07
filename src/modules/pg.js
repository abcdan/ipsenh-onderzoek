/**
 * All results of any test using this this project need to have a
 * backlink to this project.
 *
 * Copyright (c) abcdan - All rights reserved.
 */

 console.log('[TESTING] PostgreSQL'.blue)

 const PreciseTimer = require('precise-timer')
 const tests = require('../sql/tests')
 const settings = require('../sql/settings')
 
 const { Client } = require('pg')
 
 const client = new Client({
   user: 'postgres',
   host: 'localhost',
   database: 'test',
   password: 'testpassword',
   port: 55432
 })
 
 client.connect()
 
 var results = {
   create: -1,
   insert: -1,
   find: -1,
   update: -1,
   selectAll: -1,
   drop: -1,
   total: -1
 }
 
 var checkResults = {
   uniqueSuccess: false
 }
 
 // Create the test table
 const timer = new PreciseTimer({ decimals: 6 })
 client.query(tests.create_postgres, (err, res) => {
   if (err) console.error(err.name)
   results.create = timer.elapsed
 })
 
 // 100 times the same query
 for (let i = 0; i < settings.amount; i++) {
   client.query(tests.insert, (err, res) => {
     if (settings.errors) console.log(err)
     results.insert = timer.elapsed - results.create
   })
 }
 
 // Find one thing
 for (let i = 0; i < settings.amount; i++) {
   client.query(tests.findInject.replace('XXXID', i), (err, res) => {
     if (settings.errors) console.log(err)
     results.find = timer.elapsed - (results.insert + results.create)
   })
 }
 // update all
 for (let i = 0; i < settings.amount; i++) {
   client.query(tests.updateInject.replace('XXXID', i), (err, res) => {
     if (settings.errors) console.log(err)
     results.update = timer.elapsed - (results.insert + results.create + results.find)
   })
 }
 
 // Select all the data
 for (let i = 0; i < settings.amount; i++) {
   client.query(tests.selectAll, (err, res) => {
     if (settings.errors) console.log(err)
     results.selectAll = timer.elapsed - (results.insert + results.create + results.find + results.update)
   })
 }
 
 // Drop the table
 client.query(tests.drop, (err, res) => {
   if (settings.errors) console.log(err)
   results.drop = timer.elapsed - (results.selectAll + results.find + results.insert + results.create + results.update)
   console.log('[RESULTS] PostgreSQL'.green)
   results.total = timer.elapsed
 })
 
 // Unique Create
 client.query(tests.uniqueCreate_postgres, (err, res) => {
   if (err) console.error(err.name)
 })
 
 // Should succeed
 client.query(tests.uniqueInsert, (err, res) => {
   if (err) console.error(err.name)
 })
 
 // Should fail
 client.query(tests.uniqueInsert, (err, res) => {
   if (err) checkResults.uniqueSuccess = true
   console.table(calcResults())
   console.table(checkResults)
   client.end()
 })
 
 function calcResults () {
   return {
     create: results.create,
     insert: results.insert / settings.amount,
     find: results.find / settings.amount,
     update: results.update / settings.amount,
     selectAll: results.selectAll / settings.amount,
     drop: results.drop,
     total: results.total
   }
 }
 
 module.export = {
   results
 }