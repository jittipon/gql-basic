const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        name:String
        age:Int
        position:String
    }
    type Query {
        users:[User]
    }
    type Mutation {
        addUser(name:String,age:Int,position:String):User,
        deleteUser(name:String):User,
        updateUser(name:String,age:Int,position:String,newname:String):User
    }
`

let users = [
    {
        name: "Tay",
        age: 25,
        position: "Frontend Engineer"
    },
    {
        name: "Aor",
        age: 22,
        position: "Backend Engineer"
    },
    {
        name: "Prae",
        age: 19,
        position: "Fullstack Engineer"
    },

]


const resolvers = {
    Query: {
        users: () => users
    },
    Mutation: {
        addUser: (parent,args) => {
            const newUser = {
                name: args.name,
                age: args.age,
                position: args.position
            }
            users.push(newUser)
            return newUser
        },
        deleteUser: (parent,args) => {
            const user = users.find(user => user.name === args.name)
            users = users.filter(user => user.name !== args.name)
            return user.name
        },
        updateUser: (parent,args) => {
            const user = users.find(user => user.name === args.name)
            
            if(user==undefined){
                throw new Error("User not found");
            }
            
            user.name = args.name
            user.age = args.age
            user.position = args.position
            user.name = args.newname
            return user
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
