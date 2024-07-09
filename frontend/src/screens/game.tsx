import { useEffect, useState } from "react";
import { Button } from "../components/button";
import { ChessBoard } from "../components/chessboard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";

const INIT_GAME = "init_game";
const MOVE = "move";
const GAME_OVER = "game_over";

export const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [state,setState] = useState(false);

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);

            switch (message.type) {
                case INIT_GAME:
                    setBoard(chess.board());
                    setState(true);
                    console.log("Game initialised");
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log("Move made");
                    break;
                case GAME_OVER:
                    console.log("Game over");
                    break;
            }
        };
    }, [socket]);

    if (!socket) {
        return <div>Connecting.....</div>;
    }
    return (
        <div>
            <div className="justify-center flex">
                <div className="pt-8 max-w-screen-lg">
                    <div className="grid grid-cols-16 gap-4 w-full">
                        <ChessBoard chess = {chess} setBoard = {setBoard} socket = {socket} board={board} />
                    </div>

                    <div className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">
                        { !state && <Button
                            onClick={() => {
                                socket.send(
                                    JSON.stringify({
                                        type: INIT_GAME,
                                    })
                                );
                            }}
                        >
                            Play
                        </Button>}
                    </div>
                </div>
            </div>
        </div>
    );
};
