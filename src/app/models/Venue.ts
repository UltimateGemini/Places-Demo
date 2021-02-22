export interface Venue {
  meta: Meta;
  response: Response;
}
export interface Meta {
  code: number;
  requestId: string;
}
export interface Response {
  venue?: (VenueEntity)[] | null;
  geocode: Geocode;
}
export interface VenueEntity {
  id: string;
  name: string;
  location: Location;
  categories?: (CategoriesEntity)[] | null;
  referralId: string;
  hasPerk: boolean;
}
export interface Location {
  address: string;
  lat: number;
  lng: number;
  labeledLatLngs?: (LabeledLatLngsEntity)[] | null;
  postalCode: string;
  cc: string;
  neighborhood?: string | null;
  city: string;
  state: string;
  country: string;
  formattedAddress?: (string)[] | null;
  crossStreet?: string | null;
}
export interface LabeledLatLngsEntity {
  label: string;
  lat: number;
  lng: number;
}
export interface CategoriesEntity {
  id: string;
  name: string;
  pluralName: string;
  shortName: string;
  icon: Icon;
  primary: boolean;
}
export interface Icon {
  prefix: string;
  suffix: string;
}
export interface Geocode {
  what: string;
  where: string;
  feature: Feature;
  parents?: (null)[] | null;
}
export interface Feature {
  cc: string;
  name: string;
  displayName: string;
  matchedName: string;
  highlightedName: string;
  woeType: number;
  slug: string;
  id: string;
  longId: string;
  geometry: Geometry;
}
export interface Geometry {
  center: NeOrSwOrCenter;
  bounds: Bounds;
}
export interface NeOrSwOrCenter {
  lat: number;
  lng: number;
}
export interface Bounds {
  ne: NeOrSwOrCenter;
  sw: NeOrSwOrCenter;
}
