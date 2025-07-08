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
    {
        let result = compute({ add: { a: 1, b: 2 } });
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

{ // Callbacks
    compute({
        success: value => value,
        denied: {
            devilNotAllowed: () => "DNA",
        },
    });
}
