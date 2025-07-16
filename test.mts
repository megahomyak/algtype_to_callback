// See `test.mjs` for the general info, this one is just an attempt at typing this

// Since input enums and output enums are the same enums just used in different places, I'll just do one plain enum

type CommandSelector = <Output>(cases: {
    square: (value: number) => Output;
    sum: (a: number, b: number) => Output;
}) => Output;

let commandSelectors: Array<CommandSelector> = [c => c.square(5), c => c.sum(1, 2)];
for (let commandSelector of commandSelectors) {
    console.log(commandSelector({
        square: v => v * v,
        sum: (a, b) => a + b,
    }));
}

// Slightly more complex, but cleaner at usage:

// Definitions
type Command = {
    match: <Output>(cases: {
        square: (value: number) => Output;
        sum: (a: number, b: number) => Output;
    }) => Output;
};
let Commands = {
    square: (value: number): Command => ({ match: cases => cases.square(value) }),
    sum: (a: number, b: number): Command => ({ match: cases => cases.sum(a, b) }),
};

// Usage
let commands: Array<Command> = [Commands.square(5), Commands.sum(1, 2)];
for (let command of commands) {
    console.log(command.match({
        square: v => v * v,
        sum: (a, b) => a + b,
    }));
}
