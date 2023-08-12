import prisma from '~/server/database/client'
import dayjs from 'dayjs'

export async function checkCodeGenerateFrequently(email:string){
  const result = await prisma.validationCode.findUnique({ where: { email } })
  if(result){
    const time1 = result.updatedAt || result.createdAt
    const time2 = dayjs(new Date())
    const differenceInSeconds = time2.diff(dayjs(time1), 'second')
    // 判断差值是否超过3秒
    return differenceInSeconds > 5
  }
  return true
}

export async function createAccount(email:string){
  const user = await prisma.user.create({ data:{email} })
  return user
}

export async function createCode(email:string,code:string){
  const result = await prisma.validationCode.create({ data:{email,code} })
  return result
}
export async function updateCode(email:string,code:string,updatedAt:Date){
  const result = await prisma.validationCode.update({ where: {email},data:{code,updatedAt} })
  return result
}

export async function generateNewCode(email:string,code:string){
  const user = await prisma.user.findUnique({ where: { email } })
  if(user){
    //更新
    const result = await prisma.validationCode.findUnique({ where: { email } })
    if(result){
      const updatedAt = new Date()
      updateCode(email,code,updatedAt)
    }else{
      createCode(email,code)
    }
  }else{
    //创建用户+生成code
    await createAccount(email)
    createCode(email,code)
  }
}
