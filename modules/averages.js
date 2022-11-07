module.exports = function (entries, iterations) {
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
        output.deleteTime += entry.deleteTime
    }

    output.addTime = ~~((output.addTime / entries.length) )
    output.selectTime =  ~~((output.selectTime/ entries.length)  )
    output.editTime =  ~~((output.editTime/ entries.length) )
    output.deleteTime =  ~~((output.deleteTime/ entries.length)  )

    return output;
}