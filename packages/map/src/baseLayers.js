export default [
  {
    type: "TileLayer",
    name: "Light",
    visible: false,
    description: "",
    thumbnail: "",
    props: {
      minZoom: 2,
      maxZoom: 16,
      url:
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
    }
  },
  {
    type: "TileLayer",
    name: "Dark",
    visible: true,
    description: "",
    thumbnail: "",
    props: {
      minZoom: 2,
      maxZoom: 16,
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    }
  }
];
