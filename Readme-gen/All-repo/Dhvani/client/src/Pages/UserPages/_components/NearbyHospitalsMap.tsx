import { useCallback, useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";
import { 
    MapPin, 
    Hospital, 
    Stethoscope, 
    UserCheck, 
    Navigation,
    Filter,
    Radius,
    Search,
    AlertCircle,
    RefreshCw,
    BriefcaseMedical, 
    Pill,
    Ambulance, 
    Syringe
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

type FacilityType = 'hospital' | 
'clinic' | 'doctor' | 'dentist' | 
'pharmacy' | 'laboratory' | 'emergency' | 
'other' | 'unknown';

interface Place {
    id: string;
    name: string;
    lat: number;
    lon: number;
    type: FacilityType;
    distanceKm: number;
    phone?: string;
    website?: string;
}

interface Coordinates {
    lat: number;
    lon: number;
}

const FACILITY_TYPES = [
    'all', 'hospital', 'clinic', 'doctor', 
    'dentist', 'pharmacy', 'laboratory', 'emergency', 'other'
] as const;

const SEARCH_RADII = [2000, 5000, 10000] as const;
const MAX_DISPLAYED_FACILITIES = 15;
const GEOCODING_TIMEOUT = 15000;
const OVERPASS_TIMEOUT = 30000;  
const TTL = 24 * 60 * 60 * 1000;
const GEOCODING_CACHE_KEY = 'healthcareGeocodingCache';
const FACILITIES_CACHE_KEY = 'healthcareFacilitiesCache';

function getGeocodingCache(address: string): Coordinates | null {
    try {
        const cache = JSON.parse(localStorage.getItem(GEOCODING_CACHE_KEY) || '{}');
        const entry = cache[address];
        if (entry && Date.now() - entry.timestamp < TTL) {
            return entry.data;
        }
        return null;
    } catch (error) {
        console.error('Error reading geocoding cache', error);
        return null;
    }
}

function setGeocodingCache(address: string, data: Coordinates) {
    try {
        const cache = JSON.parse(localStorage.getItem(GEOCODING_CACHE_KEY) || '{}');
        cache[address] = { data, timestamp: Date.now() };
        localStorage.setItem(GEOCODING_CACHE_KEY, JSON.stringify(cache));
    } catch (error) {
        console.error('Error writing geocoding cache', error);
    }
}

function getFacilitiesCache(cacheKey: string): Place[] | null {
    try {
        const cache = JSON.parse(localStorage.getItem(FACILITIES_CACHE_KEY) || '{}');
        const entry = cache[cacheKey];
        if (entry && Date.now() - entry.timestamp < TTL) {
            return entry.data;
        }
        return null;
    } catch (error) {
        console.error('Error reading facilities cache', error);
        return null;
    }
}

function setFacilitiesCache(cacheKey: string, data: Place[]) {
    try {
        const cache = JSON.parse(localStorage.getItem(FACILITIES_CACHE_KEY) || '{}');
        cache[cacheKey] = { data, timestamp: Date.now() };
        localStorage.setItem(FACILITIES_CACHE_KEY, JSON.stringify(cache));
    } catch (error) {
        console.error('Error writing facilities cache', error);
    }
}

function sanitizeAddress(input: string): string {
    if (!input || typeof input !== 'string') {
        throw new Error('Invalid address input');
    }
    
    const sanitized = input
        .trim()
        .slice(0, 200) 
        .replace(/[<>]/g, '') 
        .replace(/[\/\\|;'"]/g, ' ')
        .replace(/[^\w\s,.-]/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim();
    
    if (sanitized.length < 3) {
        throw new Error('Address too short');
    }
    
    return sanitized;
}

function validateCoordinates(lat: number, lon: number): boolean {
    return (
        typeof lat === 'number' && 
        typeof lon === 'number' &&
        !isNaN(lat) && 
        !isNaN(lon) &&
        lat >= -90 && 
        lat <= 90 &&
        lon >= -180 && 
        lon <= 180
    );
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    if (!validateCoordinates(lat1, lon1) || !validateCoordinates(lat2, lon2)) {
        return Infinity;
    }
    
    if (Math.abs(lat1) > 90 || Math.abs(lon1) > 180 || Math.abs(lat2) > 90 || Math.abs(lon2) > 180) {
        return Infinity;
    }
    
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371; 
    
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

class RateLimiter {
    private lastCall = 0;
    private minInterval: number;
    
    constructor(minInterval = 1000) {
        this.minInterval = minInterval;
    }
    
    async throttle(): Promise<void> {
        const now = Date.now();
        const timeSinceLastCall = now - this.lastCall;
        
        if (timeSinceLastCall < this.minInterval) {
            const waitTime = this.minInterval - timeSinceLastCall;
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
        this.lastCall = Date.now();
    }
}

const geocodingLimiter = new RateLimiter(1000);

function extractKeyAddressComponents(address: string): string[] {
    const variants: string[] = [];
    variants.push(address);
    
    const postalCodeMatch = address.match(/\b\d{5,7}\b/);
    if (postalCodeMatch) {
        variants.push(postalCodeMatch[0]);
    }
    
    const cityPostalMatch = address.match(/([\w\s]+?)\s*,\s*(\d{5,7})$/);
    if (cityPostalMatch) {
        variants.push(`${cityPostalMatch[1]}, ${cityPostalMatch[2]}`);
    }
    
    const stateMatch = address.match(/,\s*([\w\s]+?)\s*,\s*[a-zA-Z]+$/i);
    if (stateMatch) {
        const cityMatch = address.match(/,\s*([\w\s]+?)\s*,\s*[\w\s]+,\s*[a-zA-Z]+$/i);
        if (cityMatch) {
            variants.push(`${cityMatch[1]}, ${stateMatch[1]}`);
        }
    }
    
    const withoutInstitution = address
        .replace(/\b(university|college|institute|hospital|school|center|centre|clinic)\b/gi, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
        
    if (withoutInstitution && withoutInstitution !== address) {
        variants.push(withoutInstitution);
    }
    
    return [...new Set(variants)];
}

function createGeocodingQueries(address: string): string[] {
    const baseUrls = [
        `https://api.opencagedata.com/geocode/v1/json?key=e497daab13634b829932dcb43c73cd22&limit=1&q=`,
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=`
    ];
    
    const queries: string[] = [];
    const components = extractKeyAddressComponents(address);
    
    for (const component of components) {
        for (const baseUrl of baseUrls) {
            queries.push(`${baseUrl}${encodeURIComponent(component)}`);
        }
    }
    
    return queries;
}

export default function NearbyHospitalsMap({ address }: { address: string }) {
    const [places, setPlaces] = useState<Place[]>([]);
    const [coords, setCoords] = useState<Coordinates | null>(null);
    const [filter, setFilter] = useState<'all' | FacilityType>('all');
    const [radius, setRadius] = useState(5000);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    const { theme } = useThemeStore();

    const getLatLngFromAddress = useCallback(async (addr: string): Promise<Coordinates> => {
        const MAX_RETRIES = 3;
        let lastError: any = null;
        
        try {
            const sanitizedAddress = sanitizeAddress(addr);
            const cachedCoords = getGeocodingCache(sanitizedAddress);
            if (cachedCoords) {
                return cachedCoords;
            }
        } catch (e) {
            console.log("Initial sanitization failed, proceeding with variants");
        }
        
        const queries = createGeocodingQueries(addr);
        
        for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
            try {
                await geocodingLimiter.throttle();
                const shuffledQueries = [...queries].sort(() => Math.random() - 0.5);
                
                for (const url of shuffledQueries) {
                    try {
                        const controller = new AbortController();
                        const timeoutId = setTimeout(() => controller.abort(), GEOCODING_TIMEOUT);
                        
                        const response = await fetch(url, { 
                            signal: controller.signal,
                            headers: { 
                                'User-Agent': 'HealthcareFacilityFinder/1.0',
                                ...(url.includes('nominatim') ? { Referer: window.location.origin } : {})
                            }
                        });
                        
                        clearTimeout(timeoutId);
                        
                        if (!response.ok) continue;
                        
                        const data = await response.json();
                        const result = data.results?.[0] || data[0];
                        if (!result) continue;
                        
                        const coords = {
                            lat: parseFloat(result.lat || result.latitude || result.geometry?.lat),
                            lon: parseFloat(result.lon || result.longitude || result.geometry?.lng)
                        };
                        
                        if (validateCoordinates(coords.lat, coords.lon)) {
                            const components = extractKeyAddressComponents(addr);
                            components.forEach(comp => setGeocodingCache(comp, coords));
                            return coords;
                        }
                    } catch (e) {
                        // Continue to next query
                    }
                }
                throw new Error('All geocoding providers failed');
            } catch (error) {
                lastError = error;
                await new Promise(resolve => setTimeout(resolve, 2000 * (attempt + 1)));
            }
        }
        
        throw lastError || new Error('Geocoding failed after multiple attempts');
    }, []);

    const getNearbyPlaces = useCallback(async (lat: number, lon: number, searchRadius: number): Promise<Place[]> => {
        const cacheKey = `${lat.toFixed(4)}_${lon.toFixed(4)}_${searchRadius}`;
        const cachedPlaces = getFacilitiesCache(cacheKey);
        if (cachedPlaces) {
            return cachedPlaces;
        }
        
        const isValidCoord = (val: number) => !isNaN(val) && Math.abs(val) < 90;
        
        if (!isValidCoord(lat) || !isValidCoord(lon)) {
            throw new Error(`Invalid coordinates: ${lat}, ${lon}`);
        }

        const query = `
            [out:json][timeout:25];
            (
                node["amenity"~"hospital|clinic|doctors|dentist|pharmacy|laboratory"](around:${searchRadius},${lat},${lon});
                way["amenity"~"hospital|clinic|doctors|dentist|pharmacy|laboratory"](around:${searchRadius},${lat},${lon});
                node["healthcare"](around:${searchRadius},${lat},${lon});
                way["healthcare"](around:${searchRadius},${lat},${lon});
                node["emergency"~"yes|ambulance_station"](around:${searchRadius},${lat},${lon});
                way["emergency"~"yes|ambulance_station"](around:${searchRadius},${lat},${lon});
            );
            out center;
        `;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), OVERPASS_TIMEOUT);

        try {
            const response = await fetch("https://overpass-api.de/api/interpreter", {
                method: "POST",
                body: query,
                signal: controller.signal,
                headers: {
                    'Content-Type': 'text/plain',
                    'User-Agent': 'HealthcareFacilityFinder/1.0'
                }
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`Overpass API error: ${response.status}`);
            }

            const data = await response.json();
            
            if (!data.elements || !Array.isArray(data.elements)) {
                throw new Error('Invalid response format from Overpass API');
            }

            interface OverpassElement {
                id: number;
                type: string;
                lat?: number;
                lon?: number;
                center?: {
                    lat: number;
                    lon: number;
                };
                tags?: {
                    amenity?: string;
                    name?: string;
                    phone?: string;
                    website?: string;
                    [key: string]: any;
                };
            }

            interface OverpassResponse {
                elements: OverpassElement[];
            }

            const validPlaces = (data as OverpassResponse).elements
                .filter((element: OverpassElement) => {
                    const elementLat: number | undefined = element.lat ?? element.center?.lat;
                    const elementLon: number | undefined = element.lon ?? element.center?.lon;
                    
                    return (
                        typeof elementLat === 'number' &&
                        typeof elementLon === 'number' &&
                        validateCoordinates(elementLat, elementLon) &&
                        element.tags && 
                        (
                            element.tags.amenity || 
                            element.tags.healthcare || 
                            element.tags.emergency
                        )
                    );
                })
                .map((element: OverpassElement): Place | null => {
                    try {
                        const coords = element.center || { lat: element.lat!, lon: element.lon! };
                        const distanceKm = haversine(lat, lon, coords.lat, coords.lon);
                        let facilityType: FacilityType = 'unknown';
                        const amenity = element.tags?.amenity;
                        const healthcare = element.tags?.healthcare;
                        const emergency = element.tags?.emergency;
                        
                        if (emergency === 'yes' || emergency === 'ambulance_station') {
                            facilityType = 'emergency';
                        } else if (amenity === 'hospital' || healthcare === 'hospital') {
                            facilityType = 'hospital';
                        } else if (amenity === 'clinic' || healthcare === 'clinic') {
                            facilityType = 'clinic';
                        } else if (amenity === 'doctors' || amenity === 'doctor' || healthcare === 'doctor' || healthcare === 'physician') {
                            facilityType = 'doctor';
                        } else if (amenity === 'dentist' || healthcare === 'dentist') {
                            facilityType = 'dentist';
                        } else if (amenity === 'pharmacy' || healthcare === 'pharmacy') {
                            facilityType = 'pharmacy';
                        } else if (amenity === 'laboratory' || healthcare === 'laboratory') {
                            facilityType = 'laboratory';
                        } else if (healthcare) {
                            facilityType = 'other';
                        } else {
                            facilityType = 'unknown';
                        }
                        
                        return {
                            id: `${element.type}-${element.id}`,
                            name: element.tags?.name || `Healthcare Facility`,
                            lat: coords.lat,
                            lon: coords.lon,
                            type: facilityType,
                            distanceKm: parseFloat(distanceKm.toFixed(2)),
                            phone: element.tags?.phone,
                            website: element.tags?.website
                        };
                    } catch {
                        return null;
                    }
                })
                .filter((place): place is Place => place !== null);
            
            setFacilitiesCache(cacheKey, validPlaces);
            return validPlaces.sort((a, b) => a.distanceKm - b.distanceKm);
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error('Facility search timed out');
            }
            throw error;
        }
    }, []);

    const loadData = useCallback(async () => {
        if (!address?.trim()) {
            setError('Please provide a valid address');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const location = await getLatLngFromAddress(address);
            setCoords(location);
            const facilitiesCacheKey = `${location.lat.toFixed(4)}_${location.lon.toFixed(4)}_${radius}`;
            const cachedFacilities = getFacilitiesCache(facilitiesCacheKey);

            if (cachedFacilities) {
                setPlaces(cachedFacilities);
                setRetryCount(0);
            } else {
                const facilities = await getNearbyPlaces(location.lat, location.lon, radius);
                setPlaces(facilities);
                setRetryCount(0);
            }
        } catch (error) {
            console.error("Failed to load healthcare facilities:", error);
            
            const errorMessage = error instanceof Error 
                ? error.message 
                : "Failed to load healthcare facilities";
            
            setError(errorMessage);
            if (retryCount < 2 && error instanceof Error && 
                (error.message.includes('timeout') || error.message.includes('network'))) {
                setTimeout(() => {
                    setRetryCount(prev => prev + 1);
                    loadData();
                }, 2000 * (retryCount + 1));
            }
        } finally {
            setLoading(false);
        }
    }, [address, radius, getLatLngFromAddress, getNearbyPlaces, retryCount]);

    useEffect(() => {
        if (address) {
            loadData();
        } else {
            setPlaces([]);
            setCoords(null);
            setError(null);
        }
    }, [address, radius, loadData]);

    const filteredPlaces = useMemo(() => {
        return filter === 'all' 
            ? places 
            : places.filter(place => place.type === filter);
    }, [places, filter]);
    
    const getTypeIcon = useCallback((type: string) => {
        const iconMap = {
            hospital: <Hospital className="w-4 h-4" />,
            clinic: <Stethoscope className="w-4 h-4" />,
            doctor: <UserCheck className="w-4 h-4" />,
            dentist: <BriefcaseMedical className="w-4 h-4" />,
            pharmacy: <Pill className="w-4 h-4" />,
            laboratory: <Syringe className="w-4 h-4" />,
            emergency: <Ambulance className="w-4 h-4" />,
            other: <MapPin className="w-4 h-4" />,
            default: <MapPin className="w-4 h-4" />
        };
        return iconMap[type as keyof typeof iconMap] || iconMap.default;
    }, []);
    
    const getTypeColor = useCallback((type: string) => {
        const colorMap = {
            hospital: theme === "light" ? "bg-red-100 text-red-800" : "bg-error/20 text-error",
            clinic: theme === "light" ? "bg-blue-100 text-blue-800" : "bg-info/20 text-info",
            doctor: theme === "light" ? "bg-green-100 text-green-800" : "bg-success/20 text-success",
            dentist: theme === "light" ? "bg-purple-100 text-purple-800" : "bg-purple-500/20 text-purple-300",
            pharmacy: theme === "light" ? "bg-amber-100 text-amber-800" : "bg-amber-500/20 text-amber-300",
            laboratory: theme === "light" ? "bg-cyan-100 text-cyan-800" : "bg-cyan-500/20 text-cyan-300",
            emergency: theme === "light" ? "bg-orange-100 text-orange-800" : "bg-orange-500/20 text-orange-300",
            other: theme === "light" ? "bg-gray-100 text-gray-800" : "bg-base-300 text-base-content",
            unknown: theme === "light" ? "bg-gray-100 text-gray-800" : "bg-base-300 text-base-content",
        };
        return colorMap[type as keyof typeof colorMap] || colorMap.unknown;
    }, [theme]);

    const getDistanceColor = useCallback((distance: number) => {
        if (distance <= 1) return theme === "light" ? "bg-green-100 text-green-800" : "bg-success/20 text-success";
        if (distance <= 3) return theme === "light" ? "bg-yellow-100 text-yellow-800" : "bg-warning/20 text-warning";
        return theme === "light" ? "bg-red-100 text-red-800" : "bg-error/20 text-error";
    }, [theme]);

    const handleDirections = useCallback((place: Place) => {
        if (!validateCoordinates(place.lat, place.lon)) {
            console.error('Invalid coordinates for directions');
            return;
        }
        
        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.lat)},${encodeURIComponent(place.lon)}&travelmode=driving`;
        
        try {
            window.open(url, '_blank', 'noopener,noreferrer');
        } catch (error) {
            console.error('Failed to open directions:', error);
        }
    }, []);

    if (loading) {
        return (
            <Card className={`${
                theme === "light"
                    ? "bg-white border-gray-200 shadow-sm"
                    : "bg-base-200/50 backdrop-blur-sm border-primary/10"
            }`}>
                <CardContent className="p-8 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-8 h-8 border-b-2 rounded-full border-primary animate-spin"></div>
                    </div>
                    <p className={`${theme === "light" ? "text-gray-600" : "text-base-content/70"}`}>
                        Loading healthcare facilities near you...
                        {retryCount > 0 && ` (Attempt ${retryCount + 1})`}
                    </p>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <div className="space-y-4">
                <Alert variant="destructive">
                    <AlertCircle className="w-4 h-4" />
                    <AlertTitle>Location Resolution Failed</AlertTitle>
                    <AlertDescription>
                        <div className="grid gap-2">
                            <p>We couldn't process: <strong>{address}</strong></p>
                            
                            <div className="mt-3">
                                <h4 className="mb-1 font-medium">Try these solutions:</h4>
                                <ul className="pl-5 space-y-1 list-disc">
                                    <li>Use a simpler format: <em>City, Postal Code</em></li>
                                    <li>Ensure postal code is included (6 digits for India)</li>
                                    <li>Separate address components with commas</li>
                                    <li>Include both city and state names</li>
                                </ul>
                            </div>
                        </div>
                    </AlertDescription>
                </Alert>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Retry Options</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                        <Button onClick={loadData} variant="secondary">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Retry with Simplified Address
                        </Button>
                        
                        <Button variant="outline" asChild>
                            <a href="/profile">
                                <UserCheck className="w-4 h-4 mr-2" />
                                Update Profile Address
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!coords) return null;

    return (
        <div className="space-y-6">
            <Card className={`${
                theme === "light"
                    ? "bg-white border-gray-200 shadow-sm"
                    : "bg-base-200/50 backdrop-blur-sm border-primary/10"
            }`}>
                <CardHeader className={`${
                    theme === "light" 
                        ? "bg-gray-50 border-b border-gray-200" 
                        : "bg-base-300/30 border-b border-primary/10"
                }`}>
                    <CardTitle className={`flex items-center text-lg font-semibold ${
                        theme === "light" ? "text-gray-800" : "text-primary"
                    }`}>
                        <div className={`p-2 rounded-lg mr-3 ${
                            theme === "light" ? "bg-white shadow-sm" : "bg-base-100/50"
                        }`}>
                            <Search className={`w-5 h-5 ${
                                theme === "light" ? "text-gray-600" : "text-primary"
                            }`} />
                        </div>
                        Search Filters
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <div className="flex items-center mb-2">
                                <Filter className={`w-4 h-4 mr-2 ${
                                    theme === "light" ? "text-gray-500" : "text-base-content/70"
                                }`} />
                                <label className={`text-sm font-semibold uppercase tracking-wide ${
                                    theme === "light" ? "text-gray-700" : "text-base-content"
                                }`}>
                                    Facility Type
                                </label>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {FACILITY_TYPES.map((type) => (
                                    <Button
                                        key={type}
                                        variant={filter === type ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setFilter(type as typeof filter)}
                                        className={`capitalize ${
                                            filter === type
                                                ? theme === "light"
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-primary text-primary-content"
                                                : theme === "light"
                                                    ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                                                    : "bg-base-100 border-base-300 text-base-content hover:bg-base-200"
                                        }`}
                                        aria-label={`Filter by ${type === 'all' ? 'all facilities' : type}`}
                                    >
                                        {getTypeIcon(type)}
                                        <span className="ml-1">{type === "all" ? "All" : type}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center mb-2">
                                <Radius className={`w-4 h-4 mr-2 ${
                                    theme === "light" ? "text-gray-500" : "text-base-content/70"
                                }`} />
                                <label className={`text-sm font-semibold uppercase tracking-wide ${
                                    theme === "light" ? "text-gray-700" : "text-base-content"
                                }`}>
                                    Search Radius
                                </label>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {SEARCH_RADII.map((rad) => (
                                    <Button
                                        key={rad}
                                        variant={radius === rad ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setRadius(rad)}
                                        className={`${
                                            radius === rad
                                                ? theme === "light"
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-primary text-primary-content"
                                                : theme === "light"
                                                    ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                                                    : "bg-base-100 border-base-300 text-base-content hover:bg-base-200"
                                        }`}
                                        aria-label={`Search within ${rad / 1000} kilometers`}
                                    >
                                        {rad / 1000} km
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={`mt-4 p-3 rounded-lg border ${
                        theme === "light" ? "bg-blue-50 border-blue-200" : "bg-info/10 border-info/30"
                    }`}>
                        <div className="flex items-center">
                            <Navigation className={`w-4 h-4 mr-2 ${
                                theme === "light" ? "text-blue-600" : "text-info"
                            }`} />
                            <span className={`text-sm font-medium ${
                                theme === "light" ? "text-blue-800" : "text-info"
                            }`}>
                                Showing {filteredPlaces?.length} facilities within {radius / 1000}km of your location
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className={`${
                theme === "light"
                    ? "bg-white border-gray-200 shadow-sm"
                    : "bg-base-200/50 backdrop-blur-sm border-primary/10"
            } overflow-hidden`}>
                <CardHeader className={`${
                    theme === "light" 
                        ? "bg-gray-50 border-b border-gray-200" 
                        : "bg-base-300/30 border-b border-primary/10"
                }`}>
                    <CardTitle className={`flex items-center text-lg font-semibold ${
                        theme === "light" ? "text-gray-800" : "text-primary"
                    }`}>
                        <div className={`p-2 rounded-lg mr-3 ${
                            theme === "light" ? "bg-white shadow-sm" : "bg-base-100/50"
                        }`}>
                            <MapPin className={`w-5 h-5 ${
                                theme === "light" ? "text-red-600" : "text-primary"
                            }`} />
                        </div>
                        Healthcare Facilities Map
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="h-96 md:h-[500px] w-full">
                        <MapContainer
                            center={[coords.lat, coords.lon]}
                            zoom={13}
                            scrollWheelZoom
                            style={{ height: "100%", width: "100%" }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[coords.lat, coords.lon]}>
                                <Popup>
                                    <div className="text-center">
                                        <strong>Your Location</strong>
                                        <br />
                                        {address}
                                    </div>
                                </Popup>
                            </Marker>
                            {filteredPlaces.map((place) => (
                                <Marker key={place.id} position={[place.lat, place.lon]}>
                                    <Popup>
                                        <div className="space-y-2">
                                            <div>
                                                <strong className="text-base">{place.name}</strong>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getTypeIcon(place.type)}
                                                <span className="text-sm capitalize">{place.type}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Navigation className="w-3 h-3" />
                                                <span className="text-sm font-medium">{place.distanceKm} km away</span>
                                            </div>
                                            {place.phone && (
                                                <div className="text-xs text-gray-600">
                                                    📞 {place.phone}
                                                </div>
                                            )}
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className={`${
                theme === "light"
                    ? "bg-white border-gray-200 shadow-sm"
                    : "bg-base-200/50 backdrop-blur-sm border-primary/10"
            }`}>
                <CardHeader className={`${
                    theme === "light" 
                        ? "bg-gray-50 border-b border-gray-200" 
                        : "bg-base-300/30 border-b border-primary/10"
                }`}>
                    <CardTitle className={`flex items-center text-lg font-semibold ${
                        theme === "light" ? "text-gray-800" : "text-primary"
                    }`}>
                        <div className={`p-2 rounded-lg mr-3 ${
                            theme === "light" ? "bg-white shadow-sm" : "bg-base-100/50"
                        }`}>
                            <Hospital className={`w-5 h-5 ${
                                theme === "light" ? "text-blue-600" : "text-primary"
                            }`} />
                        </div>
                        Nearby Facilities ({filteredPlaces?.length})
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    {filteredPlaces?.length === 0 ? (
                        <div className="py-8 text-center">
                            <AlertCircle className={`w-12 h-12 mx-auto mb-4 ${
                                theme === "light" ? "text-gray-400" : "text-base-content/50"
                            }`} />
                            <p className={`text-lg font-medium mb-2 ${
                                theme === "light" ? "text-gray-800" : "text-base-content"
                            }`}>
                                No facilities found
                            </p>
                            <p className={`${
                                theme === "light" ? "text-gray-600" : "text-base-content/70"
                            }`}>
                                Try adjusting your search radius or filters
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredPlaces.slice(0, MAX_DISPLAYED_FACILITIES).map((place, idx) => (
                                <motion.div
                                    key={place.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                                        theme === "light" 
                                            ? "bg-white border-gray-200 hover:border-gray-300" 
                                            : "bg-base-100/50 border-base-300 hover:border-primary/30"
                                    }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className={`p-2 rounded-lg ${
                                                    theme === "light" ? "bg-gray-50" : "bg-base-200"
                                                }`}>
                                                    {getTypeIcon(place.type)}
                                                </div>
                                                <div>
                                                    <h3 className={`font-semibold ${
                                                        theme === "light" ? "text-gray-900" : "text-base-content"
                                                    }`}>
                                                        {place.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge className={getTypeColor(place.type)}>
                                                            {place.type.charAt(0).toUpperCase() + place.type.slice(1)}
                                                        </Badge>
                                                        <Badge className={getDistanceColor(place.distanceKm)}>
                                                            <Navigation className="w-3 h-3 mr-1" />
                                                            {place.distanceKm} km
                                                        </Badge>
                                                    </div>
                                                    {place.phone && (
                                                        <div className={`text-xs mt-1 ${
                                                            theme === "light" ? "text-gray-600" : "text-base-content/70"
                                                        }`}>
                                                            📞 {place.phone}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDirections(place)}
                                                className={`${
                                                    theme === "light"
                                                        ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                                                        : "bg-base-100 border-base-300 text-base-content hover:bg-base-200"
                                                }`}
                                                aria-label={`Get directions to ${place.name}`}
                                            >
                                                <Navigation className="w-4 h-4 mr-1" />
                                                Directions
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {filteredPlaces.length > MAX_DISPLAYED_FACILITIES && (
                                <div className={`text-center py-4 ${
                                    theme === "light" ? "text-gray-600" : "text-base-content/70"
                                }`}>
                                    <p className="text-sm">
                                        Showing top {MAX_DISPLAYED_FACILITIES} results. {filteredPlaces.length - MAX_DISPLAYED_FACILITIES} more facilities available.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}