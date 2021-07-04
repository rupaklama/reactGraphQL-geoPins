import React, { useState, useEffect, useContext } from 'react';

// component to render our map
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';

import { withStyles } from '@material-ui/core/styles';
import PinIcon from './PinIcon';
import Context from '../context';
import Blog from './Blog';
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

// initial map point
const INITIAL_VIEWPORT = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 13,
};

const Map = ({ classes }) => {
  const { state, dispatch } = useContext(Context);

  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

  const [userPosition, setUserPosition] = useState(null);

  // load user location
  useEffect(() => {
    getUserPosition();
  }, []);

  // to update viewport & user location
  const getUserPosition = () => {
    // window.navigator - to get user current location
    // Using 'geolocation' object of navigator to get current user location
    if ('geolocation' in navigator) {
      // Geolocation.getCurrentPosition() method is used to get the current position of the device
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        // update viewport
        setViewport({ ...viewport, latitude, longitude });
        // set user location
        setUserPosition({ latitude, longitude });
      });
    }
  };

  // to set a marker on map
  const handleMapClick = ({ lngLat, leftButton }) => {
    // console.log(e);
    // if we click with on our left button, we will execute this func
    if (!leftButton) return;

    // creating a draft when clicking on a map
    if (!state.draft) {
      dispatch({ type: 'CREATE_DRAFT' });
    }

    // getting lat & lon from 'lngLat' property
    const [longitude, latitude] = lngLat;

    // after we created a draft we want to immediately update the draft location
    dispatch({
      type: 'UPDATE_DRAFT_LOCATION',
      payload: { longitude, latitude },
    });
  };

  return (
    <div className={classes.root}>
      <ReactMapGL
        mapboxApiAccessToken='pk.eyJ1IjoicnVwYWtsYW1hMSIsImEiOiJja3FvZ3Z2b2owbDJ3MnZxbGVueDN5NzRyIn0.cP2oZ3RWwuWa53NxveZ_7g'
        width='100vw'
        height='calc(100vh - 64px'
        mapStyle='mapbox://styles/mapbox/streets-v11'
        {...viewport}
        // set viewport where we dragging to in map
        onViewportChange={newViewport => setViewport(newViewport)}
        onClick={handleMapClick}
      >
        {/* navigation control */}
        <div className={classes.navigationControl}>
          <NavigationControl onViewportChange={newViewport => setViewport(newViewport)} />
        </div>

        {/* Pin for User's current position */}
        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            // adjusting position of marker
            offsetLeft={-19}
            offsetTop={-37}
          >
            {/* marker */}
            <PinIcon size={40} color='red' />
          </Marker>
        )}

        {/* Draft Pin Marker*/}
        {state.draft && (
          <Marker
            latitude={state.draft.latitude}
            longitude={state.draft.longitude}
            // adjusting position of marker
            offsetLeft={-19}
            offsetTop={-37}
          >
            {/* marker */}
            <PinIcon size={40} color='hotpink' />
          </Marker>
        )}
      </ReactMapGL>

      {/* Blog Area to add Pin Content */}
      <Blog />
    </div>
  );
};

const styles = {
  root: {
    display: 'flex',
  },
  rootMobile: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  navigationControl: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: '1em',
  },
  deleteIcon: {
    color: 'red',
  },
  popupImage: {
    padding: '0.4em',
    height: 200,
    width: 200,
    objectFit: 'cover',
  },
  popupTab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
};

export default withStyles(styles)(Map);
