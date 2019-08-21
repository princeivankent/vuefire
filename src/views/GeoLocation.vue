<template>
  <div>
    <h4>GMAPS</h4> <a href="https://www.latlong.net/">find coordinates here</a>
    <hr>
    <b-row>
      <b-col md="3">
        <h5>Source</h5>
        <b-form-group id="input-group-1" label="Latitude" label-for="input-1">
          <b-form-input id="input-1" v-model.number="origin.lat" placeholder="Example: 14.2143059" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Longitude" label-for="input-2">
          <b-form-input id="input-2" v-model.number="origin.lng" placeholder="Example: 14.2143059" required></b-form-input>
        </b-form-group>
        <hr>
        <h5>Destination</h5>
        <b-form-group id="input-group-1" label="Latitude" label-for="input-1">
          <b-form-input id="input-1" v-model.number="destination.lat" placeholder="Example: 14.2143059" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Longitude" label-for="input-2">
          <b-form-input id="input-2" v-model.number="destination.lng" placeholder="Example: 14.2143059" required></b-form-input>
        </b-form-group>

        <b-form-group>
          <b-button variant="success" @click="drawDirection">Calculate Direction</b-button>
        </b-form-group>
      </b-col>

      <b-col md="9">
        <GmapMap ref="gmap" :center="center" :zoom="12" style="width: 100%; height: 600px">
          <GmapMarker
            :position="origin"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
          />
          <GmapMarker
            :position="destination"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
          />
        </GmapMap>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      center: { lat: 14.2143059, lng: 121.1675675 },
      origin: { lat: 14.2143059, lng: 121.1675675 },
      destination: { lat: 0, lng: 0 }
    };
  },
  mounted() {
    // this.findMyLocation();
  },
  methods: {
    drawDirection() {
      if (!this.destination.lat && !this.destination.lng) {
        alert('Please provide coordinates for destination');
      }
      else {
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(this.$refs.gmap.$mapObject);

        this.calculateAndDisplayRoute(
          directionsService,
          directionsDisplay,
          this.origin,
          this.destination
        );
      }
    },
    calculateAndDisplayRoute(
      directionsService,
      directionsDisplay,
      origin,
      destination
    ) {
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: "DRIVING"
        },
        function(response, status) {
          if (status === "OK") {
            directionsDisplay.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
            console.log(response);
          }
        }
      );
    },
    findMyLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.origin = {
          lat: parseFloat(position.coords.latitude),
          lng: parseFloat(position.coords.longitude)
        };
      });
    }
  }
};
</script>