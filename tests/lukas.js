console.log("Starting tests")

// Connect with PostgreSQL
var db = new Database("postgres", "postgres", "postgres", "localhost", 5432, "postgres")

// Create a table test
db.query("CREATE TABLE test (id SERIAL PRIMARY KEY, name VARCHAR(255))")

// Run a test with 1000 inserts
var start = new Date()
for (var i = 0; i < 1000; i++) {
    db.query("INSERT INTO test (name) VALUES ('test')")
}
var end = new Date()
console.log("1000 inserts took " + (end - start) + "ms")
