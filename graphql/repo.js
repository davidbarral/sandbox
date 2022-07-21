import { setTimeout } from "node:timers/promises";

const data = {
  books: {
    1: {
      title: "Some awesome book",
      authors: [1, 2],
    },
    2: {
      title: "Useless book",
      authors: [3],
    },
  },
  authors: {
    1: {
      name: "Awesome author",
    },
    2: {
      name: "Incredible ghost writer",
    },
    3: {
      name: "Girauta",
    },
  },
};

const pick = (o, keys = []) => {
  if (keys.length === 0) {
    return o;
  }

  return keys.reduce((acc, k) => {
    if (k in o) {
      return { ...acc, [k]: o[k] };
    }
    return acc;
  }, {});
};

const repo = new Proxy(
  {
    allBooks: async ({ include = [] } = {}) => {
      await setTimeout(500);
      const books = Object.entries(data.books).map(([id, data]) => ({
        id,
        ...data,
      }));

      if (include.includes("authors")) {
        for (let book of books) {
          book.authors = book.authors.map((id) => ({
            id,
            ...data.authors[id],
          }));
        }
      }
      return books;
    },

    findBookById: async (id, { select = [] } = {}) => {
      await setTimeout(500);
      const book = data.books[id];
      if (!book) {
        throw new Error(`Missing book ${id}`);
      }
      return pick({ ...book, id }, select);
    },

    allAuthors: async () => {
      await setTimeout(500);
      return Object.entries(data.authors).map(([id, data]) => ({
        id,
        ...data,
      }));
    },

    findAuthorById: async (id) => {
      await setTimeout(500);
      const author = data.authors[id];
      if (!author) {
        throw new Error(`Missing author ${id}`);
      }
      return { ...author, id };
    },

    findAuthorsById: async (ids) => {
      await setTimeout(500);
      return ids.map((id) => {
        const author = data.authors[id];
        if (!author) {
          throw new Error(`Missing author ${id}`);
        }
        return { ...author, id };
      });
    },
  },
  {
    get:
      (target, prop) =>
      (...args) => {
        console.log(
          `[repo] ${prop}(${args.map((a) => JSON.stringify(a)).join(", ")})`
        );
        return target[prop](...args);
      },
  }
);

export default repo;
