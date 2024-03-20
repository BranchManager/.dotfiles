class BluelightFilterService extends Service {
    static {
      Service.register(
        this,

        {'it-changed': ['string']},
       {'running': ['string', 'rw']}
      )
    }
    #running = Utils.exec('/home/branchmanager/.config/ags/scripts/blue_light_filter.sh')
//parseInt(Utils.exec('ps -x | grep -c wlsunset'))

    get running(){
        return this.#running
    }

    set running(value){
        this.#running = value
        this.emit('changed')
    }

    constructor(){
        super()
        console.log('this is the bluelight filter service')
        this.#onChange()
    }

    toggle(){
            
        if (this.#running == "on"){
            print('killing wlsunset')
            print(this.#running)
            this.#running = "off"
            this.changed('running')
            Utils.execAsync('killall wlsunset').then(val => {print("this value is " + val)}).catch(err => {print("this error is " + err)})
            
            
            

        }else{
            print('starting wlsunset')
            print(this.#running)
            this.#running = "on"
            this.changed('running')
            Utils.execAsync('wlsunset -l 33.9 -L -89.3 &').then(val => {print("this 2 value is " + val)}).catch(err => {print("this2  error is " + err)})
            

        }

        this.emit('changed')
    }

    #onChange(){

        Utils.execAsync('/home/branchmanager/.config/ags/scripts/blue_light_filter.sh').then(val => {this.#running = val; print("this 3 value is " + val)}).catch(err => {print("this 3 error is " + err)})
        console.log('this is the running')
        console.log(Utils.exec('ps -x | grep -c wlsunset'))
        this.emit('changed')
        //this.changed('changed', this.#running)
        this.notify('running')

        this.emit('it-changed', this.#running)
    }
    connect(event = 'changed', callback) {
        return super.connect(event, callback);

    }

}

export default new BluelightFilterService 
