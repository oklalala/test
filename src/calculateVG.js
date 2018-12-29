/** @format */

;(function() {
  var floor = 3
  var numOfFloor = 5
  var usableGauge = [1, 4]

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

  // var isValid = (function() {
  //   return numOfHostsPorts[0] < 14
  // })()

  function generatePorts(x) {
    return Array.from({ length: x }, (v, k) => k + 1)
  }
  function generateHosts(x, index) {
    return new Array(x).fill(usableGauge[index])
  }
  function set1DArray(getArray) {
    var allPorts = []
    numOfHostsPorts.forEach((x, index) => {
      var generateArray = getArray(x, index)
      allPorts = allPorts.concat(generateArray)
    })
    return allPorts
  }

  var portsArr = set1DArray(generatePorts)
  var hostsArr = set1DArray(generateHosts)

  function getFloorItems(floor, arr) {
    var floorItems = arr.filter((x, index) => {
      if (index % 3 == floor) return x
    })
    return floorItems
  }

  function getAllFloorItems(arr) {
    var allFloorItems = []
    for (var i = 0; i < floor; i++) {
      allFloorItems.push(getFloorItems(i, arr))
    }
    return allFloorItems
  }

  var allPortsArr = getAllFloorItems(portsArr)
  var allHostsArr = getAllFloorItems(hostsArr)

  console.log(allHostsArr)
  console.log(allPortsArr)

  // [
  //   [1,4,7,2,5],
  //   [2,5,8,3,6],
  //   [3,6,1,4,7]
  // ]

  // [
  //   [1,1,1,4,4],
  //   [1,1,1,4,4],
  //   [1,1,4,4,4]
  // ]

  // function setHost() {
  //   var totalGauge = floor * numOfFloor
  //   var usableGauge = usable.length * 14
  //   if ( usableGauge < totalGuage) return "error";
  //   var moreApply = numOfFloor % usable.length;
  // }
  // function markLayer( Obj, floor, numOfFloor ) {
  //   while
  //   Obj.serial =
  // }

  // var assignId = [
  //   { vgId: 1, port: 1 },
  //   { vgId: 1, port: 2 },
  //   { vgId: 1, port: 3 },
  //   { vgId: 1, port: 4 },
  //   { vgId: 1, port: 5 },
  //   { vgId: 1, port: 6 },
  //   { vgId: 1, port: 7 },
  //   { vgId: 1, port: 8 },
  //   { vgId: 1, port: 9 },

  //   { vgId: 4, port: 1 },
  //   { vgId: 4, port: 2 },
  //   { vgId: 4, port: 3 },
  //   { vgId: 4, port: 4 },
  //   { vgId: 4, port: 5 },
  //   { vgId: 4, port: 6 }
  // ]

  // var VGItems = [
  //   { vgId: 1, port: 1, serial: 'vg-1-01' },
  //   { vgId: 1, port: 2, serial: 'vg-1-02' },
  //   { vgId: 1, port: 3, serial: 'vg-1-03' },
  //   { vgId: 4, port: 1, serial: 'vg-1-04' },
  //   { vgId: 4, port: 2, serial: 'vg-1-05' },

  //   { vgId: 1, port: 4, serial: 'vg-2-01' },
  //   { vgId: 1, port: 5, serial: 'vg-2-02' },
  //   { vgId: 1, port: 6, serial: 'vg-2-03' },
  //   { vgId: 4, port: 3, serial: 'vg-2-04' },
  //   { vgId: 4, port: 4, serial: 'vg-2-05' },

  //   { vgId: 1, p4ort: 7, serial: 'vg-3-01' },
  //   { vgId: 1, port: 8, serial: 'vg-3-02' },
  //   { vgId: 1, port: 9, serial: 'vg-3-03' },
  //   { vgId: 4, port: 5, serial: 'vg-3-04' },
  //   { vgId: 4, port: 6, serial: 'vg-3-05' }
  // ]
})()
