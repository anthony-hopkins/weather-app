console.log('Client-side javascript has been loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    // Prevents the default behavior of submit which is to refresh the browser. This allows us to run our jvascript
    // without refreshing the page afterwards.
    e.preventDefault()

    // Store the user provided location
    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        
        response.json().then((data) => {
            if (data.error) {
                document.getElementById('error-text').innerText = data.error
            } else {
                document.getElementById('error-text').innerText = ''
                console.log(data)
                // Reference our weather table and create a new empty row
                var table = document.querySelector('#weatherTable')
                var row = table.insertRow(1)
                // Create 6 new emppty cells
                var cell0 = row.insertCell(0)
                var cell1 = row.insertCell(1)
                var cell2 = row.insertCell(2)
                var cell3 = row.insertCell(3)
                var cell4 = row.insertCell(4)
                var cell5 = row.insertCell(5)
                // Inset weather data into new cells
                cell0.innerHTML = data.location
                cell1.innerHTML = data.forecast.summary
                cell2.innerHTML = data.forecast.currentTemp
                cell3.innerHTML = data.forecast.feelsLike
                cell4.innerHTML = data.forecast.chanceOfRain
                cell5.innerHTML = data.forecast.windSpeed
            }
        })
    }) 
})