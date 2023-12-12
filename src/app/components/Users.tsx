import prisma from '@/db';

interface UserProps {
  id: number;
  name: string;
}

interface UsersProps {
  user: UserProps[];
}

const Users = async () => {
  const users = await prisma.user.findMany();

  console.log(users);

  return (
    <>
      users
      {users.map((data: any) => (
        <div key={data.id}>
          <p>{data.name}</p>
        </div>
      ))}
    </>
  );
};

export default Users;
