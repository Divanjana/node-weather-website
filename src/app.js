const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

// console.log(__dirname)
// console.log(__filename)

const partialPath = path.join(__dirname, '../template/partials')
const viewpath = path.join(__dirname, '../template/views')
const publicDirectoryPath = path.join(__dirname, '../public')

hbs.registerPartials(partialPath)
app.set('views', viewpath);
app.set('view engine', 'hbs')

app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title:"Weather",
        name: "Ishanka Divanjana"
    }) 
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        name: 'ishanka Divanjana'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: "About Page",
        name: 'ishanka Divanjana'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Please eneter your Location'
        })
    }

    geocode(req.query.address, (error,{latit,longti,location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latit,longti,(error,forecast) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecast,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title:'404',
        name: 'Ishanka Divanjana',
        errormsg:"Help artical can't find"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ishanka Divanjana',
        errormsg: 'Page not found'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port: 3000.')
})