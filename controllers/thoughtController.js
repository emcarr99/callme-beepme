const { User, Thought } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      // list of all users
      const allUsers = users;

      res.json(allUsers);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // single user and include their friends and thoughts
  async getSingleUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId }) 
        .select("-__v") 
        .populate("friends")
        .populate("thoughts");

      // if user can't be found by search id
      if (!userData) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      // format the user data as JSON
      res.json(userData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      // new user data in JSON format
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a user by id with the $set property
  async updateUser(req, res) {
    try {
      const updateUserData = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true } 
      );
      // if user can't be found to update
      if (!updateUserData) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(updateUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // find user and their thoughts by id to delete them
  async deleteUser(req, res) {
    try {
      const deleteUser = await User.findOneAndDelete({
        _id: req.params.userId,
      }).select("+thoughts");

      if (!deleteUser) {
        return res.status(404).json({ message: "No such user exists" });
      }
      // from user id - delete that user's thoughts
      await Thought.deleteMany({ _id: { $in: deleteUser.thoughts } });

      res.json({ message: "User and their thoughts successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const newFriend = await User.findOneAndUpdate(
        
        { _id: req.params.userId }, 
        { $addToSet: { friends: req.params.friendId } }, 
        { new: true } 
      );
    
      if (!newFriend) {
        return res
          .status(404)
          .json({ message: "Unable to add friend to User with that ID." });
      }
     
      res.json(newFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const deleteFriend = await User.findOneAndUpdate(
        
        { _id: req.params.userId }, 
        { $pull: { friends: req.params.friendId } }, 
        { new: true } 
      );

      if (!deleteFriend) {
        return res
          .status(404)
          .json({ message: "Unable to remove friend from User with that ID" });
      }

      res.json({ message: "Successfully deleted friend" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};