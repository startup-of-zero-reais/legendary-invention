import { EmbeddedLocations, Location as ModelLocation } from "../models/location";

export namespace LoadLocations {
  export type Embedded = EmbeddedLocations;
  export type Locations = ModelLocation[];
}
