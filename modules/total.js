module.exports = function (entries) {


    let total = 0;

    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        total += entry.addTime
        total += entry.selectTime
        total += entry.editTime
        total += entry.addTime

    }

    total = total / 1000;

    return `${total}s`;
}