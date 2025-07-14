interface User {
    name: string;
    age: number;
}

interface Flight {
    from: string;
    to: string;
}

interface UserFlight extends User, Flight {
    id: number;
}

const userFlight: UserFlight = {
    name: 'John',
    age: 30,
    from: 'New York',
    to: 'Paris',
    id: 1
};

console.log(userFlight);