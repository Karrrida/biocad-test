import {Router} from 'express';

const router = Router();

router.get("/items", (req, res) => {
    console.info("items")
    res.send("items")
});

router.post('/auth/register', (req, res) => {
    console.info("register")
    res.send("register")
});

router.post('/auth/login', (req, res) => {
    console.info("login")
});

router.post('/items', (req, res) => {
    console.info("create")
});

router.post('/items/:id', (req, res) => {
    console.info("update")
});

router.delete('/items/:id', (req, res) => {
    console.info("delete")
});

export default router;