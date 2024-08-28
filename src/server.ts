function login(name: string): string {
    const user = {
        firstname: "Rohit",
    };
    const firstname = user.firstname;
    // console.log(`${name} ${firstname} ur TS is compiled`);
    return firstname + name;
}

login("computer");
