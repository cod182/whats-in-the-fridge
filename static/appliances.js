export const appliances = [{
  name: 'Fridge Freezer',
  description: ['Fridge: 3 Shelves and 2 Drawers', 'Fridge Door: 2 Shelves', 'Freezer: 4 Drawer'],
  fridgeCompartments: 1,
  fridgeCompartment: [{
    shelves: [3, 2, 1],
    drawers: [1, 2]
  }],
  freezerCompartments: 1,
  freezerCompartment: [
    { drawers: [4, 3, 2, 1] },
  ],
  doorCompartments: 1,
  doorCompartment: [
    { shelves: [1, 2] },
  ],
  availableCompartments: [
    { name: 'fridge', shelf: 3, drawer: 2 },
    { name: 'freezer', drawer: 3 },
    { name: 'door', shelf: 2 }
  ]
},
{
  name: 'Tall Fridge',
  description: ['Fridge: 5 Shelves and 4 Drawers', 'Door: 5 Shelves'],
  fridgeCompartments: 1,
  fridgeCompartment: [
    { shelves: [1, 2, 3, 4, 5], drawers: [1, 2, 3, 4] },
  ],
  doorCompartments: 1,
  doorCompartment: [
    { shelves: [1, 2, 3, 4, 5] },
  ],
  availableCompartments: [
    { name: 'fridge', shelf: 5, drawer: 4 },
    { name: 'door', shelf: 5 }
  ]
},
{
  name: 'Tall Freezer',
  description: ['Freezer: 6 Drawers'],
  freezerCompartments: 1,
  freezerCompartment: [
    { drawers: [1, 2, 3, 4, 5, 6, 7] },
  ],
  availableCompartments: [
    { name: 'freezer', drawer: 7 },
  ]
},
{
  name: 'Under Counter Fridge',
  description: ['Fridge: 3 Shelves and 1 Drawer', 'Door: 2 Shelves'],
  fridgeCompartments: 1,
  fridgeCompartment: [
    { shelves: [2, 1], drawers: [1] },
  ],
  doorCompartments: 1,
  doorCompartment: [
    { shelves: [1, 2] },
  ],
  availableCompartments: [
    { name: 'fridge', shelf: 2, drawer: 1 },
    { name: 'door', shelf: 2 }
  ]
}, {
  name: 'Under Counter Freezer',
  description: ['Freezer: 4 Drawers'],
  freezerCompartments: 1,
  freezerCompartment: [
    { drawers: [1, 2, 3, 4] },
  ],
  availableCompartments: [
    { name: 'freezer', drawer: 4 },
  ]
}, {
  name: 'Under Counter Fridge with Freezer',
  description: ['Fridge: 2 Shelves and 1 Drawer', 'Door: 2 Shelves', 'Freezer: 1 Drawer'],
  fridgeCompartments: 1,
  fridgeCompartment: [
    { shelves: [1, 2], drawers: [1] },
  ],
  freezerCompartments: 1,
  freezerCompartment: [
    { drawers: [1] },
  ],
  doorCompartments: 1,
  doorCompartment: [
    { shelves: [1, 2] },
  ],
  availableCompartments: [
    { name: 'fridge', shelf: 2, drawer: 1 },
    { name: 'freezer', drawer: 1 },
    { name: 'door', shelf: 2 }
  ]
}, {
  name: 'Chest Fridge',
  description: ['4 Sections'],
  fridgeCompartments: 1,
  fridgeCompartment: [
    { drawers: [1, 2, 3, 4] },
  ],
  availableCompartments: [
    { name: 'fridge', shelf: 3, drawer: 2 },
    { name: 'freezer', drawer: 3 },
    { name: 'door', shelf: 2 }
  ]
}, {
  name: 'Chest Freezer',
  description: ['4 Sections'],
  fridgeCompartments: 1,
  freezerCompartments: 1,
  freezerCompartment: [
    { drawers: [1, 2, 3, 4] },
  ],
  availableCompartments: [
    { name: 'freezer', drawer: 4 },
  ]
}, {
  name: 'American Fridge Freezer',
  description: ['Fridge: 5 Shelves and 2 Drawers', 'Fridge Door: 5 Shelves', 'Freezer: 5 Drawer', 'Freezer Door: 5 Shelves'],
  fridgeCompartments: 1,
  fridgeCompartment: [
    { shelves: [1, 2, 3, 4, 5], drawers: [1, 2] },
  ],
  freezerCompartments: 1,
  freezerCompartment: [
    { drawers: [1, 2, 3, 4, 5, 6] },
  ],
  doorCompartments: 2,
  doorCompartment: [
    { shelves: [1, 2, 3, 4, 5] }
  ],
  availableCompartments: [
    { name: 'fridg', shelf: 6 },
    { name: 'freezer', drawer: 6 },
    { name: 'doorFridge', shelf: 5 },
    { name: 'doorFreezer', shelf: 5 }

  ]
},
]