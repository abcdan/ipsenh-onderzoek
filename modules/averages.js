module.exports = function (entries) {

    const output = {
        iteration: 'Average',
        addTime: 0,
        selectTime: 0,
        editTime: 0,
        deleteTime: 0,
    }

    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        output.addTime += entry.addTime
        output.selectTime += entry.selectTime
        output.editTime += entry.editTime
        output.deleteTime += entry.addTime
    }

    output.addTime =`${~~(output.addTime / entries.length)}ms`
    output.selectTime = `${~~(output.selectTime / entries.length)}ms`
    output.editTime = `${~~(output.editTime / entries.length)}ms`
    output.deleteTime = `${~~(output.deleteTime / entries.length)}ms`

    return output;
}