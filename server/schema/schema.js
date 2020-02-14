const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;


//dummy data
var books = [
	{name: 'Book A', id: '1', genre: 'Fantasy', authorId: '1'},
	{name: 'Book B', id: '2', genre: 'Fantasy', authorId: '2'},
	{name: 'Book C', id: '3', genre: 'Sci-Fi', authorId: '3'},
	{name: 'Book D', id: '4', genre: 'Sci-Fi', authorId: '2'},
	{name: 'Book E', id: '5', genre: 'Sci-Fi', authorId: '3'},
	{name: 'Book F', id: '6', genre: 'Sci-Fi', authorId: '3'}
];

var authors = [
	{name: 'Author A', age: 44, id: '1'},
	{name: 'Author B', age: 45, id: '2'},
	{name: 'Author C', age: 46, id: '3'}
];

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({  //=> field is a function to overcome the referring issues from other types.
		// if not a function it will show the error that AuthorType not defined .
		// js runs up to down but function does not execute unless called , so function does not give the build error
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		genre: {type: GraphQLString},
		author: {
			type: AuthorType,
			resolve(parent, args) { // parent here is `book`
				// console.log(parent);
				return _.find(authors, {id: parent.authorId})
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({  //=> field is a function to overcome the referring issues from other types.
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		age: {type: GraphQLInt},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return _.filter(books, {authorId: parent.id})
			}
		}
	})
});
// Route queries are the initial endpoint for users to jump into the graphs here it will be
// get a book
// get all books
// get an author
// get all authors

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {id: {type: GraphQLID}}, // GraphQLID works for string or int .. values can be string in database
			resolve(parent, args) {

				//code to get data from db/ other source
				// parent define relationship between data
				return _.find(books, {id: args.id});
			}
		},
		author: {
			type: AuthorType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args) {
				return _.find(authors, {id: args.id});
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return books
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return authors
			}
		}
	}
});
/*
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: {type :GraphQLString},
				age: {type: GraphQLInt},
				id: {type: GraphQLID}
			},
			resolve(parent, args) {
				let author
			}

		}
	}
});*/

module.exports = new GraphQLSchema({
	query: RootQuery
});