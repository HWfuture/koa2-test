class baseModel {
    constructor(data, message){
        //期望data是对象，message
        if(typeof data === 'string'){
            this.message = data
            return
        }
        if(data){
            this.data = data
        }
        if(message){
            this.message = message
        }
    }
}

class SuccessModel extends baseModel {
    constructor(data,message){
        super(data, message)
        this.erron = 0
    }
    
}

class ErrorModel extends baseModel {
    constructor(data, message){
        super(data, message)
        this.erron = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}