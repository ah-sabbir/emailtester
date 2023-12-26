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



export async function* emailBulkValidate(prevState:any, formData:FormData){
  
  const emails = formData.get('emails')

    const emailList = String(emails)?.split(/[\r\n]+/)



    const res = emailList.map(async function(s){
        const str = s.replace(/[, ]+/g,' ').trim()
        // console.log("this is a string", str);

        const response = await fetch(`http://api.eva.pingutil.com/email?email=${str}`, {
        method: 'GET',
        headers: {
              'Content-Type': 'application/json',
            },
          });

      const result = await response.json();

      return result;
    })

    // const res = emailList?.map(async (e:string)=>{

    //     const response = await fetch(`http://api.eva.pingutil.com/email?email=${e.replace(/[, ]+/g,' ').trim()}`, {
    //     method: 'GET',
    //     headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       });
    //   const result = await response.json();
    //   // console.log(result);
    //   return result
    // })

    // for(let i=0;i<res.length;i++){
    //   res[i].then()
    // }
    

  return {
    ok:true || false,
    data: res || null
  }

  // const response = await fetch(`http://api.eva.pingutil.com/email?email=${email}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // const result = await response.json();
  
  // return {
  //   message: 'Please enter a valid email',
  //   ...result
  // }
}