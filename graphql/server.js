import { inspect } from "node:util";
import { ApolloServer, gql } from "apollo-server";
import DataLoader from "dataloader";
import repo from "./repo.js";

const typeDefs = gql`
  type Book {
    id: Int!
    title: String!
    authors: [Author]
  }

  type Author {
    id: Int!
    name: String!
  }

  type Query {
    books: [Book]
    book(id: Int): Book
    author(id: Int): Author
    authors: [Author]
  }
`;

// Plain resolvers --------------

const books = async (root, args, ctx) => {
  return await repo.allBooks();
};

const book = async (root, { id }, ctx) => {
  return await repo.findBookById(id);
};

const bookAuthors = async (root, args, ctx) => {
  const ids = root.authors;
  return await Promise.all(ids.map((id) => repo.findAuthorById(id)));
};

const authors = async (root, { id }, ctx) => {
  return await repo.allAuthors();
};

const author = async (root, { id }, ctx) => {
  return await repo.findAuthorById(id);
};

const plain = {
  Query: {
    books,
    book,
    authors,
    author,
  },
  Book: {
    authors: bookAuthors,
  },
};

// Cached resolvers ----------------------------

const valueCache = new Map(); // Naive implementation

const cache = (resolverFn, keyFn) => async (root, args, ctx) => {
  const key = keyFn(root, args, ctx);

  if (valueCache.has(key)) {
    return await valueCache.get(key);
  }

  const value = resolverFn(root, args, ctx);
  valueCache.set(key, value);
  return await value;
};

const cached = {
  Query: {
    books: cache(books, () => "books"),
    book: cache(book, (_, { id }) => `book::${id}`),
    authors: cache(authors, () => "authors"),
    author: cache(author, (_, { id }) => `author::${id}`),
  },
  Book: {
    authors: cache(bookAuthors, ({ id }) => `book::${id}:authors`),
  },
};

// AUTO EXPIRABLE KEYS
// cache(books, async () => `books::${await repo.getBooksUpdate()}`
// cache(book, async (_, {id}) => `books::${await repo.getBookUpdate(1)}`

// Batched resolvers ----------------------------

const booksB = async (root, args, ctx) => {
  return await repo.allBooks();
};

const bookB = async (root, { id }, ctx) => {
  return await repo.findBookById(id);
};

const bookAuthorsB = async (root, args, ctx) => {
  const ids = root.authors;
  return await Promise.all(ids.map((id) => ctx.authorLoader.load(id)));
};

const authorsB = async (root, { id }, ctx) => {
  return await repo.allAuthors();
};

const authorB = async (root, { id }, ctx) => {
  return await repo.findAuthorById(id);
};

const batched = {
  Query: {
    books: booksB,
    book: bookB,
    authors: authorsB,
    author: authorB,
  },
  Book: {
    authors: bookAuthorsB,
  },
};

// Query-optimized -------------------------------------

const getSelectableFields = (query) => {
  // console.log(query);

  const book = query.operation.selectionSet.selections.find(
    (s) => s.name.value === "book"
  );
  const fields = book.selectionSet.selections
    .map((s) => s.name.value)
    .filter((f) => f !== "__typename");

  return fields;
};

const includesAuthors = (query) => {
  const books = query.operation.selectionSet.selections.find(
    (s) => s.name.value === "books"
  );

  return Boolean(
    books.selectionSet.selections.find((s) => s.name.value === "authors")
  );
};

const booksO = async (root, args, ctx, query) => {
  const include = [];
  if (includesAuthors(query)) {
    include.push("authors");
  }

  const data = await repo.allBooks({ include });
  return data;
};

const bookO = async (root, { id }, ctx, query) => {
  const select = getSelectableFields(query);
  return await repo.findBookById(id, select);
};

const bookAuthorsO = async (root, args, ctx) => {
  if (root.authors[0]?.id) {
    return root.authors;
  }

  const ids = root.authors;
  return await Promise.all(ids.map((id) => repo.findAuthorById(id)));
};

const authorsO = async (root, { id }, ctx) => {
  return await repo.allAuthors();
};

const authorO = async (root, { id }, ctx) => {
  return await repo.findAuthorById(id);
};

const authorLoader = () =>
  new DataLoader(async (ids) => {
    const authors = repo.findAuthorsByIds(ids);
    return authors.reduce((acc, a) => {
      acc[a.id] = a;
      return acc;
    }, {});
  });

const optimized = {
  Query: {
    books: booksO,
    book: bookO,
    authors: authorsO,
    author: authorO,
  },
  Book: {
    authors: bookAuthorsO,
  },
};

// ----------------------------

let resolvers = plain;
resolvers = cached;
resolvers = batched;
resolvers = optimized;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { authorLoader: authorLoader() };
  },
});

server.listen(process.env.PORT ?? 5000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
