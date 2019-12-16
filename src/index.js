const { GraphQLServer } = require('graphql-yoga')

//NOTE typeDefs-type definitions from app schema
//NOTE resolvers-js obj that mirrors the Query, Mutation and Subscription types and their fields from your application schema
//NOTE context-obj that gets passed through the resolver chain and every resolver can read from or write to

 
 
const links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }
];

let idCount = links.length;
//implementtion of GQL schema
//NOTE resolver has to be named after the corresponding field from schema def
 

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: () => link
  },
  Mutation: {
    post: (parent, args) => { 
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const link = {
        id: args.id,
        description: args.description,
        url: args.url
      }; 
      links.map(item => item.id === args.id ? link : item); 
      return  link 
    },
    deleteLink: (parent, args) => { 
      return  links.filter(item => item.id !== args.id); 
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`))