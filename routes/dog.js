const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

// Route to view and get all the dogs in adoption

router.get("/", async (req, res) => {
  try {
    const dogs = await prisma.dog.findMany();
    res.render("dogs", { dogs: dogs, user: req.user });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

//Route to view the details from one dog

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dogById = await prisma.dog.findUnique({
      where: {
        id,
      },
    });
    res.render("singleDog", {
      dog: dogById,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

//Route to delete the dog from the data base

router.delete("/delete/:id", async (req, res) => {
  try {
    await prisma.dog.delete({
      where: { id: req.params.id },
    });
    res.redirect("/dog");
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

module.exports = router;
