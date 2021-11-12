import ReactMapGl, { Marker, FlyToInterpolator } from "react-map-gl";
import { useState, useEffect } from "react";
import Axios from "axios";
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import {IsLoggedIn} from './Login1';
import {withRouter} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, setDoc, query, where } from "firebase/firestore"; 

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
    const [Locality, setLocality] = useState('');

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
      };
    const app = initializeApp(firebaseConfig);
    require("firebase/firestore");
    const db = getFirestore();

    async function addCrimetoDB(){
        if(ReportedBy!="" && age!=0 && CrimeBeingReported!=""){
            try{
                const docRef = await addDoc(collection(db, "crimeReports"), {
                  Locality: Locality,
                  ReportedBy: ReportedBy,
                  age: age,
                  CrimeBeingReported: CrimeBeingReported,
              });
              console.log("Data has been added to the database");
              }
              catch (e) {
                console.error("Error adding document: ", e);
                } 
              }
        }

    // useEffect(() => {
    //     Axios.get("http://localhost:3001/Map")
    //     .then((response) => {
    //         setListOfCrimes(response.data);
    //         console.log(response.data);
    //     })
    // }, [])

    // function addCrimetoDB(){
    //     Axios.post("http://localhost:3001/create", {
    //         Locality,
    //         ReportedBy,
    //         age,
    //         CrimeBeingReported,
    //     })
    //     .then(() => {
    //         setListOfCrimes([...listOfCrimes, {
    //             Locality,
    //             ReportedBy,
    //             age,
    //             CrimeBeingReported,
    //         }])
    //     })
    // }

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


    async function _suggestionSelect(result, lati, lng, text) {
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
            zoom: 12,
            transitionDuration: 3000,
            transitionInterpolator: new FlyToInterpolator(),
          });
        setListOfCrimes([]);
        const q = query(collection(db, "crimeReports"), where("Locality", "==", Locality));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setListOfCrimes([...listOfCrimes, {
                Locality: Locality,
                ReportedBy: ReportedBy,
                age: age,
                CrimeBeingReported: CrimeBeingReported,
            }]);
        });
      }
    
    async function getMyLocation(){
        navigator.geolocation.getCurrentPosition(showPosition);
        setListOfCrimes([]);
        const q = query(collection(db, "crimeReports"), where("Locality", "==", Locality));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setReportedBy(doc.data().ReportedBy);
            setAge(doc.data().age);
            setCrimeBeingReported(doc.data().CrimeBeingReported);
            setListOfCrimes([...listOfCrimes, {
                Locality: Locality,
                ReportedBy: ReportedBy,
                age: age,
                CrimeBeingReported: CrimeBeingReported,
            }]);
        });
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
            zoom: 12,
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
                setLocality(data.features[2].place_name);
                console.log(place, Locality);
              });
    }

    function openCrimeForm(){
        setCrimeForm(true);
    }

    return (
        <div>
            { <div className="mapPage">
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
                    <input type="text" placeholder="Reported by..." onChange={(event) => setReportedBy(event.target.value)}/>
                    <input type="number" placeholder="Age..." onChange={(event) => setAge(event.target.value)}/>
                    <input type="text" placeholder="Crime..." onChange={(event) => setCrimeBeingReported(event.target.value)}/>
                    <button className="addToDataBase" onClick={addCrimetoDB}>Add Crime Report</button>
                </div>}
                <div><br />List of past crimes in this locality: </div>
                    <div>Locality: {Locality}</div>
                <div className="pastCrimes">
                    {listOfCrimes.map((crime) => {
                        return (
                            <div><br />
                                {/* <br />Location: {crime.Location}<br /> */}
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
        </div>}
        {/* {IsLoggedIn==false && <div className="LoginToContinue">Please Login to Continue</div>} */}
    </div>
        

    );
}
export default withRouter(Map);
