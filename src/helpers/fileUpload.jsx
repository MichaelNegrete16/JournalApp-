
export const fileUpload = async file => {
    const url = 'https://api.cloudinary.com/v1_1/dpnyg3ntb/upload'
    const formData = new FormData()
    formData.append('upload_preset','react-journal')
    formData.append('file',file)

    // Metodo con fetch
    try {
        const resp = await fetch(url,{
            method:'POST',
            body:formData
        })
        if(resp.ok){
            const cloudResp = await resp.json()
            return cloudResp.secure_url
        }else{
            throw await resp.json()
        }
    } catch (error) {
        console.log(error)
    }


}