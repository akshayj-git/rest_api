const Post = require('../models/postModel');

exports.postData = (req, res, next) => {

  const name = req.body.name;
  const img = req.body.img;
  const summary = req.body.summary;

  const post = new Post({
    name: name,
    img: img,
    summary: summary,
  });

  post
    .save()
    .then(result => {
        //console.log(res);
        res.status(201).json({
            message : 'Post created sucessfully!',
            post: result,
        });
    })
    .catch(err => {
      if(!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAllData = (req, res, next) => {

  //const postId = req.params.postId;
  Post.find()
      .then(post => {
          if(!post) {
              const error = new Error("No post found");
              err.statusCode = 404;
              throw error;
          }
          res.status(200).json({ message: "Post found", post: post });
      })
      .catch(err => {
          if(!err.statusCode) {
              err.statusCode = 500;
          }
          next(err);
      });
};

exports.getOneData = (req, res, next) => {

  const id = req.params.id;

  Post.findById(id)
      .then(post => {
          if(!post) {
              const error = new Error("No post found");
              err.statusCode = 404;
              throw error;
          }
          res.status(200).json({ message: "Post found", post: post });
      })
      .catch(err => {
          if(!err.statusCode) {
              err.statusCode = 500;
          }
          next(err);
      });
};

exports.updateData = (req, res, next) => {

  const id = req.params.id;
  
  const name = req.body.name;
  const img = req.body.img;
  const summary = req.body.summary;

  Post.findById(id)
    .then(post => {
      if(!post) {
          const error = new Error("No post found");
          err.statusCode = 404;
          throw error;
      }

      post.name = name;
      post.img = img;
      post.summary = summary;
      return post.save();

    })
    .then(result => {
      res.status(200).json({ message: "Post updated", post: result });
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

};

exports.deleteData = (req, res, next) => {

  const id = req.params.id;

  Post.findById(id)
    .then(post => {
        if(!post) {
            const error = new Error("No post found");
            err.statusCode = 404;
            throw error;
        }

        return Post.findByIdAndRemove(id);
    })
    .then(result => {
      res.status(200).json({ message: "Post deleted", post: result });
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
    
};