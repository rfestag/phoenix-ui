export default [
  {
    id: "owm",
    name: "Open Weather Map",
    type: "LayerGroup",
    children: [
      {
        id: "owm.clouds",
        name: "Clouds",
        type: "TileLayer",
        props: {
          apiKey: "586a2c891fc0b7bed36e2b2425199e21",
          opacity: 0.5,
          url:
            "https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid={apiKey}"
        }
      },
      {
        id: "owm.precip",
        name: "Precipitation",
        type: "TileLayer",
        props: {
          apiKey: "586a2c891fc0b7bed36e2b2425199e21",
          opacity: 0.5,
          url:
            "https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid={apiKey}"
        }
      },
      {
        id: "owm.press",
        name: "Pressure",
        type: "TileLayer",
        props: {
          apiKey: "586a2c891fc0b7bed36e2b2425199e21",
          opacity: 0.5,
          url:
            "https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid={apiKey}"
        }
      },
      {
        id: "owm.temp",
        name: "Temperature",
        type: "TileLayer",
        props: {
          apiKey: "586a2c891fc0b7bed36e2b2425199e21",
          opacity: 0.5,
          url:
            "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid={apiKey}"
        }
      },
      {
        id: "owm.wind",
        name: "Wind",
        type: "TileLayer",
        props: {
          apiKey: "586a2c891fc0b7bed36e2b2425199e21",
          opacity: 0.5,
          url:
            "https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid={apiKey}"
        }
      }
    ]
  }
];
