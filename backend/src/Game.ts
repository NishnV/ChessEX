import { Chess } from 'chess.js'
import { WebSocket } from 'ws';
import { GAME_OVER, MOVE } from './message';

export class Game{
    
    public player1 : WebSocket;
    public player2 : WebSocket;
    public board : Chess;
    private startTime : Date;
    private moveCount;


    constructor(player1 : WebSocket,player2 : WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.moveCount = 0;
 
        this.player1.send(JSON.stringify({
            type : "init_game",
            payload : "white"
        }));

        this.player2.send(JSON.stringify({
            type : "init_game",
            payload : "black"
        }));
        }   
        makeMove(socket : WebSocket,  move : {
            from : string,
            to : string
        }){


            if (this.moveCount % 2 == 0 && socket !== this.player1){
                console.log("not your move");
                return;
            }

            if (this.moveCount % 2 == 1 && socket !== this.player2){
                console.log("not your move");
                return;
            }
            try{
                this.board.move(move);
            }

            catch(e) {
                console.log(e);
                return;
            }

            if (this.board.isGameOver()){
                this.player1.send(JSON.stringify({
                    type : GAME_OVER,
                    payload : this.board.turn() == "w" ? "black" : "white"
                }));

                this.player2.send(JSON.stringify({
                    type : GAME_OVER,
                    payload : this.board.turn() == "w" ? "black" : "white"
                }));

                return;
            }
            
            if (this.moveCount % 2 == 0){
                console.log('white move is sent to black');
                this.player2.send(JSON.stringify({
                    type : MOVE,
                    payload : move
                }));
            }

            if (this.moveCount % 2 == 1){
                console.log('black move is sent to white');
                this.player1.send(JSON.stringify({
                    type : MOVE,
                    payload : move
                }));
            }

            this.moveCount++;
        }
    }

    
