declare module "nodemailer" {
  export function createTransport(options: object): {
    sendMail(options: object): Promise<unknown>
  }
}
