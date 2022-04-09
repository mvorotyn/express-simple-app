import { types, onSnapshot, addMiddleware, IModelType, ISimpleType, IStateTreeNode, _NotCustomized } from "mobx-state-tree";
import { NonEmptyObject } from "mobx-state-tree/dist/internal";
import { mstLog } from "mst-log";
// A tweet has a body (which is text) and whether it's read or not

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  position: string;
  photo: string;
}


const Tweet = types
  .model("Tweet", {
    body: types.string,
    read: false, // automatically inferred as type "boolean" with default "false"
  })
  .actions((tweet) => ({
    toggle() {
      tweet.read = !tweet.read;
    },
  }));

  const UserRowData = types
  .model("UserRowData", {
    name: types.string,
    id: types.number,
    email: types.string,
    position: types.string,
    phone: types.string,
    photo: types.string,
  })

const RootStore = types
  .model("RootStore", {
    tweets: types.array(Tweet),
    rowsForCurrentPage: types.array(UserRowData),
  })
  .actions((self) => ({
    setRowsFoCurrentPage(rowsArr: ({ name: string; id: number; email: string; position: string; phone: string; photo: string; } & NonEmptyObject & IStateTreeNode<IModelType<{ name: ISimpleType<string>; id: ISimpleType<number>; email: ISimpleType<string>; position: ISimpleType<string>; phone: ISimpleType<string>; photo: ISimpleType<string>; }, {}, _NotCustomized, _NotCustomized>>)[] | undefined) {
      self.rowsForCurrentPage.spliceWithArray(0, self.rowsForCurrentPage.length, rowsArr)
    },
    
  }));

export const rootStore = RootStore.create({
  tweets: [
    {
      body: "Anyone tried MST?",
    },
  ],
});

// Listen to new snapshots, which are created anytime something changes
onSnapshot(rootStore, (snapshot) => {
  // console.log(snapshot)
});

// Let's mark the first tweet as "read" by invoking the "toggle" action
// rootStore.tweets[0].toggle();

addMiddleware(rootStore, mstLog());

// In the console, you should see the result: `{ tweets: [{ body: "Anyone tried MST?", read: true }]}`
