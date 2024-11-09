
import {useState} from 'react'
export default function ShoppingCart() {
    const [geoAddress, setGeoAddress] = useState("")
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        alert("Geolocation is not supported by this browser.")
    }

    function showPosition(position) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&sensor=false&language=en&key=${""}`)
            .then(response => response.json())
            .then(json => {
                setGeoAddress(json?.results?.[0].formatted_address)
                console.log(json?.results?.[0].formatted_address)
            })
            .catch(err => console.log('Request Failed', err));
    }
    
    return (
        <></>
    )
}