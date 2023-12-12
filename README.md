## Storybook GPT

### Getting started

Run the following commands in the project root:
1. Start up the db: `docker compose up -d`
2. Set the env variables: `cp .env.sample .env`
3. Instantiate Prisma Client: `npx prisma generate`
4. Create tables in db: `npx prisma migrate dev --name init`
5. Run: `yarn dev`

Open `http://localhost:3000` in browser