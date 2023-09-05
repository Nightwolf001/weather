export interface Coord {
    lat: string;
    lng: string;
};

export interface ForecastItem {
    date: string;
    conditions: string;
    temp: number;
}

export interface ForecastList {
    forecast: ForecastItem;
}

export interface Weather { 
    temp_current: number;
    temp_min: number;
    temp_max: number;
    conditions: string;
    description: string;
}

export interface Location {
    country: string;
    city: string;
    place_id: string;
}

export interface LocationDetials {
    location?: Location;
    weather?: Weather;
    coord?: Coord;
    forecast?: ForecastList[];
}