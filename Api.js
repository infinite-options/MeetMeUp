const apiUrl = 'https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo';


export async function postUserData(formData){
  
    try {
            const response = await fetch(apiUrl, {
            method: 'PUT',
            body: formData 
            });
            if (!response.ok) {
                const statusCode = response.status;
                const errorText = await response.text();
          //      console.log(response);
            }
            const result = await response.json();
          //  console.log('Success: ' + JSON.stringify(result));
    } catch (error) {
           // console.log('Error--: ' + error.message);
    } 
};
