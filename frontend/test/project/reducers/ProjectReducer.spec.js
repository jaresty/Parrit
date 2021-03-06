import deepFreeze from 'deep-freeze';
import projectReducer from 'project/reducers/ProjectReducer.js';

describe("ProjectReducer", () => {
    it("should get the default state", () => {
        const stateBefore = undefined;
        const action = {};
        const stateAfter = {
            id: 0,
            people: [],
            pairingBoards: []
        };

        expect(projectReducer(stateBefore, action)).toEqual(stateAfter);
    });

    describe("actions", () => {
        describe("LOAD_PROJECT", () => {
            it("should set the project to the passed in project object", () => {
                const stateBefore = {
                    pairingBoards: []
                };

                const action = {
                    type: "LOAD_PROJECT",
                    project: {
                        shoobadooba: "doobadoowa"
                    }
                };

                const stateAfter = {
                    shoobadooba: "doobadoowa"
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(projectReducer(stateBefore, action)).toEqual(stateAfter);
            });
        });

        describe("MOVE_PERSON", () => {
            it('should move a person between pairingBoards', () => {
                const stateBefore = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: [{name: "Captain Kirk"}]
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }]
                };

                const action = {
                    type: "MOVE_PERSON",
                    toPairingBoardIndex: 1,
                    fromPairingBoardIndex: 0,
                    personIndex: 0
                };

                const stateAfter = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: []
                        },
                        {
                            name: "Klingon Warbird",
                            people: [{name: "Captain Kirk"}]
                        }]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(projectReducer(stateBefore, action)).toEqual(stateAfter);
            });

            it('should move a person from the project to a pairing board', () => {
                const stateBefore = {
                    id: 7,
                    people: [{name: "Captain Kirk"}],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: []
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }]
                };

                const action = {
                    type: "MOVE_PERSON",
                    toPairingBoardIndex: 1,
                    fromPairingBoardIndex: -1,
                    personIndex: 0
                };

                const stateAfter = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: []
                        },
                        {
                            name: "Klingon Warbird",
                            people: [{name: "Captain Kirk"}]
                        }]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(projectReducer(stateBefore, action)).toEqual(stateAfter);
            });

            it('should move a person from pairing board to the project', () => {
                const stateBefore = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: []
                        },
                        {
                            name: "Klingon Warbird",
                            people: [{name: "Captain Kirk"}]
                        }]
                };

                const action = {
                    type: "MOVE_PERSON",
                    toPairingBoardIndex: -1,
                    fromPairingBoardIndex: 1,
                    personIndex: 0
                };

                const stateAfter = {
                    id: 7,
                    people: [{name: "Captain Kirk"}],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: []
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(projectReducer(stateBefore, action)).toEqual(stateAfter);
            });
        });

        describe('RESET_PAIRING_BOARD', () => {
            it('moves all people from pairing boards to floating', () => {
                const stateBefore = {
                    id: 7,
                    people: [{name: "Bubba Gump"}],
                    pairingBoards: [
                        {
                            name: "BOARD1",
                            people: [{name:"Charles Shaw"}]
                        },
                        {
                            name: "BOARD2",
                            people: [
                                {name: "Hanzle"},
                                {name: "Gretel"}
                            ]
                        }
                    ]
                };
                
                const action = { type: 'RESET_PAIRING_BOARD' };
                
                const stateAfter = {
                    id: 7,
                    people: [
                        {name: "Bubba Gump"},
                        {name:"Charles Shaw"},
                        {name: "Hanzle"},
                        {name: "Gretel"}
                    ],
                    pairingBoards: [
                        {
                            name: "BOARD1",
                            people: []
                        },
                        {
                            name: "BOARD2",
                            people: []
                        }
                    ]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(projectReducer(stateBefore, action)).toEqual(stateAfter);
            });

            it('does not move people on exempt pairing boards to floating', () => {
                const stateBefore = {
                    id: 7,
                    people: [{name: "Bubba Gump"}],
                    pairingBoards: [
                        {
                            name: "BOARD1",
                            people: [{name:"Charles Shaw"}]
                        },
                        {
                            name: "BOARD2",
                            people: [
                                {name: "Hansel"},
                                {name: "Gretel"}
                            ]
                        },
                        {
                          name: "OOO",
                          exempt: true,
                          people: [{name: "Rip van Winkle"}]
                        }
                    ]
                };

                const action = { type: 'RESET_PAIRING_BOARD' };

                const stateAfter = {
                    id: 7,
                    people: [
                        {name: "Bubba Gump"},
                        {name:"Charles Shaw"},
                        {name: "Hansel"},
                        {name: "Gretel"}
                    ],
                    pairingBoards: [
                        {
                            name: "BOARD1",
                            people: []
                        },
                        {
                            name: "BOARD2",
                            people: []
                        },
                        {
                          name: "OOO",
                          exempt: true,
                          people: [{name: "Rip van Winkle"}]
                        }
                    ]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(projectReducer(stateBefore, action)).toEqual(stateAfter);
            });
        });

        describe('SMART_RESET_BOARD', function() {
            it('leaves a person per pair while moving th excess to floating', function() {
                const stateBefore = {
                    id: 7,
                    people: [{name: "Bubba Gump"}],
                    pairingBoards: [
                        {
                            name: "BOARD1",
                            people: [{name:"Charles Shaw"}]
                        },
                        {
                            name: "BOARD2",
                            people: [
                                {name: "Hanzle"},
                                {name: "Gretel"}
                            ]
                        },
                        {
                            name: "BOARD3",
                            people: [
                                {name: "Bob"},
                                {name: "Jim"},
                                {name: "Alice"}
                            ]
                        },
                        {
                            name: "BOARD4",
                            people: []
                        }
                    ]
                };

                const action = { type: 'SMART_RESET_BOARD' };

                const stateAfter = {
                    id: 7,
                    people: [
                        {name: "Bubba Gump"},
                        {name: "Gretel"},
                        {name: "Alice"},
                        {name: "Jim"}
                    ],
                    pairingBoards: [
                        {
                            name: "BOARD1",
                            people: [
                                {name:"Charles Shaw"}
                            ]
                        },
                        {
                            name: "BOARD2",
                            people: [
                                {name: "Hanzle"}
                            ]
                        },
                        {
                            name: "BOARD3",
                            people: [
                                {name: "Bob"}
                            ]
                        },
                        {
                            name: "BOARD4",
                            people: []
                        }
                    ]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(projectReducer(stateBefore, action)).toEqual(stateAfter);
            });

            it('does not move people on exempt pairing boards to floating', function() {
                const stateBefore = {
                    id: 7,
                    people: [{name: "Bubba Gump"}],
                    pairingBoards: [
                        {
                            name: "BOARD1",
                            people: [{name:"Charles Shaw"}]
                        },
                        {
                            name: "BOARD2",
                            people: [{name: "Hansel"}]
                        },
                        {
                          name: "OOO",
                          exempt: true,
                          people: [{name: "Gretel"}, {name: "Rip van Winkle"}, {name: "Alice" }]
                        }
                    ]
                };

                const action = { type: 'SMART_RESET_BOARD' };

                const stateAfter = {
                    id: 7,
                    people: [{name: "Bubba Gump"}],
                    pairingBoards: [
                        {
                            name: "BOARD1",
                            people: [{name:"Charles Shaw"}]
                        },
                        {
                            name: "BOARD2",
                            people: [{name: "Hansel"}]
                        },
                        {
                          name: "OOO",
                          exempt: true,
                          people: [{name: "Gretel"}, {name: "Rip van Winkle"}, {name: "Alice" }]
                        }
                    ]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(projectReducer(stateBefore, action)).toEqual(stateAfter);
            });
        });

        describe("DELETE_PERSON", () => {
            it('should delete a person from a pairing board', () => {
                const stateBefore = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: [
                                {name: "Captain Kirk"},
                                {name: "Spock"}
                            ]
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }]
                };

                const action = {
                    type: "DELETE_PERSON",
                    pairingBoardIndex: 0,
                    personIndex: 1
                };

                const stateAfter = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: [{name: "Captain Kirk"}]
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }
                    ]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(projectReducer(stateBefore, action)).toEqual(stateAfter);
            });

            it('should delete a person from the project', () => {
                const stateBefore = {
                    id: 7,
                    people: [{name: 'Albert Einstein'}],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: [
                                {name: "Captain Kirk"},
                                {name: "Spock"}
                            ]
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }]
                };

                const action = {
                    type: "DELETE_PERSON",
                    pairingBoardIndex: -1,
                    personIndex: 0
                };

                const stateAfter = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: [
                                {name: "Captain Kirk"},
                                {name: "Spock"}
                            ]
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(projectReducer(stateBefore, action)).toEqual(stateAfter);
            });
        });

        describe("DELETE_PAIRING_BOARD", () => {
            it('should delete a pairing board', () => {
                const stateBefore = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: [
                                {name: "Captain Kirk"},
                                {name: "Spock"}
                            ]
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }
                    ]
                };

                const action = {
                    type: "DELETE_PAIRING_BOARD",
                    pairingBoardIndex: 1
                };

                const stateAfter = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: [
                                {name: "Captain Kirk"},
                                {name: "Spock"}
                            ]
                        }
                    ]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(projectReducer(stateBefore, action)).toEqual(stateAfter);
            });

            it('should move all of the people from the pairing board to the project', () => {
                const stateBefore = {
                    id: 7,
                    people: [{name: 'Albert Einstein'}],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: [
                                {name: "Captain Kirk"},
                                {name: "Spock"}
                            ]
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }
                    ]
                };

                const action = {
                    type: "DELETE_PAIRING_BOARD",
                    pairingBoardIndex: 0
                };

                const stateAfter = {
                    id: 7,
                    people: [
                        {name: 'Albert Einstein'},
                        {name: "Captain Kirk"},
                        {name: "Spock"}
                    ],
                    pairingBoards: [
                        {
                            name: "Klingon Warbird",
                            people: []
                        }
                    ]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(projectReducer(stateBefore, action)).toEqual(stateAfter);
            });
        });
    });
});
