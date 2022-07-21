import { inspect } from "node:util";
import { setTimeout } from "node:timers/promises";
import fetch from "node-fetch";
import apollo from "@apollo/client";
const { ApolloClient, HttpLink, InMemoryCache, gql } = apollo;

try {
  await fetch(`http://localhost:${process.env.PORT ?? 5000}/`);
} catch (e) {
  console.log("Waiting for server...");
  await setTimeout(500);
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: `http://localhost:${process.env.PORT ?? 5000}/`,
    fetch,
  }),
  cache: new InMemoryCache(),
});

const query1 = gql`
  query Books {
    books {
      id
      title
    }
  }
`;

const query2 = gql`
  query Books {
    books {
      id
      title
      authors {
        name
      }
    }
  }
`;

let res = await client.query({ query: query1, fetchPolicy: "no-cache" });
console.log(inspect(res.data, { depth: 100, colors: true }));

res = await client.query({ query: query2, fetchPolicy: "no-cache" });
console.log(inspect(res.data, { depth: 100, colors: true }));

await client.query({ query: query2, fetchPolicy: "no-cache" });
