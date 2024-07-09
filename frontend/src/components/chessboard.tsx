import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

const MOVE = "move";

export const ChessBoard = ({
    chess,
    setBoard,
    board,
    socket
}: {
    chess : any;
    setBoard : any;
    board: ({ square: Square; type: PieceSymbol; color: Color } | null)[][];
    socket: WebSocket;
}) => {
    const [from, setFrom] = useState<Square | null>(null);
    const [to, setTo] = useState<Square | null>(null);

    const handleSquareClick = (squareRepresentation: Square, square: { square: Square; type: PieceSymbol; color: Color } | null) => {
        if (!from) {
            setFrom(square?.square ?? null);
        } else {
            socket.send(
                JSON.stringify({
                    type: MOVE,
                    payload: {
                        move: {
                            from: from,
                            to: squareRepresentation,
                        }
                    },
                })
            );
            setFrom(null);
            chess.move({
                from: from,
                        to: squareRepresentation,
            });
            setBoard(chess.board());
        }
    };

    return (
        <div className="flex flex-col text-black-200">
            {board.map((row, i) => (
                <div key={i} className="flex">
                    {row.map((square, j) => {
                        const squareRepresentation = String.fromCharCode(97 + (j % 8)) + (8 - i) as Square;
                        return (
                            <div
                                key={j}
                                onClick={() => handleSquareClick(squareRepresentation, square)}
                                className={`w-16 h-16 flex items-center justify-center text-2xl font-bold ${
                                    (i + j) % 2 === 0 ? "bg-green-500" : "bg-white"
                                }`}
                            >
                                <div className="w-full justify-center flex h-full">
                                    <div className="h-full justify-center flex flex-col">
                                    {square ? <img className="w-7" src={`/${square?.color === "b" ? 
                                        square?.type : `${square?.type?.toUpperCase()} copy`}.png`} /> : null}
                                    </div>
                                </div>
                                
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};
