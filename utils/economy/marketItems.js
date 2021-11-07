module.exports = [{
        name: `Tuna`,
        enabled: true,
        description: `Tuna? Sounds like a not so bad fish`,
        id: `tuna`,
        price: 10000,
        useable: true,
        used: [
            "Wow! Where did you learn to cook tuna like that? That's definitely on the menu from now on.",
            "Tuna? Tuna more like... Tuna on the menu!",
        ],
        type: "Speciality",
        level: 2
    },
    {
        name: "Salmon",
        enabled: false,
        description: "Salmon, the king of the ocean. Ok maybe not.",
        id: "salmon",
        price: 25000,
        useable: true,
        used: [
            "OMG OMG OMG OMG! SALMON! Let's make bagels!!!",
            "Salmon sounds perfect for some sushis!"
        ],
        type: "Speciality",
        level: 3
    },
    {
        name: "Squid",
        enabled: false,
        description: "Nooo! It's not squid game!!!",
        id: "squid",
        price: 100000,
        useable: true,
        used: [
            "Squid, octopus? What's the difference. Eat it!",
            "Oooooooh a new fish for the restaurant! Amazing!"
        ],
        type: "Speciality",
        level: 4
    }
]