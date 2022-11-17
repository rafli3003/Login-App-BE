// const { defaultLimit } = require("../helper/common");
const { responseSuccess, responseError } = require("../helper/response");
const db = require("../repository/models");
const UserService = require("../service/UserService");
const {
  // validateGet,
  // validateUpdateUser,
  validateAddUser,
} = require("../validation/UserValidation");

userService = new UserService(db);
module.exports = {
  // get : async (req, res) => {
  //   try {
  //     const data = validateGet(req.query);
  //     data.limit = data.limit ? data.limit : defaultLimit
  //     data.page  = data.page ? data.page : 1
  //     const getUsers = await userService.getList(data)
  //     return responseSuccess(res, getUsers);
  //   } catch (err) {
  //     return responseError(res, err);
  //   }
  // },

  create: async (req, res) => {
    try {
      const data = validateAddUser(req.body);
      data.status = !data.status ? 0 : 1;
      const addUser = await userService.create({
        ...data,
        created_by: req.userId,
      });
      return responseSuccess(res, {
        ...addUser,
        message: "User has been created",
      });
    } catch (e) {
      return responseError(res, e);
    }
  },

  // getDetail : async (req, res) => {
  //   try {
  //     const id = req.params.id
  //     if (isNaN(id)){
  //       throw{
  //         type: 'VALIDATION_ERROR',
  //         message: 'ID should be an integer',
  //       }
  //     }
  //     const detail = await userService.getDetail(id)
  //     return responseSuccess(res, detail)
  //   } catch (e) {
  //     return responseError(res, e);

  //   }
  // },

  // update : async (req, res) => {
  //   try {
  //     const data  = validateUpdateUser({...req.body, id:req.params.id})
  //     data.status = !data.status ? 0 : 1
  //     const id = data.id
  //     delete data.id
  //     const upd = await userService.update({
  //       ...data,
  //       updated_by: req.userId
  //     }, id)
  //     delete data.password
  //     return responseSuccess(res, data)
  //   } catch (e) {
  //     return responseError(res, e);
  //   }
  // },

  // delete : async (req, res) => {
  //   try {
  //     const id = req.params.id
  //     if (isNaN(id)){
  //       throw{
  //         type: 'VALIDATION_ERROR',
  //         message: 'ID should be an integer',
  //       }
  //     }
  //     const del = await userService.delete(id)
  //     return responseSuccess(res, del)
  //   } catch (e) {
  //     return responseError(res, e);
  //   }
  // },
};
