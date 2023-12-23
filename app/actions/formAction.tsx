'use server'
 
export async function emailValidate(prevState: any, formData: FormData) {

    const email = formData.get('email')

  const response = await fetch(`http://api.eva.pingutil.com/email?email=${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();

  return {
    message: 'Please enter a valid email',
    ...result
  }
}