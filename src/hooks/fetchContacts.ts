// import axios from "axios";
// const API_URL = import.meta.env.VITE_API_URL;

// const fetchContacts = () => {
//   const fetchAllContacts = async () => {
//     let allContactsData = JSON.parse(
//       localStorage.getItem("allContacts") || "[]"
//     );
//     if (allContactsData.length === 0) {
//       const allContactsResponse = await axios.get(API_URL);
//       allContactsData = allContactsResponse.data;
//       localStorage.setItem("allContacts", JSON.stringify(allContactsData));
//     }
//     return allContactsData;
//   };

//   const fetchContactsByCoordinates = async (latitude: number, longitude: number) => {
//     const response = await axios.get(
//       `${API_URL}/contacts?latitude=${latitude}&longitude=${longitude}`
//     );
//     return response.data;
//   };

//   const fetchNearestContactsIPInfo = async () => {
//     const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });

//     if (permissionStatus.state === 'granted') {
//       const position = await new Promise<GeolocationPosition>(
//         (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
//       );
//       const { latitude, longitude } = position.coords;
//       return fetchContactsByCoordinates(latitude, longitude);
//     } else {
//       try {
//         const user_data = await axios.get(`https://ipapi.co/json`);
//         const { latitude, longitude } = user_data.data;
//         return fetchContactsByCoordinates(latitude, longitude);
//       } catch (error) {
//         console.error("CORS issue with ipapi.co, using fallback coordinates", error);
//         const fallbackLatitude = 27.7172;
//         const fallbackLongitude = 85.3240;
//         return fetchContactsByCoordinates(fallbackLatitude, fallbackLongitude);
//       }
//     }
//   };

//   const fetchNearestContactsUserInfo = async () => {
//     try {
//       const position = await new Promise<GeolocationPosition>(
//         (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
//       );
//       const { latitude, longitude } = position.coords;
//       return fetchContactsByCoordinates(latitude, longitude);
//     } catch (error) {
//       return fetchNearestContactsIPInfo();
//     }
//   };

//   return { fetchAllContacts, fetchNearestContactsIPInfo, fetchNearestContactsUserInfo };
// };

// export default fetchContacts;
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const fetchContacts = () => {
  const fetchAllContacts = async () => {
    let allContactsData: any[] = [];

    // Try to fetch from local storage
    try {
      const storedData = localStorage.getItem("allContacts");
      if (storedData) {
        allContactsData = JSON.parse(storedData);
      }
    } catch (error: unknown) {
      const errorMessage = (error instanceof Error) ? error.message : 'Unknown error reading from local storage';
      alert("Error reading from local storage: " + errorMessage);
    }

    // If local storage data is empty or failed to read, fetch from server
    if (allContactsData.length === 0) {
      try {
        const response = await axios.get(API_URL);
        allContactsData = response.data;
        // Attempt to store data in local storage
        try {
          localStorage.setItem("allContacts", JSON.stringify(allContactsData));
        } catch (storageError: unknown) {
          const storageErrorMessage = (storageError instanceof Error) ? storageError.message : 'Unknown error writing to local storage';
          alert("Error writing to local storage: " + storageErrorMessage);
        }
      } catch (error: unknown) {
        const errorMessage = (error instanceof Error) ? error.message : 'Unknown error fetching all contacts from server';
        alert("Error fetching all contacts from server: " + errorMessage);
      }
    }

    return allContactsData;
  };

  const fetchContactsByCoordinates = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        `${API_URL}/contacts?latitude=${latitude}&longitude=${longitude}`
      );
      return response.data;
    } catch (error: unknown) {
      const errorMessage = (error instanceof Error) ? error.message : 'Unknown error fetching contacts by coordinates';
      alert("Error fetching contacts by coordinates: " + errorMessage);
      throw error;
    }
  };

  const fetchNearestContactsIPInfo = async () => {
    try {
      // Feature detection for navigator.permissions
      const hasPermissionsAPI = 'permissions' in navigator;

      if (hasPermissionsAPI) {
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });

        if (permissionStatus.state === 'granted') {
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
          );
          const { latitude, longitude } = position.coords;
          return fetchContactsByCoordinates(latitude, longitude);
        } else {
          try {
            const user_data = await axios.get(`https://ipapi.co/json`);
            const { latitude, longitude } = user_data.data;
            return fetchContactsByCoordinates(latitude, longitude);
          } catch (error: unknown) {
            const errorMessage = (error instanceof Error) ? error.message : 'Unknown error fetching IP info, using fallback coordinates';
            alert("Error fetching IP info, using fallback coordinates: " + errorMessage);
            const fallbackLatitude = 27.7172;
            const fallbackLongitude = 85.3240;
            return fetchContactsByCoordinates(fallbackLatitude, fallbackLongitude);
          }
        }
      } else {
        // If permissions API is not supported, directly fetch IP info
        try {
          const user_data = await axios.get(`https://ipapi.co/json`);
          const { latitude, longitude } = user_data.data;
          return fetchContactsByCoordinates(latitude, longitude);
        } catch (error: unknown) {
          const errorMessage = (error instanceof Error) ? error.message : 'Unknown error fetching IP info, using fallback coordinates';
          alert("Error fetching IP info, using fallback coordinates: " + errorMessage);
          const fallbackLatitude = 27.7172;
          const fallbackLongitude = 85.3240;
          return fetchContactsByCoordinates(fallbackLatitude, fallbackLongitude);
        }
      }
    } catch (error: unknown) {
      const errorMessage = (error instanceof Error) ? error.message : 'Unknown error fetching nearest contacts IP info';
      alert("Error fetching nearest contacts IP info: " + errorMessage);
      throw error;
    }
  };

  const fetchNearestContactsUserInfo = async () => {
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const { latitude, longitude } = position.coords;
      return fetchContactsByCoordinates(latitude, longitude);
    } catch (error: unknown) {
      const errorMessage = (error instanceof Error) ? error.message : 'Unknown error fetching nearest contacts using user info';
      alert("Error fetching nearest contacts using user info: " + errorMessage);
      // Fallback to IP info
      return fetchNearestContactsIPInfo();
    }
  };

  return { fetchAllContacts, fetchNearestContactsIPInfo, fetchNearestContactsUserInfo };
};

export default fetchContacts;
