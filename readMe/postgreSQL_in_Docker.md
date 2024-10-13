# Setting up PostgreSQL in a Docker Container with Persistent Volume 🐳💾

Docker is a powerful tool that allows you to develop, ship, and run applications inside containers. Today, we're diving deep into setting up a PostgreSQL database inside a Docker container, ensuring our data is persistent 🔄 and safe 🛡️.

## Step-by-step Guide 🚀

1.  **Install Docker** 📦:
    If you haven't installed Docker yet, head over to the official [Docker website](https://www.docker.com/) and download the right version for your operating system.
2.  **Pull the PostgreSQL Docker image** 🖼️:

    ```bash
    docker pull postgres

    ```

3.  **Create a Persistent Volume** 💾:
    Persistent volumes ensure that the data remains intact even if the container stops or crashes.
    `bash
docker volume create mernpgdata
docker volume ls
`
4.  **Run the PostgreSQL container with the volume attached** 🏃‍♂️:

    ```bash
    docker run --rm --name mernpg-container -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -v mernpgdata:/var/lib/postgresql/data -p 5432:5432 -d postgres

    docker run --rm --name pgauth-container -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -v pgauthvol:/var/lib/postgresql/data -p 5432:5432 -d postgres

    ```

    This command does the following:

    -   Names the container `mernpg-container`.
    -   Sets an environment variable for the user and password.
    -   Attaches our volume to the container.
    -   Maps port 5432 inside the container to 5432 on our host.
    -   Uses the `postgres` image.

-

1. **Access your PostgreSQL** 🎯:

    1. Using GUI like

        1. DBGate

        [DbGate | Open Source SQL+noSQL Database Client](https://dbgate.org/)

        ii. PgAdmin

        [pgAdmin - PostgreSQL Tools](https://www.pgadmin.org/)

    2. You can access your PostgreSQL instance by using any database tool or the `psql` command. For `psql`:

    ```bash
    docker exec -it mernpg-container psql -U root

    ```

## PostgreSQL Features 🔍🤔

While both PostgreSQL and MongoDB have their strengths and use cases, here are some reasons you might prefer PostgreSQL, especially for an auth service:

1. **ACID Transactions** ✔️:
   PostgreSQL is a relational database that offers full ACID (Atomicity, Consistency, Isolation, Durability) compliance. This means that it's incredibly reliable for tasks that require data integrity, such as user authentication.
2. **Complex Queries** 🔍:
   Due to its SQL nature, PostgreSQL excels at handling complex queries. If your auth service ever needs to perform intricate searches or joins, PostgreSQL can handle it smoothly.
3. **Extensions and Flexibility** 🛠️:
   PostgreSQL is known for its extensibility. With the right extensions, you can even use PostgreSQL as a NoSQL database, offering you the best of both worlds!
4. **Data Types** 📊:
   PostgreSQL supports a plethora of data types, including arrays, hstore, and JSON. This means greater flexibility in how you store and retrieve data.
5. **Maturity & Community Support** 🤝:
   PostgreSQL has been around since 1996 and has a robust community. This ensures continuous improvements, security updates, and a vast pool of resources and experts to consult.

## Why Consider PostgreSQL for Auth Service? 🔐

1. **Security**: PostgreSQL offers a comprehensive suite of security features, including SSL support, row-level security, and strong password hashing mechanisms.
2. **Scalability**: As your user base grows, PostgreSQL scales efficiently, ensuring your auth service remains responsive.
3. **Consistency**: Given the importance of user data in authentication services, the data integrity offered by PostgreSQL is a valuable asset.

In conclusion, while MongoDB is excellent for document-based, scalable applications, PostgreSQL provides a reliable, flexible, and mature solution that is often a better fit for authentication services.

Happy coding! 🚀👩‍💻👨‍💻

## Using TypeORM

    - ORM -> Object Relational Mapping
        It Provides a layer b/w app & DB, It provides some API which can be used easily to interact with DB, instead of writing tipical query

    - TypeORM
        -   It is an ORM that can run in NodeJs, Browser, Ionic, React Native, Electron etc
        -   It helps in DB plug in & out easily
        -   The **Data Mapper** approach helps with maintainability, which is more effective in larger apps.
        -   The Active Record approach helps keep things simple which works well in smaller apps. And simplicity is always a key to better maintainability.
        -   We will use Repository Api instead of Entity Manager Api in TypeORM (Anyone is good, personal choice)
