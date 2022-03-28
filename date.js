module.exports.getDate = () => {
    let day = new Date()
    const options = {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }
    day = day.toLocaleDateString("en-us", options)
    return day
}