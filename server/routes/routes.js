const path          = require('path')
const VisitSchema   = require('../models/visit.model')

module.exports = (app) => {
    app.get('/', (req, res) => {
        // console.log("parent: ", path.resolve(__dirname, "../.."))
        res.sendFile(path.join(path.resolve(__dirname, "../..") + '/client/build/index.html'))
    })

    app.get('/api/getVisitList', (req, res) => {
        console.log("Getting list of website")

        VisitSchema.find({}, (err, visits) => {
            if(err) {
                console.log(err)
            }
            res.json(visits)
            console.log(visits)
        })
    })

    app.post('/api/addVisit', (req, res) => {
        let websiteId = req.body.websiteId

        console.log("Website id: ", websiteId)

        VisitSchema.updateOne({_id: websiteId},
            {
                $inc: {visit: 1}
            }, 
            (err, raw) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log("Update successfully")
                }
                res.json("Success")
            }
        )
    })
}