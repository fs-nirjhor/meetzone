import Image from "next/image";

const Profile = () => {
  return (
    <section className="flex flex-col gap-2">
      <Image
        src="https://avatars.githubusercontent.com/u/113302717?v=4"
        alt="avatar"
        width={50}
        height={50}
        className="rounded-full mx-auto"
      />
      <p className="text-small-bold text-light-1 text-center">FS Nirjhor</p>
      <div className="flex justify-between text-center">
        <div>
          <span className="text-base-bold">1</span>
          <br />
          <span className="text-tiny-medium">Posts</span>
        </div>
        <div>
          <span className="text-base-bold">0</span>
          <br />
          <span className="text-tiny-medium">Followers</span>
        </div>
        <div>
          <span className="text-base-bold">2</span>
          <br />
          <span className="text-tiny-medium">Following</span>
        </div>
      </div>
    </section>
  );
};
export default Profile;
