import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema(
    {
        users : defineTable(
            {
                userId : v.string(),
                email : v.string(),
                name : v.string(),
                isPro : v.boolean(),
                ProSince : v.optional(v.number()),
                lemonSqueezyCustomerId : v.optional(v.string()),
                lemonSqueezyOrderId : v.optional(v.string()),
            }
        ).index("by_user_id",['userId']),

        codeExecution : defineTable(
            {
                userId : v.string(),
                code : v.string(),
                language : v.string(),
                output : v.optional(v.string()),
                error : v.optional(v.string()),
            }
        ).index("by_user_id",['userId']),

        snippets : defineTable(
            {
                userId : v.string(),
                code : v.string(),
                language : v.string(),
                title : v.string(),
                userName : v.string(),
            }
        ).index("by_user_id",['userId']),
    
        snippetComments : defineTable(
            {
                snippetId : v.id("snippets"),
                userId : v.string(),
                userName : v.string(),
                content : v.string(), // This will store HTML content
            }
        ).index("by_snippet_id",['snippetId']),

        star: defineTable(
            {
                userId : v.id('users'),
                snippetId : v.id('snippets'),
            }
        ).index("by_user_id",['userId'])
        .index("by_snippet_id",['snippetId'])
        .index("by_user_id_and_snippet_id",['userId','snippetId']),
    }
)

// To fetch a user, write a query function that uses the 'by_user_id' index.
// To fetch a snippet, write a query function that uses the 'by_snippet_id' index.