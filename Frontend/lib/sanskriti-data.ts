// -----------------------------------------------------------------------------
// Static reference data for the Sanskriti AI journey form.
// -----------------------------------------------------------------------------

export const INDIAN_STATES: string[] = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
]

// Representative cities per state. Falls back to a generic option list.
export const CITIES_BY_STATE: Record<string, string[]> = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Chatrapati Sambhaji Nagar'],
  Kerala: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Munnar', 'Alappuzha'],
  Rajasthan: ['Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer', 'Pushkar'],
  'Tamil Nadu': ['Chennai', 'Madurai', 'Coimbatore', 'Thanjavur', 'Kanyakumari'],
  Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Bhuj', 'Dwarka'],
  Mizoram: ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip'],
  Karnataka: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hampi', 'Coorg'],
  Delhi: ['New Delhi', 'Old Delhi', 'Dwarka', 'Rohini'],
  Goa: ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa'],
  'West Bengal': ['Kolkata', 'Darjeeling', 'Siliguri', 'Shantiniketan'],
  'Uttar Pradesh': ['Lucknow', 'Varanasi', 'Agra', 'Prayagraj', 'Mathura'],
  Punjab: ['Amritsar', 'Ludhiana', 'Chandigarh', 'Patiala'],
  Telangana: ['Hyderabad', 'Warangal', 'Nizamabad'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Tirupati', 'Guntur'],
}

export function citiesForState(state: string): string[] {
  return CITIES_BY_STATE[state] ?? ['Capital City', 'Other']
}

export const PURPOSES: string[] = [
  'Job / Work',
  'Education',
  'Family Visit',
  'Tourism',
  'Festival',
  'Business Trip',
  'Moving Permanently',
  'Other',
]

export type Destination = {
  state: string
  descriptor: string
  image: string
}

export const DESTINATIONS: Destination[] = [
  {
    state: 'Maharashtra',
    descriptor: 'Ancient cave art, coastal cities, and warm Marathi hospitality',
    image: '/images/maharashtra.png',
  },
  {
    state: 'Kerala',
    descriptor: 'Backwaters, spice trails, and a gentle rhythm of life',
    image: '/images/kerala.png',
  },
  {
    state: 'Rajasthan',
    descriptor: 'Desert forts, royal heritage, and vivid living traditions',
    image: '/images/rajasthan.png',
  },
  {
    state: 'Tamil Nadu',
    descriptor: 'Towering temples, classical arts, and deep-rooted customs',
    image: '/images/tamil-nadu.png',
  },
  {
    state: 'Gujarat',
    descriptor: 'The white desert, textile crafts, and vibrant community life',
    image: '/images/gujarat.png',
  },
  {
    state: 'Mizoram',
    descriptor: 'Misty highlands, close-knit villages, and quiet warmth',
    image: '/images/mizoram.png',
  },
]
