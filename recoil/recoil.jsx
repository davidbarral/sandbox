import React, { useEffect } from "react";
import {
  RecoilRoot,
  atom,
  atomFamily,
  selector,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";

// -----------------------------------

const countState = atomFamily({
  key: "count",
  default: () => 0,
});

const Counter = ({ id }) => {
  const [count, setCount] = useRecoilState(countState(id));

  return <button onClick={() => setCount(count + 1)}>{count} clicks</button>;
};

// -----------------------------------

const fetchUserData = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return `USER DATA ${id}`;
};

const currentUserIdState = atom({
  key: "currentUserId",
  default: 1,

  effects: [
    ({ onSet }) => {
      onSet((id) => {
        console.debug("Current user id:", id);
      });
    },
  ],
});

const currentUserDataState = selector({
  key: "currentUserData",
  get: ({ get }) => {
    const userId = get(currentUserIdState);
    return fetchUserData(userId);
  },
});

// const UserData = () => {
//   const userData = useRecoilValue(currentUserDataState);
//   return <p>{userData}</p>;
// };

const UserData = () => {
  const { state, contents: userData } =
    useRecoilValueLoadable(currentUserDataState);

  if (state === "loading") {
    return "Loading...";
  }

  if (state === "hasError") {
    return "Error :(";
  }

  // state === "hasValue"
  return <p>{userData}</p>;
};

// -----------------------------------

const someId = atom({
  key: "someId",
  effects: [
    ({ onSet }) => {
      onSet((id) => {
        console.debug("Current user id:", id);
      });
    },
  ],
});

const SetId = () => {
  const setId = useSetRecoilState(someId);

  useEffect(() => {
    setId(23);
  }, []);
};

// -----------------------------------

const filterState = atom({
  key: "filter",
  default: {},
  effects: [
    ({ setSelf, trigger, onSet }) => {
      if (trigger === "get") {
        setSelf(JSON.parse(window.localStorage.getItem("filter") ?? "{}"));
        console.log("INIT FILTER", window.localStorage.getItem("filter"));
      }
      onSet((filter) => {
        window.localStorage.setItem("filter", JSON.stringify(filter));
        console.log("STORE FILTER", window.localStorage.getItem("filter"));
      });
    },
  ],
});

const Filter = () => {
  const [filter, setFilter] = useRecoilState(filterState);

  return (
    <label>
      <input
        type="checkbox"
        checked={filter.active}
        onChange={() => setFilter({ ...filter, active: !filter.active })}
      />
      Active
    </label>
  );
};

// -----------------------------------

const Recoil = () => (
  <RecoilRoot>
    <Counter id={1} />
    <Counter id={2} />
    <UserData />
    <SetId />
    <Filter />
  </RecoilRoot>
);

export default Recoil;
