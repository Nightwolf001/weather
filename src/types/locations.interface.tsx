export interface Coord {
    lat: string;
    lng: string;
};

export interface Weather { 
    temp_current: number;
    temp_min: number;
    temp_max: number;
    conditions: string;
    description: string;
}

export interface Location {
    country: number;
    city: string;
    place_id: string;
}

export interface LocationDetials {
    location?: Location;
    weather?: Weather;
    coord?: Coord;
}