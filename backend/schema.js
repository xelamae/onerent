const _ = require('lodash');
const Users = require('./data/users');
const Properties = require('./data/properties');
const {
    GraphQLObjectType, // Types for queries
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


//User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id:         {type:GraphQLString},
        firstName:  {type:GraphQLString},
        lastName:   {type:GraphQLString}
    })
})

//Property Type
const PropertyType = new GraphQLObjectType({
    name: 'Property',
    fields: () => ({
        id:     {type:GraphQLString},
        street: {type:GraphQLString},
        city:   {type:GraphQLString},
        state:  {type:GraphQLString},
        zip:    {type:GraphQLString},
        rent:   {type:GraphQLFloat},
        user :  {
                type: UserType,
                    resolve: function(property) {
                        return _.find(Users, a => a.id == property.userId);
                    }
                },
    })
})


// Root Query
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    description: "Application Root",
    fields: () => ({
        search:{
            type: new GraphQLList(PropertyType),
            args: {
                search: {type:GraphQLString}
            },
            resolve(parentValue, args){
                var results = [];
                if(args.search){
                    results = _.filter(Properties,function(property){
                        user = _.find(Users, ["id", property.userId]);
                            var words = args.search.split(' ');
                            var isMatched = false;
                            words.forEach(function(word) {
                                if (
                                    property.street.toLowerCase().indexOf(word) != -1 || 
                                    property.city.toLowerCase().indexOf(word) != -1 ||
                                    property.state.toLowerCase().indexOf(word) != -1 ||
                                    property.zip.toLowerCase().indexOf(word) != -1 ||
                                    property.rent.toLowerCase().indexOf(word) != -1 
                                    
                                ){
                                    isMatched = true;
                                }
    
                                if(
                                    user != undefined &&  (user.firstName.toLowerCase().indexOf(word) != -1 ||
                                    user.lastName.toLowerCase().indexOf(word) != -1 )
                                ){
                                    isMatched = true;
                                   
                                }
                                if(isMatched) return;
                            }, this);
                        return isMatched;  
                    });
                }
                return results;
            }
        },
        users: {
            type:  new GraphQLList(UserType),
            resolve(){
                return Users;
            }
        },
        properties: {
            type: new GraphQLList(PropertyType),
            resolve(){
                return Properties
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery
});