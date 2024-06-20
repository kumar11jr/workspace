import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { use } from "react";

export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required");
    }
    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();
    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication Required");
    }

    const userId = identity.subject;
    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
    });
    return document;
  },
});


export const remove = mutation({
  args:{id:v.id('documents')},
  handler:async(ctx,args)=>{
    const identity = await ctx.auth.getUserIdentity();
    if (!identity){
      throw new Error("Authentication Required")
    }

    const userId = identity.subject

    const existingDocument = await ctx.db.get(args.id)

    if(!existingDocument){
      throw new Error("Not Found")
    }

    if (existingDocument.userId !== userId){
      throw new Error("Unauthorised User")
    }

    const document = await ctx.db.delete(args.id)
  }
})


export const getById = query({
  args:{documentId: v.id("documents")},
  handler:async(ctx,args)=>{
    const identity = await ctx.auth.getUserIdentity();

    const document = await ctx.db.get(args.documentId)

    if(!document){
      throw new Error("Not Found")
    }

    if(!identity){
      throw new Error("Not Authenticated")
    }

    const userId = identity.subject;

    if(document.userId !== userId){
      throw new Error("Unauthorized")
    }


     return document;
  }
})

export const update = mutation({
  args:{
    id:v.id("documents"),
    title:v.optional(v.string()),
    content:v.optional(v.string()),
    coverImage:v.optional(v.string()),
    icon:v.optional(v.string()),
    isPublished:v.optional(v.boolean()),
  },
  handler:async(ctx,args)=>{
    const identity = await ctx.auth.getUserIdentity();

    if(!identity){
      throw new Error("Unauthenticated")
    }
    const userId = identity.subject;

    const {id, ...rest} = args;
    const existingDocument = await ctx.db.get(args.id)

    if(!existingDocument){
      throw new Error("Not Found")
    }

    if(existingDocument.userId !== userId){
      throw new Error("Not Authenticated");
    }

    const document = await ctx.db.patch(args.id,{
      ...rest,
    });

    return document
  }
})



export const removeIcon = mutation({
  args:{ id:v.id("documents")},
  handler:async(ctx,args)=>{
    const identity = await ctx.auth.getUserIdentity();

    if(!identity){
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Unauthorised")
    }

    const document = await ctx.db.patch(args.id,{
      icon:undefined
    });

    return document;
  }
})