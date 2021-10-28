import ReactMapGl, { Marker } from "react-map-gl";
import { useState } from "react";
require('dotenv').config();

const Map = () => {
    const mapboxAPIkey = process.env.REACT_APP_MAPBOX_API_KEY;

    const [viewport, setViewport] = useState({
        latitude: 17.5416206,
        longitude: 17.5416206,
        zoom: 4,
        width: window.innerWidth/1.8,
        height: window.innerHeight/1.5,
        pitch: 10
    });

    return ( 
        <ReactMapGl {...viewport} mapboxApiAccessToken={mapboxAPIkey}
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={nextViewport => setViewport(nextViewport)}>
            <Marker latitude = {17.541623} longitude = {78.574097} offsetTop={-viewport.zoom*5/2}><img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" width={viewport.zoom*5} height={viewport.zoom*5}/></Marker>
        </ReactMapGl>

    );
}

export default Map;
