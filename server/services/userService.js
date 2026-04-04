const Client = require("../models/clientModel");
const Admin = require("../models/adminModel");
const Master = require("../models/masterModel");
const SetUpError = require("../utils/errorConfig");

class UserService {
  // get model by the type (very handy thing)
  static getModelByType(userType) {
    switch (userType) {
      case "client":
        return Client;
      case "admin":
        return Admin;
      case "master":
        return Master;
      default:
        throw new SetUpError(`Invalid user type: ${userType}`, 400);
    }
  }

  // find user by email across all the models
  static async findByEmail(email) {
    let user = await Client.findOne({ email }).select("+password");
    if (user) return { user, userType: "client" };

    user = await Admin.findOne({ email }).select("+password");
    if (user) return { user, userType: "admin" };

    user = await Master.findOne({ email }).select("+password");
    if (user) return { user, userType: "master" };

    return null;
  }

  // find by id
  static async findById(id, userType) {
    const Model = this.getModelByType(userType);
    return await Model.findById(id);
  }

  // create new user based on the type
  static async createUser(userData, userType) {
    const Model = this.getModelByType(userType);
    return await Model.create(userData);
  }

  // update user by id and type
  static async updateById(id, userType, updateData) {
    const Model = this.getModelByType(userType);
    return await Model.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  // delete user by id and type
  static async deleteById(id, userType) {
    const Model = this.getModelByType(userType);
    return await Model.findByIdAndDelete(id);
  }

  // check for the email in any models
  static async emailExists(email, excludeId = null) {
    const collections = [Client, Admin, Master];

    for (const Model of collections) {
      const query = excludeId ? { email, _id: { $ne: excludeId } } : { email };

      const user = await Model.findOne(query);
      if (user) return true;
    }

    return false;
  }

  // get all users of a specific type with pagination
  static async getUsersByType(userType, page = 1, limit = 10) {
    const Model = this.getModelByType(userType);
    const skip = (page - 1) * limit;

    const users = await Model.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Model.countDocuments();

    return {
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    };
  }

  // search users across all collection
  static async searchUsers(
    searchTerm,
    userTypes = ["client", "admin", "master"]
  ) {
    const results = [];

    const searchQuery = {
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ],
    };

    if (userTypes.includes("client")) {
      const clients = await Client.find(searchQuery);
      results.push(
        ...clients.map((user) => ({ ...user.toObject(), userType: "client" }))
      );
    }

    if (userTypes.includes("admin")) {
      const admins = await Admin.find(searchQuery);
      results.push(
        ...admins.map((user) => ({ ...user.toObject(), userType: "admin" }))
      );
    }

    if (userTypes.includes("master")) {
      const masters = await Master.find(searchQuery);
      results.push(
        ...masters.map((user) => ({ ...user.toObject(), userType: "master" }))
      );
    }

    return results;
  }

  // get statistics
  static async getUserStats() {
    const clientCount = await Client.countDocuments();
    const adminCount = await Admin.countDocuments();
    const masterCount = await Master.countDocuments();

    return {
      clients: clientCount,
      admins: adminCount,
      masters: masterCount,
      total: clientCount + adminCount + masterCount,
    };
  }

  // validate permissions
  // static validateUserPermissions(user, requiredPermissions = []) {
  //   if (user.userType === "admin") {
  //     if (requiredPermissions.length > 0) {
  //       return requiredPermissions.every(permission =>
  //         user.permissions && user.permissions[permission] === true
  //       );
  //     }
  //     return true;
  //   }

  //   if (user.userType === "master") {
  //     return ["manageOwnProfile", "manageAppointments"].some(p =>
  //       requiredPermissions.includes(p)
  //     );
  //   }

  //   if (user.userType === "client") {
  //     return ["manageOwnProfile", "createAppointments"].some(p =>
  //       requiredPermissions.includes(p)
  //     );
  //   }

  //   return false;
  // }
}

module.exports = UserService;
