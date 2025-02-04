let map;
    let userLocation;
    const bloodBanks = [
      { name: "CMC Vellore Blood Bank", lat: 12.924574033051249, lng:  79.13518791081427, address: "Christian Medical College Vellore, IDA Scudder Rd, Vellore, Tamil Nadu 632004" },
      { name: "VELLORE BLOOD CENTRE",lat: 12.961634746582968, lng: 79.14346160448179 ,address: "GROUND AND FIRST FLOOR, 2, 17th East Cross Rd, Suthanthira Ponvizha Nagar, Gandhi Nagar, Vellore, Tamil Nadu 632006" },
      { name: "All India Blood Donors Association",lat:12.934223463794048, lat :79.13555546001892 ,address: "2nd Floor PLS Residency, Thottapalayam, Vellore, Tamil Nadu 632012"},
      { name: "Red Cross",lat: 12.92217714648685, lng :79.13212223261421, address: "W4CJ+VQ9, SH 9, Balaji Nagar, Vellore, Tamil Nadu 632004"},
      { name :"Indian Voluntary Blood Bank ",lat :13.10754345381007,lng : 80.29501749460088,  address : "12, S Madha Church St, Pudumanaikuppam, Royapuram, Chennai, Tamil Nadu 600013"},
      { name : "National Voluntary Blood Centre" ,lat :13.126308183204127, lng :80.20292849469497 , address: "47, Ram Nagar 1st Cross St, Tirumalai nagar, Kolathur, Chennai, Tamil Nadu 600099"},
      { name : "Lions Blood Bank", lat :13.069593137061176, lng : 80.2606014330471 , address : "SCHOOL OF OPTOMETRY, 130, Marshalls Rd, Egmore, Chennai, Tamil Nadu 600008"},
      { name : "Annai teresa Blood Bank" ,lat :12.964857832407622, lng: 80.21098423252914 , address :"Bus stop, 946 1 st Floor, Bazaar Main Rd, Srinivasa Nagar, Ram Nagar South, Madipakkam, Chennai, Tamil Nadu 600091"},
      {name : "Chiranjeevi Eye and Blood Bank" ,lat :17.41691799057767, lng :78.44546948068759 ,address : "No.8-2-293, 82/A, Road No. 1, Jawahar Colony, Jubilee Hills, Hyderabad, Telangana 500033"}
  ];
    // Initialize the map
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7128, lng: -74.0060 }, // Default center (New York)
        zoom: 13,
      });
    }

    // Get user's location
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            updateBloodBanks();
            map.setCenter(userLocation);
            new google.maps.Marker({
              position: userLocation,
              map: map,
              title: "Your Location",
              icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              },
            });
          },
          (error) => {
            alert("Unable to retrieve your location. Please enable location services.");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    }

    // Calculate distance between two coordinates
    function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Earth radius in km
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in km
    }

    // Update blood banks list and map markers
    function updateBloodBanks() {
      if (!userLocation) return;

      // Sort blood banks by distance
      const sortedBanks = bloodBanks
        .map((bank) => ({
          ...bank,
          distance: calculateDistance(userLocation.lat, userLocation.lng, bank.lat, bank.lng),
        }))
        .sort((a, b) => a.distance - b.distance);

      // Update the list
      const container = document.getElementById("bloodBanks");
      container.innerHTML = sortedBanks
        .map(
          (bank) => `
        <div class="blood-bank-card">
          <h3>${bank.name}</h3>
          <p>${bank.address}</p>
          <p>Distance: ${bank.distance.toFixed(2)} km</p>
          <button class="directions-button" onclick="showDirections(${bank.lat},${bank.lng})">
            Directions
          </button>
        </div>
      `
        )
        .join("");

      // Update map markers
      sortedBanks.forEach((bank) => {
        new google.maps.Marker({
          position: { lat: bank.lat, lng: bank.lng },
          map: map,
          title: bank.name,
        });
      });
    }

    // Show directions to a blood bank
    function showDirections(lat, lng) {
      if (!userLocation) {
        alert("Please enable location services to get directions.");
        return;
      }
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${lat},${lng}&travelmode=driving`
      );
    }