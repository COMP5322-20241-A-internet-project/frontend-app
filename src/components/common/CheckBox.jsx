import { useState, useEffect } from 'react'
export default function CheckBox({ onCheckboxChange, reset }) {
    const [checked, setChecked] = useState(false)
    const handleOnChange = (e) => {
        setChecked(!checked)
        onCheckboxChange(e)
    }
    useEffect(() => {
        setChecked(false)
    }, [reset])
    return (
        <input
            style={{
                margin: "12px",
                height: "25px",
                width: "25px"
            }}
            type="checkbox" 
            checked={checked} 
            onChange={(e) => handleOnChange(e)}
        />
    )
}