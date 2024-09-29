"use server"

import { revalidatePath } from "next/cache";

//internal imports 
import { connectDB } from "../mangoose";
import Thread from "../models/thread.model";
import User from "../models/user.model";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({
  text, author, communityId, path
}: Params) {
  await connectDB()
  try {

    const createdThread = await Thread.create({
      text,
      author,
      community: null //if the member is part of that community will get the community id or null 
    })

    //upadte user model
    await User.findByIdAndUpdate(
      author,
      {
        $push: { threads: createdThread._id }
      }
    )
    revalidatePath(path)

  } catch (error) {
    console.log(error);

    throw new Error(`EROR WHILE INSERTING THREAD DATA postThread ${error}`);
  }
}

//fetch posts
export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectDB()

  //calculate number of post to skip depending on page we are
  const skipAmount = (pageNumber - 1) * pageSize

  const postQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: 'author', model: User })
    //get comment below
    .populate({
      path: 'children',
      populate: {
        path: 'author',
        model: User,
        select: '_id name parentId image'
      }
    })
  const totalPostCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } })

  const posts = await postQuery.exec()
  const isNext = totalPostCount > (skipAmount + posts.length)

  return { posts, isNext }
}

//fecth Thread By Id
export async function fetchThreadById(threadId: string) {
  connectDB();

  try {
    const thread = await Thread.findById(threadId)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      }) // Populate the author field with _id and username
      // Populate the community field with _id and name
      .populate({
        path: "children", // Populate the children field
        populate: [
          {
            path: "author", // Populate the author field within children
            model: User,
            select: "_id id name parentId image", // Select only _id and username fields of the author
          },
          {
            path: "children", // Populate the children field within children
            model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
            populate: {
              path: "author", // Populate the author field within nested children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (err) {
    console.error("Error while fetching thread:", err);
    throw new Error("Unable to fetch thread");
  }
}

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string,
) {
  connectDB()

  try {
    const orginalThread = await Thread.findById(threadId);

    if (!orginalThread) throw new Error("Orginal thread not found");

    const commentThread = await new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    })

    //save new Thread
    const saveCommentThread = await commentThread.save()

    //update the original thread to include comment
    orginalThread.children.push(saveCommentThread._id)

    //save the original thread
    await orginalThread.save()

    revalidatePath(path)
  } catch (error) {

    console.error("Error while insert comment thread:", error);
    throw new Error("Unable to insert comment thread");
  }
}