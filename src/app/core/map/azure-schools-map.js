(function ($) {
  "use strict";
  window.GOVUK = window.GOVUK || {};

  function AzureSchoolLocationsMap(options) {
    if (!options.elementId || options.elementId === '')
      throw new ReferenceError("options.elementId is not present.");

    this.mapApiKey = options.mapApiKey;
    this.mapElementId = options.elementId;
    if (!this.mapElement)
      throw new ReferenceError("mapElement did not resolve using the id: " + options.elementId);

    if (!options.primaryMarker)
      throw new ReferenceError("options.primaryMarker is not present.");
    this.primaryMarker = options.primaryMarker;
    this.defaultZoom = 6;
    this.fullScreen = options.fullScreen;
    this.topLayer = null;
    this.initialize();
  }

  AzureSchoolLocationsMap.prototype = {

    get mapElement() {
      return document.getElementById(this.mapElementId);
    },

    initialize: function () {
      this.centreLatLng = [this.primaryMarker.geometry.location.lat, this.primaryMarker.geometry.location.lng];
      this.setMapOptions();
    },

    setMapOptions: function () {
      var mapOptions = {
        attribution: '© ' + new Date().getFullYear() + ' Microsoft, © 1992 - ' + new Date().getFullYear() + ' TomTom',
        maxZoom: 18,
        minZoom: 4,
        id: 'azuremaps.road',
        crossOrigin: true,
        subscriptionKey: this.mapApiKey
      };

      this.azureMap = L.map(this.mapElementId, { attributionControl: false }).setView(this.centreLatLng, this.defaultZoom);

      this.azureMap.addControl(L.control.attribution({
        prefix: ''
      }));

      if (this.fullScreen) {
        this.azureMap.addControl(new L.Control.Fullscreen());
      }

      L.tileLayer(
        'https://atlas.microsoft.com/map/tile/png?api-version=1&layer=basic&style=main&zoom={z}&x={x}&y={y}&subscription-key=' + this.mapApiKey,
        mapOptions)
        .addTo(this.azureMap);
    },

    renderMapPinsForAzureMap: function (data, sfbDomain) {

      var hashtable = {};

      var genKey = function genKey(lat, lng) {
        return lat + "#" + lng;
      };

      if (this.topLayer) {
        this.topLayer.clearLayers();
      }

      var latLangs = [];
      var markers = L.markerClusterGroup();

      for (var i = 0; i < data.length; i++) {

        var adjustment = 0.00005; // put the school pin about 6 metres away from it's equivalent.

        var lat = new Number(data[i].location.coordinates[1]);
        var lng = new Number(data[i].location.coordinates[0]);
        var key = genKey(lat, lng);

        if (!hashtable[key]) {
          hashtable[key] = key;
        } else {
          lng += adjustment;
          key = genKey(lat, lng);
          hashtable[key] = key;
        }

        var blackIcon = L.icon({
          iconUrl: '/assets/images/icon-location.png',
          iconSize: [20, 32]
        });

        var marker = L.marker([data[i].location.coordinates[1], data[i].location.coordinates[0]], { icon: blackIcon });
        markers.addLayer(marker);
        latLangs.push([data[i].location.coordinates[1], data[i].location.coordinates[0]]);
        var info = data[i];
        var html = `<div class="infowindow-school-summary">
                      <a href ="${sfbDomain}/school/detail?urn=${info.urn}">${info.name}</a>
                      <p>${info.address}</p>
                      <p>${info.overallPhase}</p>
                      <p>${info.schoolType}</p>
                      <div id ="${info.urn}" data-urn="${info.urn}">`;

        //if (DfE.Util.ComparisonList.isInManualList(info.Id)) {
        // if (true) {
        //   html += `<div class="button add add-remove" style="display: none" onclick="DfE.Views.SchoolsResultsViewModel.updateManualBasket('${info.urn}','Add')">Add</div>
        //                   <div class="button remove add-remove" onclick="DfE.Views.SchoolsResultsViewModel.updateManualBasket('${info.urn}','Remove')">Remove</div>`;
        // } else {
        //   html += `<div class="button add add-remove" onclick="DfE.Views.SchoolsResultsViewModel.updateManualBasket('${info.urn}','Add')">Add</div>
        //                   <div class="button remove add-remove" style="display: none" onclick="DfE.Views.SchoolsResultsViewModel.updateManualBasket('${info.urn}','Remove')">Remove</div>`;
        // }

        marker.bindPopup(html);
        marker.on('click', function (ev) {
          ev.target.options.icon.options.iconUrl = "/assets/images/icon-location-pink.png";
          ev.target.refreshIconOptions();

          var urn = $(ev.target.getPopup().getContent()).find('.add').parent().data('urn');
          if (DfE.Util.ComparisonList.isInManualList(urn.toString())) {
            $('.infowindow-school-summary').find('.add').hide();
            $('.infowindow-school-summary').find('.remove').show();
          } else {
            $('.infowindow-school-summary').find('.add').show();
            $('.infowindow-school-summary').find('.remove').hide();
          }
        });
        marker.on('popupclose', function (ev) {
          ev.target.options.icon.options.iconUrl = "/assets/images/icon-location.png";
          ev.target.refreshIconOptions();
        });
      }

      this.topLayer = markers;

      this.azureMap.addLayer(markers);

      this.azureMap.fitBounds(L.latLngBounds(latLangs));
    }
  };

  GOVUK.AzureSchoolLocationsMap = AzureSchoolLocationsMap;

}(jQuery));
