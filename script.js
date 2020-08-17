const count = 10;
const apiKey = "BIZgMIiPodIobg8jzZZDypOfM6Pw3rgvJx4AnVzoW3I";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const getPicutres = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
    return error;
  }
};

getPicutres();
