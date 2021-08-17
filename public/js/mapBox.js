/* eslint-disable */

export const displayMap = (locations) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoicHJpeWFtc2VuZ3VwdGEiLCJhIjoiY2tzOGl0bjJhMGw3ODJ2cGU5Z2E5c3lwMiJ9.zkdtLSoPIbMpTY5kw2LrYA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/priyamsengupta/cks8kwa0o37nc17pe798vwqxs',
        scrollZoom: false
        // center: [-118.349818,34.067985],
        // zoom: 10,
        // interactive: false
    });

    const bound = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
        // Create Marker
        const el = document.createElement('div');
        el.className = 'marker';

        // Add Marker
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        }).setLngLat(loc.coordinates)
        .addTo(map);

        // Add popup
        new mapboxgl.Popup({
            offset: 30
        })
            .setLngLat(loc.coordinates)
            .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(map);

        // Extend map bounds to include current location
        bound.extend(loc.coordinates);

    map.fitBounds(bound, {
        padding: {  
                top: 200,
                bottom: 150,
                left: 100,
                right: 100
            }
        });
    });
}