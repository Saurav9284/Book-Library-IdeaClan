const {createBook, updateBook, deleteBook, getAllBooks, getSingleBook} = require("../controllers/book.controllers");
const { RegisterUser, LoginUser, passwordChange, DeleteUser, getUserProfile, getAllUser, Borrowbook } = require("../controllers/user.controllers");
const authorization = require("../middleware/authorization.middleware");

const resolvers = {
    Query: {
        users: async () => {return await getAllUser()},
        user: async (_, {id}) => {return await getUserProfile(id)},

        books: async () => {return await getAllBooks()},
        book: async (_, {id}) => {return await getSingleBook(id) },
    },
    Mutation: {
        createUser: async (_, {email,name, password,role}) => {return await RegisterUser({email,name, password,role})},
        loginUser: async (_, {email, password})=> {return await LoginUser({email,password})},
        passwordChange: async (_, {id, oldPassword, newPassword}) => {return await passwordChange({id, oldPassword, newPassword})},
        deleteUser: async (_, {id}) => {return await DeleteUser(id)},
        Borrowbook: async (_, {userId, bookId}, context) => {
          if(context.user){
            return await Borrowbook({userId, bookId})
          }
        },
      
        createBook: async (_, {title, author, genre , price}, context) => {
          if(!authorization(context, "Admin")){
            return await createBook({title, author, genre , price})
          }
        }, 
        updateBook: async (_, {id, title, author, genre , price}, context) => {
          if(!authorization(context, "Admin")){
            return await updateBook({id, title, author, genre , price})
          }
        }, 
        deleteBook: async (_, {id}, context) => {
          if(!authorization(context, "Admin")){
            return await deleteBook(id)
          }
        }
      }      
};

module.exports = resolvers;