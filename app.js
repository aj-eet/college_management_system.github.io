const express = require("express")
const app = express()
const path = require("path")

const ejsMate = require('ejs-mate');
const bodyparser = require('body-parser')
const Contact = require("./model/contactUs")
const Admin = require("./model/admin")
//mongoose
const mongoose = require('mongoose');
const Student = require("./model/student");
const Faculty = require("./model/faculty")
const Admission = require("./model/admission")
const methodOverride = require("method-override")
mongoose.connect('mongodb://127.0.0.1/cmsContact', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Connected successfully");
});

// //schema
// const contactUs = new mongoose.Schema({
//     name: String,
//     email: String,
//     number: String,
//     address: String,
//     message: String
// });

//compiling schema to model
// const Contact = mongoose.model('Contact', contactUs);


app.use(bodyparser.urlencoded({ extended: true }));
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride("_method"))

app.get("/", (req, res) => {
    res.render("index.ejs")
});
app.get("/department", (req, res) => {

    res.render("department.ejs");
});
app.get("/faculty", (req, res) => {
    res.render('faculty.ejs');
})
app.get("/contact", (req, res) => {
    res.render("contact.ejs")
})
app.get('/login', (req, res) => {
    res.render('login.ejs');
})

app.get('/admin', (req, res) => {
    res.render('admin.ejs');
})
app.get('/about', (req, res) => {
    res.render('about.ejs');
})
app.post("/login", async (req, res) => {
    // const data = await Admin.find({...req.body})
    // if(data){
    //     res.render('admin.ejs')
    // }else{
    //     res.send("Invaid Credential")
    // }
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Admin.findOne({ email });//fetching data from database
        const userPassword = await Admin.findOne({ password })//fetching data from database

        if ((userPassword) && (useremail)) {
            res.render('admin.ejs');

        } else {
            res.send('invalid credential')

        }
    } catch (error) {
        res.status(400).send('error');
    }

})

//we are using post request to avoid data appears
app.post('/contact', async (req, res) => {
    const data = new Contact(req.body);
    await data.save()
    res.redirect('/')
})

app.get("/addstudent", (req, res) => {
    res.render("addStudent.ejs")
})
app.post("/addstudent", async (req, res) => {
    const data = new Student({ ...req.body });
    await data.save()
    res.redirect('/admin')
})

app.get("/addfaculty", (req, res) => {
    res.render("addFaculty.ejs")
})
app.post("/addfaculty", async (req, res) => {
    const data = new Faculty({ ...req.body });
    await data.save()
    res.redirect('/admin')
})
app.get('/admission', (req, res) => {
    res.render('admission.ejs');
})

app.post("/admission", async (req, res) => {
    const data = new Admission({ ...req.body });
    await data.save();
   
    res.redirect('/admission')
})
app.get("/studentlist", async (req, res) => {
    const data = await Student.find()
    res.render("studentlist", { data })
})
app.delete("/studentlist/:id", async (req, res) => {
    const { id } = req.params;
    await Student.findByIdAndDelete(id)
    res.redirect("/studentlist")
})
app.delete("/facultylist/:id", async (req, res) => {
    const { id } = req.params;
    await Faculty.findByIdAndDelete(id)
    res.redirect("/facultylist")
})
app.get('/facultylist', async(req,res)=>{
    const data=await Faculty.find()
    res.render('facultylist', {data})
})
app.get('/admissionlist', async(req,res)=>{
    const data=await Admission.find()
    res.render('admissionlist', {data})
})

app.listen(2020, () => {
    console.log("Listening on port 2020")
})