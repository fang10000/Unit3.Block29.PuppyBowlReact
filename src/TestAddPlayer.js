const apiUrl = 'https://fsa-puppy-bowl.herokuapp.com/api/2109-UNF-HY-WEB-PT/players';
const imgUrl = 'https://hips.hearstapps.com/hmg-prod/images/little-cute-maltipoo-puppy-royalty-free-image-1652926025.jpg?crop=0.444xw:1.00xh;0.129xw,0&resize=980:*'

const newPlayerData = {
  name: 'Momo',
  breed: 'Maltipoo',
  status: 'bench',  
  imageUrl: imgUrl,
  teamId: 60,
  cohortId: 60
};

const postData = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlayerData),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

postData();