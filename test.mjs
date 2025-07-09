// This is my little exercise for a bigger project

{ // Algtypes
    let compute = cmd => {
        if (cmd.add) {
            let add = cmd.add;
            if (add.a == 666) {
                return { denied: { devilNotAllowed: {} } };
            }
            return { success: { value: add.a + add.b } };
        } else if (cmd.square) {
            let square = cmd.square;
            return { success: { value: square.value * square.value } };
        }
    };
    for (let input of [{ add: { a: 1, b: 2 } }, { add: { a: 666, b: 123 } }, { square: { value: 5 } }]) {
        let result = compute(input);
        if (result.denied) {
            if (result.denied.devilNotAllowed) {
                console.log("DNA");
            }
        } else if (result.success) {
            console.log(result.success.value);
        }
    }
}

// Instead of returning {a:{b: data}}, return callbacks.a.b(data). For {a:b()}, just do b(callbacks.a)
// Core idea: instead of returning a selected ({a: data}), return a selector (ctx => ctx.a(data)); instead of matching a selected (let a = b(); if (a.b) { let b = a.b; ... }), do all *specific* processing within a callback (b({ a: b => ... }))

console.log("-----");

{ // Callbacks
    let compute = cmd => {
        let result = cmd({
            add: (a, b) => {
                if (a == 666) {
                    return ctx => ctx.denied.devilNotAllowed();
                }
                return ctx => ctx.success(a + b);
            },
            square: v => {
                return ctx => ctx.success(v * v);
            },
        });
        return result;
    };
    for (let input of [ctx => ctx.add(1, 2), ctx => ctx.add(666, 123), ctx => ctx.square(5)]) {
        console.log(compute(input)({
            denied: {
                devilNotAllowed: () => "DNA",
            },
            success: value => value,
        }));
    }
}
