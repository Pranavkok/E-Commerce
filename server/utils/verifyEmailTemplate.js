const verifyEmailTemplate = ({ name, url }) => {
    return `
        <p>Dear ${name},</p>    
        <p>Thank you for connecting with us.</p>   
        <a href= "${url}" style="color: white; background: blue; margin-top: 10px; padding: 12px 20px; display: inline-block; text-decoration: none; border-radius: 5px;">
            Verify Email
        </a>
    `;
}

export default verifyEmailTemplate;
