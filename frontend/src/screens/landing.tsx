import { useNavigate } from "react-router-dom"
import { Button } from "../components/button";

export const Landing = () => {
    const navigate = useNavigate();
    return <div>
        <div className="mt-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <img className = "h-auto max-w-lg rounded" src = {"./chessimage.jpg"} alt="image" />
                </div>

                <div className="text-5xl font-bold text-white">Play Chess Online on the #1 Website!
                    <div className="mt-8 flex justify-center">
                        <Button onClick = {() => {navigate("/game")}}>Play Online
                        <div className= "text-xs">
                            Play with someone your level
                        </div>
                        </Button>
                    </div>

                    <div className="mt-4">
                        
                        <button className="px-4 py-2 rounded bg-slate-500 text-white font-bold text-2xl">Play Computer
                        <div className= "text-xs">
                            Play vs customizable training bots
                        </div>
                        </button>
                    </div>
            </div>
        </div>
    </div>

    </div>
}