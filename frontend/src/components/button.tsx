import React from "react"

export const Button = ({ onClick,children } : {onClick: () => void, children : React.ReactNode}) => {
    return <button onClick = {onClick} className="px-4 py-4 rounded bg-green-500/100 text-white font-bold text-2xl ">
        { children }
    </button>
}