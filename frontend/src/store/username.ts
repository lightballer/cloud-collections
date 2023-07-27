import { makeObservable, observable, action } from "mobx";

class Username {
  username = "";

  constructor() {
    makeObservable(this, {
      username: observable,
      setUsername: action,
    });
  }

  setUsername(username: string) {
    console.log({ username });
    this.username = username;
  }
}

const username = new Username();

export { username };
