import axios from 'axios'

const urls = {
    postUrl: 'https://zincubate.in/api/MovieTicketChecker?action=getAllDetails'
}

function onSuccess(){
    return (response: any) => {
        return response
    }
}

function onRejected(){
    return (error: any)=> {
        return error
    }
}

export function getDetails(emailAddress: string){
    let url = new URL(urls.postUrl);
    url.searchParams.append('user_mail_id', emailAddress);
    return axios.post(url.toString())
           .then(onSuccess())
           .catch(onRejected())

}