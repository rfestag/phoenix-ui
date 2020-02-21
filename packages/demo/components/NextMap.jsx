import dynamic from "next/dynamic";

const Map = dynamic(
  () =>
    import("@phoenix-ui/map/lib/components/Map.js").catch(e =>
      console.error(e)
    ),
  { ssr: false }
);

export default Map;
