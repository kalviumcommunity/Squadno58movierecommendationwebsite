const express = require("express");
const { moviesModel } = require("../Model/moviesModel.js");
const CRUD_routes = express.Router();

CRUD_routes.get("/", async (req, res) => {
  try {
    const movies = await moviesModel.find();
    // console.log(movies)
    res.json(movies);
  } catch (err) {
    console.log(err);
    res.send({ Error: err });
  }
});

CRUD_routes.post("/Create", async (req, res) => {
  const checkID = await moviesModel.findOne({
    ID: req.body.ID,
  });
  if (checkID) {
    return res.status(400).send("ID already exists");
  }
  const { ID, poster, movieName, ratings, rottenTomatoes, releaseYear, created_by } = req.body;
  let payload = { ID, poster, movieName, ratings, rottenTomatoes, releaseYear, created_by };

  console.log(payload);
  try {
    const result = await moviesModel.create(payload);
    res.send({ message: "movies created successfully", result });
  } catch (error) {
    res.send("Error " + error);
  }
});

CRUD_routes.put("/Update/:id", async (req, res) => {
  try {
    const frontEndID = req.params.id;
    const { poster,  movieName, ratings, rottenTomatoes, releaseYear, created_by } = req.body;

    // Check if the post with the given ID exists
    const existingPost = await moviesModel.findOne({ ID: frontEndID });
    if (!existingPost) {
      return res.status(400).send("Post with the provided ID does not exist");
    }

    // Update the post 
    const updatedPost = await moviesModel.findOneAndUpdate(
      { ID: frontEndID },
      { poster, movieName, ratings, rottenTomatoes, releaseYear, created_by},
      { new: true } // Return the updated document
    );

    if (!updatedPost) {
      return res.status(500).send("Failed to update post");
    }

    return res.json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).send("An error occurred while updating the post");
  }
});

CRUD_routes.delete("/Delete/:id", async (req, res) => {
  try {
    const frontEndID = req.params.id;

    // Check if the post with the given ID exists
    const existingPost = await moviesModel.findOne({ ID: frontEndID });
    if (!existingPost) {
      return res.status(404).send("Post with the provided ID does not exist");
    }

    // Delete the post
    const deletedPost = await moviesModel.findOneAndDelete({
      ID: frontEndID,
    });

    if (!deletedPost) {
      return res.status(500).send("Failed to delete post");
    }

    return res.json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).send("An error occurred while deleting the post");
  }
});

module.exports = CRUD_routes;