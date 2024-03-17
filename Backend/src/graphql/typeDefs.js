const typeDefs = `
type User {
    id: ID!
    email: String!
    name: String
    password: String
    role: String!
    books: [Book] 
    accessToken: String
}

type Book {
    id: ID!
    title: String!
    author: String!
    genre: String!
    price: Float! 
}

type Query {
    users: [User]
    user(id: ID!): User

    books: [Book] 
    book(id: ID!): Book 
}

type Mutation {
    createUser(email: String!, name: String!, password: String!, role: String!): User
    loginUser(email: String!, password: String!): User
    passwordChange(id: ID!, oldPassword: String, newPassword: String): User
    deleteUser(id: ID!): User
    Borrowbook(userId: ID!, bookId : ID!): User

    createBook(title: String!, author: String!, genre: String!, price: Float!): Book 
    updateBook(id: ID!, title: String!, author: String!, genre: String!, price: Float!): Book
    deleteBook(id: ID!): Book
}`;

module.exports = typeDefs;
