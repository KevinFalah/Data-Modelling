const express = require('express')
const app = express()
const port = 8000

app.set('view engine', 'hbs')
app.use('/assets', express.static(__dirname + '/assets'))
app.use(express.urlencoded({extended: false}))
const db = require('./connection/db')

let isLogin = true;
let isTrue = true;


app.get('/', (req, res) => { 
  
  db.connect((err, client, done) => {
    if(err) throw err

    client.query('SELECT * FROM public.tb_projects', (err, result) => {
      if(err) throw err

      console.table(result.rows);
      let dataResult = result.rows

      let dataMapping = dataResult.map((res) => {
        return {
          ...res,
          duration: getTime(res.start_date, res.end_date),
        }
      })

      res.render('index', {dataResult : dataMapping, isTrue})
    })
  })

})

// Contact
app.get('/contact', (req, res) => {
  res.render('contact')
})

// Project
app.get('/project', (req, res) => {
  res.render('project')
})


app.post('/project', (req, res) => {
})

// Delete
app.get('/delete-project/:id', (req, res) => {
})


// Edit 
app.get('/edit-project/:id', (req, res) => {
})

app.post('/edit-project/:id', (req, res) => {
})


// Detail
app.get('/detail/:id', (req, res) => { 
    res.render('detail')
})


// Function GetTime
const getTime = (start,end) => {

  let date1 = new Date(start)
  let date2 = new Date(end)
  let time = Math.abs(date2 - date1)
  let days = Math.floor(time / (1000 * 60 * 60 * 24))

  return `${days} hari`
  
}


app.listen(port, () => {
  console.log(`Server Running on Port ${port}`)
})
