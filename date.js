module.exports.getDate = () => {
    let date = new Date()
    const options = {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }
    let dayComplete = day.toLocaleDateString("en-us", options)
    return dayComplete
}

module.exports.getDay = () => {
    let date = new Date()
    let day = 0;
    const options = {
        weekday: 'long'
    }
    day = date.toLocaleDateString("en-us", options)
    return day
}