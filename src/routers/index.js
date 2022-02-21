const {db} = require("../firebase");
const {Router} = require('express')

const router = Router()
router.get('/', async (req, res) => {
    const querySnapshot = await db.collection('contactos').get()
    const contact = querySnapshot.docs.map(doc => ({
        // ALL FIELDS
        id: doc.id, ...doc.data()
    }))

    console.log(contact)
    /*EACH FIELD*/
    // id: doc.id,
    // name: doc.data().name,
    // lastName: doc.data().lastName,
    // phone: doc.data().phone,
    // email: doc.data().email,

    // console.log(contact)
    res.render('index', {contact})
})


router.post('/new-contact', async (req, res) => {
    // create new date or path
    const {name, lastName, email, phone} = req.body
    await db.collection('contactos').add({name, lastName, email, phone})
    res.redirect('/')
    // res.send('new contacto create')
})


router.get('/edit-contact/:id', async (req, res) => {
    const doc = await db.collection('contactos').doc(req.params.id).get()
    res.render('index', {contact: {id: doc.id, ...doc.data()}})

    //metodo para poder verlo el data completo y entendible, usamos .data()
    // console.log({id: doc.id, ...doc.data()})
    // res.send({id: doc.id, ...doc.data()})

})


router.get('/delete-contact/:id', async (req, res) => {
    await db.collection('contactos').doc(req.params.id).delete()
    res.redirect('/')
})


router.post('/update-contact/:id', async (req, res) => {
    // console.log(req.params.id)
    // console.log(req.body)

    await db.collection('contactos').doc(req.params.id).update(req.body)
    res.redirect('/')

})

module.exports = router