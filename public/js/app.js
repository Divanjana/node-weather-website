// console.log("THIS IS CONSOLE");
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const para1 = document.querySelector('#msg1')
const para2 = document.querySelector('#msg2')


para1.textContent = "Loading......."

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(`/weather?address=${search.value}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                para1.textContent = data.error
            }else{
                para1.textContent = data.location
                para2.textContent = "Wind is " + data.forecast.wind + " " + "and Temperture is "+ data.forecast.temp + " Therefore Weather possibility is " + data.forecast.wdes;
            }
        })
    })
})

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log("DATA: " +"WIND is " + data.forecast.wind + " " + "TEMP is "+ data.forecast.temp + " ------> Weather possibility : " + data.forecast.wdes);
//         }
//     })
// })

