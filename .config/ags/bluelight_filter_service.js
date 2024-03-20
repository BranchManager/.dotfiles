class BluelightFilterService extends Service {
    static {
      Service.register(
        this,

        {'it-changed': ['string']},
       {'running': ['string', 'rw'],
        'icon': ['string', 'rw']
        }
      )
    }
    #running = Utils.exec('/home/noah/.config/ags/scripts/blue_light_filter.sh')

    #icon_off = 'frappe-crust-moon'
    #icon_on = 'machiato_yellow_moon'
    #icon = ''
//parseInt(Utils.exec('ps -x | grep -c wlsunset'))

    // get running(){
    //     return this.#running
    // }

    // set running(value){
    //     this.#running = value
    //     this.emit('changed')
    // }

    get icon(){
        return this.#icon
    }

    set icon(value){
        this.#icon = value
        //this.emit('changed')
    }

    constructor(){
        super()
        console.log('this is the bluelight filter service')

        if (this.#running == "on"){
            print('this is the running in constructor +++++++++')
            print(this.#running)
            this.#running = "on"
            this.icon = this.#icon_on
        }else{
            print('this is the running in constructor ++++++++++++++++++++++++++++++++++++++++++++++++++++')
            print(this.#running)
            this.#running = "off"
            this.icon = this.#icon_off
        }
        this.#onChange()
        print('this is the running 1')
        print(this.#running)


    }



    toggle(){
            
        if (this.#running == "off"){
            print('killing wlsunset')
            print(this.#running)
            this.#running = "on"
            this.#icon = this.#icon_on
            this.changed('icon')
            Utils.execAsync('killall wlsunset').then(val => {print("this value is " + val)}).catch(err => {print("this error is " + err)})
            
            
            

        }else{
            print('starting wlsunset')
            print(this.#running)
            this.#running = "off"
            this.icon = this.#icon_off
            this.changed('icon')
            
            Utils.execAsync('wlsunset -l 33.9 -L -89.3 &').then(val => {print("this 2 value is " + val)}).catch(err => {print("this2  error is " + err)})
            

        }

        this.emit('changed')
    }

    #onChange(){

        Utils.execAsync('/home/noah/.config/ags/scripts/blue_light_filter.sh').then(val => {print("this 3 value is " + val)}).catch(err => {print("this 3 error is " + err)})

        console.log('this is the running')
        //console.log(Utils.exec('ps -x | grep -c wlsunset'))

        this.emit('changed')
        //this.changed('changed', this.#running)
        this.notify('icon')

        this.emit('it-changed', this.#icon)
    }
    
    connect(event = 'changed', callback) {
        return super.connect(event, callback);

    }

}

export default new BluelightFilterService 
