import nodemailer from 'nodemailer';
export default defineEventHandler(async (context) => {
    const params = await readBody(context) || {} // 讀取參數
    const passwords= process.env.EMAIL_PASSPORT 
    const transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        port: 465, // SMTP 端口
        secure: true, // 使用 SSL
        secureConnection: true, // 使用 SSL
        auth: {
            user: "1021300769@qq.com",
            pass: passwords
        }
    });
    const mailOptions = {
        from: '1021300769@qq.com', // 发件地址
        to: '15921363438@163.com', // 收件列表
        subject: 'Hollo', // 标题
        html: '<b>Hello world ?</b>' // html 内容
    };

    mailOptions.html = getHtml(params)
    let resp = null
    const resObj = {
        code: 200,
        msg: '',
        data: {
            messageId: ''
        }
    }
    try {
        console.log('开始发送邮件')
        resp = await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log('报错了', error)
        resObj.code = 10001
        resObj.msg = 'Submit Fail !'
    } finally {
        console.log('发送完成', resp)
        if (resp?.messageId) {
            resObj.msg = 'Submit Success !'
            resObj.data.messageId = resp.messageId
        }
        return resObj
    }
})
// 构建发送的邮件内容
interface MsgObj {
    [key: string]: string;
}
function getHtml(params: MsgObj) {
    let html = ""
    if (Object.keys(params).length) {
        const formNames: MsgObj = {
            "name": "姓名",
            "email": "邮箱",
            "messenger": "公司",
            "messengerAct": "手机",
            "txt": "留言",
        }
        for (let k in params) {
            html += `<p style="line-height: 48px;color: #666666;border-bottom: 1px solid #dddddd;">
                        <span style="color: #333333; width: 100px;">${formNames[k]}：</span>
                        ${params[k]}
                    </p>`
        }
    }
    return html
}
