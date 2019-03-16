/** @format */

var mixin = {
  methods: {
    importVGItems(floor, numOfFloor, usableGauge) {
      // var floor = 3
      // var numOfFloor = 5
      // var usableGauge = [1, 4]
      var VGItems = []
      var numOfHostsPorts = (function getHostsPort() {
        var neededGauge = floor * numOfFloor
        var oneMore = neededGauge % usableGauge.length
        var basic = Math.floor(neededGauge / usableGauge.length)
        var arr = new Array(usableGauge.length).fill(basic)
        for (var i = 0; i < oneMore; i++) {
          arr[i] += 1
        }
        return arr
      })()
      // [8,7]

      function generatePort(x) {
        return Array.from({ length: x }, (v, k) => k + 1)
      }
      // x=8 => [1,1,1,1,1,1,1,1]
      function generateHost(x, index) {
        return new Array(x).fill(usableGauge[index])
      }
      // x=8 => [1,2,3,4,5,6,7,8]
      function set1DArray(getArray) {
        var allPorts = []
        numOfHostsPorts.forEach((x, index) => {
          var generateArray = getArray(x, index)
          allPorts = allPorts.concat(generateArray)
        })
        return allPorts
      }

      var portsArr = set1DArray(generatePort)
      // [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7]
      var hostsArr = set1DArray(generateHost)
      // [1,1,1,1,1,1,1,1,4,4,4,4,4,4,4]

      function getFloorItems(floorIndex, arr) {
        var floorItems = arr.filter((x, index) => {
          if (index % floor == floorIndex) return x
        })
        return floorItems
      }
      // [1,4,7,2,5] or [1,1,1,4,4]

      function getAllFloorItems(arr) {
        var allFloorItems = []
        for (var floorIndex = 0; floorIndex < floor; floorIndex++) {
          allFloorItems.push(getFloorItems(floorIndex, arr))
        }
        return allFloorItems
      }

      var allHostsArr = getAllFloorItems(hostsArr)
      // [
      //   [1,1,1,4,4],
      //   [1,1,1,4,4],
      //   [1,1,4,4,4]
      // ]
      var allPortsArr = getAllFloorItems(portsArr)
      // [
      //   [1,4,7,2,5],
      //   [2,5,8,3,6],
      //   [3,6,1,4,7]
      // ]

      function setToObj() {
        var hostsArr = allHostsArr.flat()
        var portsArr = allPortsArr.flat()
        var floorIndex = 0
        for (var i = 0; i < hostsArr.length; i++) {
          if (i % numOfFloor == 0) floorIndex += 1
          VGItems[i] = {
            floor: floorIndex,
            host: hostsArr[i],
            port: portsArr[i],
            serial: `vg-${floorIndex}-0${(i % numOfFloor) + 1}`,
            steelId: ''
            // TODO: fn serial(num){return (num < 10 ? '0' : '') + num}
          }
        }
      }
      setToObj()
      return VGItems
      // var VGItems = [
      //   { floor: 1, host: 1, port: 1, serial: "vg-1-01", steelId: 0 },
      //   { floor: 1, host: 1, port: 4, serial: "vg-1-02", steelId: 0  },
      //   { floor: 1, host: 1, port: 7, serial: "vg-1-03", steelId: 0  },
      //   { floor: 1, host: 4, port: 2, serial: "vg-1-04", steelId: 0  },
      //   { floor: 1, host: 4, port: 5, serial: "vg-1-05", steelId: 0  },

      //   { floor: 2, host: 1, port: 2, serial: "vg-2-01", steelId: 0  },
      //   { floor: 2, host: 1, port: 5, serial: "vg-2-02", steelId: 0  },
      //   { floor: 2, host: 1, port: 8, serial: "vg-2-03", steelId: 0  },
      //   { floor: 2, host: 4, port: 3, serial: "vg-2-04", steelId: 0  },
      //   { floor: 2, host: 4, port: 6, serial: "vg-2-05", steelId: 0  },

      //   { floor: 3, host: 1, port: 3, serial: "vg-3-01", steelId: 0  },
      //   { floor: 3, host: 1, port: 6, serial: "vg-3-02", steelId: 0  },
      //   { floor: 3, host: 4, port: 1, serial: "vg-3-03", steelId: 0  },
      //   { floor: 3, host: 4, port: 4, serial: "vg-3-04", steelId: 0  },
      //   { floor: 3, host: 4, port: 7, serial: "vg-3-05", steelId: 0  }
      // ]
    }
  }
}

export default mixin
// return VGItems
