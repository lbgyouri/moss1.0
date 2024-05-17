
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  methods: {
    isObject(o) {
      return Object.prototype.toString.call(o) === '[object Object]';
    },
    extract(data) {
      var indexs = [];
      var callback = function(i, v) {
        return v
      };
      for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];
        if (typeof arg == 'function') {
          callback = arg;
        } else {
          indexs.push(arguments[i]);
        }
      }
      var values = [];
      if (this.isObject(data)) {
        for (var key in data) {
          var item = [];
          for (var i = 0; i < indexs.length; i++) {
            var index = indexs[i];
            if (index == '$key') {
              item.push(callback(i, key));
            } else if (index == '$value') {
              item.push(callback(i, data[key]));
            } else {
              item.push(callback(i, data[key][index]));
            }
          }
          if (item.length == 1) {
            values.push(item[0]);
          } else {
            values.push(item);
          }
        }
      } else {
        for (var j = 0; j < data.length; j++) {
          var item = [];
          for (var i = 0; i < indexs.length; i++) {
            var index = indexs[i];
            if (index == '$index') {
              item.push(callback(i, j));
            } else {
              item.push(callback(i, data[j][index]));
            }
          }
          if (item.length == 1) {
            values.push(item[0]);
          } else {
            values.push(item);
          }
        }
      }
      return values;
    }
  }
}


