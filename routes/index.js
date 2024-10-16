const express = require('express');
const router = express.Router();

let students = [];
let groups = ['Group A', 'Group B', 'Group C'];

router.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About the Project',
        developer: 'Your Name',
        description: 'This is a simple student-group management app.'
    });
});

router.get('/students', (req, res) => {
    let groupedStudents = students.reduce((acc, student) => {
        if (!acc[student.group]) acc[student.group] = [];
        acc[student.group].push(student);
        return acc;
    }, {});

    res.render('students', { title: 'Student List', groups: groupedStudents });
});

router.get('/add-student', (req, res) => {
    res.render('add-student', { title: 'Add Student', groups });
});

router.post('/add-student', (req, res) => {
    const { name, group } = req.body;
    if (name && group) students.push({ name, group });
    res.redirect('/students');
});

router.get('/groups', (req, res) => {
    res.render('groups', { title: 'Group List', groups });
});

router.get('/add-group', (req, res) => {
    res.render('add-group', { title: 'Add Group' });
});

router.post('/add-group', (req, res) => {
    const { name } = req.body;
    if (name) groups.push(name);
    res.redirect('/groups');
});

module.exports = router;

