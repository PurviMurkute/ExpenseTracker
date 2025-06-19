import React from 'react'

const Button = ({btnText, onClick, btnSize}) => {

    const btnSizes = {
        lg: "text-xl px-4 py-2 my-5",
        md: "text-md px-3 py-2",
        sm: "text-md px-4 py-1 my-5 block mx-auto"
    }
  return (
    <button className={`font-bold bg-red-700 text-slate-100 cursor-pointer rounded-md ${btnSizes[btnSize]}`} onClick={onClick}>{btnText}</button>
  )
}

export default Button