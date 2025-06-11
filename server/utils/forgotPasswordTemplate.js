const forgotPasswordTemplate = ({name,otp})=>{
    return `
    <div>
        <p>Dear ${name} </p>
        <p>Here is your Otp For reseting your BlinkeyIt password</p>
    
    <div>${otp}</div>
    <p>This otp is valid for 1 hour </p>
    <br/>
    </br>
    <p>Thanks</p>
    <p>BlinkeyIt</p>

    </div>
    `
}

export default forgotPasswordTemplate