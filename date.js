module.exports.getDate = (locale) => {
    let date = new Date()
    const options = {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }
    let dayComplete = date.toLocaleDateString(locale, options)
    return dayComplete
}

module.exports.getDay = (locale) => {
    let date = new Date()
    let day = 0;
    const options = {
        weekday: 'long'
    }
    day = date.toLocaleDateString(locale, options)
    return day
}