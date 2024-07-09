"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const message_1 = require("./message");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.moveCount = 0;
        this.player1.send(JSON.stringify({
            type: "init_game",
            payload: "white"
        }));
        this.player2.send(JSON.stringify({
            type: "init_game",
            payload: "black"
        }));
    }
    makeMove(socket, move) {
        if (this.moveCount % 2 == 0 && socket !== this.player1) {
            console.log("not your move");
            return;
        }
        if (this.moveCount % 2 == 1 && socket !== this.player2) {
            console.log("not your move");
            return;
        }
        try {
            this.board.move(move);
        }
        catch (e) {
            console.log(e);
            return;
        }
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: message_1.GAME_OVER,
                payload: this.board.turn() == "w" ? "black" : "white"
            }));
            this.player2.send(JSON.stringify({
                type: message_1.GAME_OVER,
                payload: this.board.turn() == "w" ? "black" : "white"
            }));
            return;
        }
        if (this.moveCount % 2 == 0) {
            console.log('white move is sent to black');
            this.player2.send(JSON.stringify({
                type: message_1.MOVE,
                payload: move
            }));
        }
        if (this.moveCount % 2 == 1) {
            console.log('black move is sent to white');
            this.player1.send(JSON.stringify({
                type: message_1.MOVE,
                payload: move
            }));
        }
        this.moveCount++;
    }
}
exports.Game = Game;
