// See `test.mjs` for the general info, this one is just an attempt at typing this

// Since input enums and output enums are the same enums just used in different places, I'll just do one plain enum

type CommandMatcher = <Output>(command: {
    square: (value: number) => Output;
    sum: (a: number, b: number) => Output;
}) => Output;

let commandMatchers: Array<CommandMatcher> = [command => command.square(5), command => command.sum(1, 2)];
for (let commandMatcher of commandMatchers) {
    console.log(commandMatcher({
        square: v => v * v,
        sum: (a, b) => a + b,
    }));
}
