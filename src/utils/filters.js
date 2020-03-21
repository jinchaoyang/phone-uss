import moment from 'moment'


export default{
    name: 'dateTimeFormat',
    func: (value){
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }

}


