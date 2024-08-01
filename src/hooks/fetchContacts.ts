import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

const fetchContacts = () => {
  const fetchAllContacts = async () => {
    let allContactsData = JSON.parse(
      localStorage.getItem("allContacts") || "[]"
    );
    if (allContactsData.length === 0) {
      const allContactsResponse = await axios.get(API_URL);
      allContactsData = allContactsResponse.data;
      localStorage.setItem("allContacts", JSON.stringify(allContactsData));
    }
    return allContactsData;
  };

  const fetchContactsByCoordinates = async (latitude: number, longitude: number) => {
    const response = await axios.get(
      `${API_URL}/contacts?latitude=${latitude}&longitude=${longitude}`
    );
    return response.data;
  };

  const fetchNearestContactsIPInfo = async () => {
    const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
  
    if (permissionStatus.state === 'granted') {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const { latitude, longitude } = position.coords;
      return fetchContactsByCoordinates(latitude, longitude);
    } else {
      const user_data = await axios.get(`https://ipapi.co/json`);
      const { latitude, longitude } = user_data.data;
      return fetchContactsByCoordinates(latitude, longitude);
    }
  };

  const fetchNearestContactsUserInfo = async () => {
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const { latitude, longitude } = position.coords;
      return fetchContactsByCoordinates(latitude, longitude);
    } catch (error) {
      return fetchNearestContactsIPInfo();
    }
  };

  return { fetchAllContacts, fetchNearestContactsIPInfo, fetchNearestContactsUserInfo };
};

export default fetchContacts;