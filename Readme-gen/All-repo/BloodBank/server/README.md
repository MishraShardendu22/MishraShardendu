# Back end of Blood Bank Application

## Promsie.all

### Promise.all(iteratable) is a method in JavaScript that takes an array (or any iterable) of promises and returns a single promise. This returned promise resolves when all the promises in the array have been resolved, or it rejects as soon as one of the promises rejects.

### Key Points:

### Resolves with an array:

    - If all promises are resolved, the returned promise resolves with an array of their resolved values, in the same order as the promises in the input array.

### Rejects on any failure:

    - If any promise in the array rejects, the returned promise immediately rejects with that reason, and it ignores any other resolved or pending promises.

## Code -

```javascript
await Promise.all(bloodGroups.map(async (bloodGroup) => {
    const totalIn = await Inventory.aggregate([
        {
            $match: {
                bloodGroup,
                inventoryType: "in",
                organization,
            },
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$quantity" },
            },
        },
    ]);

    const totalOut = await Inventory.aggregate([
        {
            $match: {
                bloodGroup,
                inventoryType: "out",
                organization,
            },
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$quantity" },
            },
        },
    ])
};
```
