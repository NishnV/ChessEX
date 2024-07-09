import { WebSocket } from "ws"
import { INIT_GAME, MOVE } from "./message";
import { Game } from "./Game";


export class GameManager{
    private games : Game[];
    private users : WebSocket[];
    private pendingUser : WebSocket | null;

    constructor(){
        this.games = [];
        this.users = [];
        this.pendingUser = null;
        console.log('connection initiated');
    }
    
    addUser(socket : WebSocket){
        this.users.push(socket);
        console.log('user added');
        this.messageHandler(socket);
    }

    removeUser(socket : WebSocket){
        this.users = this.users.filter(user => user !== socket);
    }

    messageHandler(socket : WebSocket){
        console.log('message handler entered');
        socket.on('message' ,(data) => {
            const message = JSON.parse(data.toString());

            if (message.type === INIT_GAME){
                if(this.pendingUser){
                    const game = new Game(this.pendingUser,socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }

                else{
                    this.pendingUser = socket;
                }
            }

            if(message.type === MOVE){

                const game =  this.games.find(game => game.player1 === socket || game.player2 === socket );

                if(game){
                    game.makeMove(socket,message.move);
                }
            }

        })
    }

}



