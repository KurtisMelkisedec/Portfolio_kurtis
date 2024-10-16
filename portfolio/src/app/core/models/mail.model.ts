export class mailModel{
    username:string|null
    mail:string
    content:string
    /**
     *
     */
    constructor(username:string|null,mail:string,content:string) {
       this.username = username
       this.mail = mail
       this.content = content
        
    }
}