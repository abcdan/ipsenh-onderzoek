# Eisen peformance
* Alle databases moeten draaien in een Docker component dat gemaakt is met dezelfde onderliggende besturingssystemen, om het consistent te houden kiezen we voor officiele alpine compose files
* Alle databases moeten de laatst beschikbare versie gebruiken op het moment van testen om versie biasses te voorkomen.

Er moet gekeken naar de volgende dingen:
* **Hoe snel iets in de database ge-insert kan worden**
  * Dit moet voor de volgende datatypes gebeuren
    * Strings
    * Integers
    * Objects (JSON)
    * Files
  * Voor alle datatypes moet dit voor verschillende groten gebeuren, met elke keer een verdubbeling van 10. Dus 1MB, 10MB, 100MB, 1000MB,
  * Dit moet verschillende hoeveelheden gemeten worden, 1 insert, 100 inserts, 10000 inserts, 1000000 inserts.
* **Hoe snel iets uit de database verwijderd kan worden**
  * Dit moet voor de volgende datatypes gebeuren
    * Strings
    * Integers
    * Objects (JSON)
    * Files
  * Voor alle datatypes moet dit voor verschillende groten gebeuren, met elke keer een verdubbeling van 10. Dus 1MB, 10MB, 100MB, 1000MB,
  * Dit moet verschillende hoeveelheden gemeten worden, 1 deletion, 100 deletions, 10000 deletions, 1000000 deletions.
* **Hoe snel iets in de database bewerkt kan worden**
  * Dit moet voor de volgende datatypes gebeuren
    * Strings
    * Integers
    * Objects (JSON)
    * Files
  * Voor alle datatypes moet dit voor verschillende groten gebeuren, met elke keer een verdubbeling van 10. Dus 1MB, 10MB, 100MB, 1000MB,
  * Dit moet verschillende hoeveelheden gemeten worden, 1 edits, 100 edits, 10000 edits, 1000000 edits.
* **Hoe snel iets opgehaald kan worden uit de database**
  * Dit moet voor de volgende datatypes gebeuren
    * Strings
    * Integers
    * Objects (JSON)
    * Files
  * Voor alle datatypes moet dit voor verschillende groten gebeuren, met elke keer een verdubbeling van 10. Dus 1MB, 10MB, 100MB, 1000MB,
  * Dit moet verschillende hoeveelheden gemeten worden, 1 edits, 100 edits, 10000 edits, 1000000 edits.

## Eisen voor alle tests
Dit moet getest worden met een lege database, helemaal niks er in.
* Dit moet getest worden met een volle database, hier moeten er 1 miljoen items in de database zitten per type.
* Dit moet getest worden met een lage server load, 0-1% max.
* Dit moet getest worden met een gemiddelde server load van 50%
* Dit moet getest worden met een hoge server load van 99-100%.