import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
// import Leaftlet from 'leaflet';

import mapIcon from '../utils/mapIcon';
import api from '../services/api';
import mapMarkerImg from '../img/map-marker.svg';

import "../css/pages/orphanages-map.css";

// const mapIcon = Leaftlet.icon({
//     iconUrl: mapMarkerImg,
//     iconSize: [58,68],
//     iconAnchor: [29,68],
//     popupAnchor: [170,2]
// })

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap(){

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    console.log(orphanages);
    //components properties states - react
    useEffect(() => {
        api.get('orphanages')
        .then(response => {
            setOrphanages(response.data); //cicle of rendering 
        });
    },[]);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita ;)</p>
                </header>

                <footer>
                    <strong>Rio de Janeiro</strong>
                    <span>RIO DE JANEIRO</span>
                </footer>
            </aside>

            <Map 
                center={[-22.9419474,-43.2035458]}
                zoom={11}
                style={{ width: '100%', height: '100%' }}
            >
                {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />   */}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

            { orphanages.map(orphanage => {
                return (
                    <Marker 
                    icon={mapIcon}
                    position={[orphanage.latitude,orphanage.longitude]}
                    key={orphanage.id}
                    >

                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight size={20} color="#FFF"/>
                            </Link>
                        </Popup>
                    </Marker>
                )
            }) }
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF"/>
            </Link>

        </div>
    )
}

export default OrphanagesMap;