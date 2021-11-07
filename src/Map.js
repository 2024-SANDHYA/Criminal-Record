import ReactMapGl, { Marker, FlyToInterpolator } from "react-map-gl";
import { useState, useEffect } from "react";
import Axios from "axios";
import MapboxAutocomplete from 'react-mapbox-autocomplete';

require('dotenv').config();

let latitude1 = 0;
let longitude1 = 0;

const Map = () => {
    const [listOfCrimes, setListOfCrimes] = useState([]);
    const [crimeForm, setCrimeForm] = useState(false);
    const [Location, setLocation] = useState("");
    const [ReportedBy, setReportedBy] = useState("");
    const [age, setAge] = useState(0);
    const [CrimeBeingReported, setCrimeBeingReported] = useState("");
    const [locality, setLocality] = useState('');

    useEffect(() => {
        Axios.get("http://localhost:3001/Map")
        .then((response) => {
            setListOfCrimes(response.data);
            console.log(response.data);
        })
    }, [])

    function addCrimetoDB(){
        Axios.post("http://localhost:3001/create", {
            Location,
            ReportedBy,
            age,
            CrimeBeingReported,
        })
        .then(() => {
            setListOfCrimes([...listOfCrimes, {
                Location,
                ReportedBy,
                age,
                CrimeBeingReported,
            }])
        })
    }

    const mapboxAPIkey = process.env.REACT_APP_MAPBOX_API_KEY;
    const [lat, setLatitude] = useState(17.5416206);
    const [long, setLongitude] = useState(78.574097);
    const [place, setPlace] = useState("");

    const [viewport, setViewport] = useState({
        latitude: lat,
        longitude: long,
        zoom: 12,
        width: window.innerWidth,
        height: window.innerHeight/1.116,
        pitch: 10
    });


    function _suggestionSelect(result, lati, lng, text) {
        console.log(result, lati, lng, text);
        setLatitude(parseFloat(lati));
        setLongitude(parseFloat(lng));
        fetchPlace(parseFloat(lati), parseFloat(lng));
        latitude1 = parseFloat(lati);
        longitude1 = parseFloat(lng);
        setViewport({
            ...viewport,
            longitude: longitude1,
            latitude: latitude1,
            zoom: 14,
            transitionDuration: 3000,
            transitionInterpolator: new FlyToInterpolator(),
          });
      }
    
      function getMyLocation(){
        navigator.geolocation.getCurrentPosition(showPosition);
    }

    function showPosition(position){
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        latitude1 = position.coords.latitude;
        longitude1 = position.coords.longitude;
        console.log(position.coords.latitude, position.coords.longitude);
        console.log(lat, long);
        fetchPlace(position.coords.latitude, position.coords.longitude);
        setViewport({
            ...viewport,
            longitude: longitude1,
            latitude: latitude1,
            zoom: 14,
            transitionDuration: 3000,
            transitionInterpolator: new FlyToInterpolator(),
          });
    }

    function fetchPlace(latitude, longitude){
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxAPIkey}`)
              .then(response => response.json())
              .then(data => {
                console.log(data);
                setPlace(data.features[0].place_name);
                console.log(place);
              });
    }

    function openCrimeForm(){
        setCrimeForm(true);
    }

    return ( 
        <div className="mapPage">
            <div className="sidebar">
                <MapboxAutocomplete 
                        publicKey={mapboxAPIkey}
                        inputClass='form-control search'
                        onSuggestionSelect={_suggestionSelect}
                        resetSearch={true}/>
                <button id="changeloc" onClick={getMyLocation}>Get my location</button>
                <div className="displayLocation">
                    Location: {place}
                </div>
                <button className="reportCrime" onClick={openCrimeForm}>Report Crime</button>
                {crimeForm && <div className="addCrime">
                    <input type="text" placeholder="Location..." onChange={(event) => setLocation(event.target.value)}/>
                    <input type="text" placeholder="Reported by..." onChange={(event) => setReportedBy(event.target.value)}/>
                    <input type="number" placeholder="Age..." onChange={(event) => setAge(event.target.value)}/>
                    <input type="text" placeholder="Crime..." onChange={(event) => setCrimeBeingReported(event.target.value)}/>
                    <button className="addToDataBase" onClick={addCrimetoDB}>Add Crime Report</button>
                </div>}
                <div><br />List of past crimes in this area: </div>
                <div className="pastCrimes">
                    {listOfCrimes.map((crime) => {
                        return (
                            <div>
                                <br />Location: {crime.Location}<br />
                                Reported By: {crime.ReportedBy}<br />
                                Age: {crime.age}<br />
                                Crime Being Reported: {crime.CrimeBeingReported}<br />
                            </div>
                        )
                    })}
                </div>
            </div>
            <ReactMapGl {...viewport} mapboxApiAccessToken={mapboxAPIkey}
            mapStyle="mapbox://styles/mapbox/light-v9" onViewportChange={nextViewport => {
                console.log(nextViewport);
                setViewport(nextViewport);
                setLatitude(parseFloat(nextViewport.latitude));
                setLongitude(parseFloat(nextViewport.longitude));
                latitude1 = nextViewport.latitude;
                longitude1 = nextViewport.longitude;
                fetchPlace(latitude1, longitude1);
                }}>
                <Marker latitude = {parseFloat(lat)} longitude = {parseFloat(long)} offsetTop={-viewport.zoom}><img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" width={viewport.zoom*5} height={viewport.zoom*5}/></Marker>

            </ReactMapGl>
        </div>
        

    );
}

export default Map;
