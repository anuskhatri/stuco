import { currentUser } from "@clerk/nextjs";
//internal import
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts, fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import Comment from "@/components/forms/Comment";
import { threadId } from "worker_threads";

export default async function page({ params }: { params: { id: string } }) {
    if (!params.id) {
        return null
    }

    const user = await currentUser()
    if (!user) return null

    const userInfo = await fetchUser(user.id)
    if (!userInfo?.onboarded) return redirect('/onboarding')

    const thread = await fetchThreadById(params.id)

    return (
        <section className="relative">
            <div>
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={user?.id || ''}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={thread.author}
                    createdAt={thread.createdAt}
                    community={thread.community}
                    comments={thread.children}
                />
            </div>

            <div className="mt-7 ">
                <Comment
                    threadId={thread._id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>

            <div className="mt-10">
            {
                thread.children.map((chilrenItem:any)=>(
                    <ThreadCard
                    key={chilrenItem._id}
                    id={chilrenItem._id}
                    currentUserId={user?.id || ''}
                    parentId={chilrenItem.parentId}
                    content={chilrenItem.text}
                    author={chilrenItem.author}
                    createdAt={chilrenItem.createdAt}
                    community={chilrenItem.community}
                    comments={chilrenItem.children}
                    isComment
                />
                ))
            }
            </div>
        </section>
    )
}
