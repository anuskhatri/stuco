import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { profileTabs } from "@/constants";
import ProfileHeader from "@/components/shared/ProfileHeader";

import { fetchUser, fetchUsers } from "@/lib/actions/user.action";
import UserCard from "@/components/cards/UserCard";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  const result = await fetchUsers({
    userId: user.id,
    searchString: '',
    pageNumber: 1,
    pageSize: 15,
  })

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section>
      <h1>search</h1>
      {/*Search bar */}
    <div className="mt-14 flex flex-col gap-9">
    {result.users.length===0?(
      <p className="no-result">No User </p>
    ):(
      <>
      {
        result.users.map((user)=>(
          <UserCard 
          key={user.id}
          id={user.id}
          name={user.name}
          username={user.username}
          imgUrl={user.image}
          personType='User' />
        ))
      }
      </>
    )}
    </div>
    </section>
  )
}

export default Page